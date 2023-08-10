import clientPromise from "../../components/mongoDB/mongodb";

export const config = {
	api: {
		responseLimit: "50mb",
	},
};

export default async (req, res) => {
	// Check if the request is a GET request
	if (req.method !== "GET") {
		return res.status(500).json({ error: "This needs to be a get request" });
	}

	// Get the email from the query string
	const email = req.query.email;
	if (!email) {
		return res.status(500).json({ error: "No email provided" });
	}

	// Get the refreshToken from the query string
	const refreshToken = req.query.refreshToken;
	if (!refreshToken) {
		return res.status(500).json({ error: "No refreshToken provided" });
	}

	try {
		// Get the client and the database connection from mongoDB
		let client = await clientPromise;
		let db = await client.db();

		// Get user historical data from db
		const userDataCursor = await db
			.collection("datas")
			.find({ email: email })
			.sort({ startTimeNanos: -1 });
		let userData = await userDataCursor.toArray();

		// If no data is found in the database, get it from the Google API
		if (userData.length === 0) {
			const { googleData, error } = await getGoogleHistoricalData(refreshToken);
			userData = googleData;
			if (error) {
				return res.status(500).json({ error: error });
			}
		}

		// Return a success message
		return res.json({ data: userData });

		// Catch any errors
	} catch (e) {
		return res.status(500).json({ error: JSON.stringify(e) });
	}
};

// Function to get the user's historical data from the Google API
async function getGoogleHistoricalData(refreshToken) {
	// Create the url to refresh the token
	const url =
		"https://oauth2.googleapis.com/token?" +
		new URLSearchParams({
			client_id: process.env.GOOGLE_CLIENT_ID,
			client_secret: process.env.GOOGLE_CLIENT_SECRET,
			grant_type: "refresh_token",
			refresh_token: refreshToken,
		});

	//fetch the new token
	let refreshedToken;
	try {
		const response = await fetch(url, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			method: "POST",
		});
		refreshedToken = await response.json();

		// error handling
		if (!response.ok) {
			throw new Error(refreshedToken.error);
		}
	} catch (error) {
		return { userData: [], error: "Error refreshing access token" };
	}

	// Get the user's data sources from the Google API
	let dataSources;
	try {
		const sourcesResponse = await fetch(
			`https://www.googleapis.com/fitness/v1/users/me/dataSources`,
			{
				headers: {
					Authorization: `Bearer ${refreshedToken.access_token}`,
				},
			}
		);
		const sourcesData = await sourcesResponse.json();
		dataSources = sourcesData.dataSource;
	} catch (error) {
		return { userData: [], error: "Error getting data sources" };
	}

	// Loop through all the data sources and fetch the data
	const userData = [];
	for (const source of dataSources) {
		const { returnedArray, error } = await fetchData(
			refreshedToken.access_token,
			source.dataType.name,
			source.dataStreamId
		);
		if (error) {
			return { userData, error };
		}
		userData.push(...returnedArray);
	}

	// Return the user's data
	return { userData, error: null };
}

async function fetchData(accessToken, type, dataSourceId) {
	// Create the start and end date
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - 30);

	// Get the user's data from the Google API
	let rawData;
	try {
		const response = await fetch(
			`https://www.googleapis.com/fitness/v1/users/me/dataSources/${dataSourceId}/datasets/${
				startDate.getTime() * 1000000
			}-${endDate.getTime() * 1000000}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				method: "get",
			}
		);
		rawData = await response.json();

		// error handling
		if (!response.ok) {
			throw new Error(rawData);
		}
	} catch (error) {
		return { returnedArray: [], error: `Error fetching ${dataSourceId}` };
	}

	// Loop through all the data and store it in the array
	const dataArray = [];
	for (var i = 0; i < rawData.point.length; i++) {
		// Get the value of the data
		let value;
		if (rawData.point[i].value[0].fpVal) {
			value = rawData.point[i].value[0].fpVal;
		} else if (rawData.point[i].value[0].intVal) {
			value = rawData.point[i].value[0].intVal;
		} else {
			value = rawData.point[i].value[0].mapVal;
		}

		// Create and save a new data object
		const data = {
			email: "email",
			type,
			startTimeNanos: rawData.point[i].startTimeNanos,
			endTimeNanos: rawData.point[i].endTimeNanos,
			value,
		};
		dataArray.push(data);
	}

	// Return the data
	return { returnedArray: dataArray, error: null };
}
