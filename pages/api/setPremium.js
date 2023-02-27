import clientPromise from "../../components/mongoDB/mongodb";

export default async function submit(req, res) {
	// Check if the request is a POST request
	if (req.method !== "POST") {
		return res.status(500).json({ error: "This needs to be a post request" });
	}

	// Get the data from the request
	const data = req.body;
	if (!data) {
		return res.status(500).json({ error: "no data" });
	}

	// Get the current date
	var date = new Date();
	var now_utc = Date.UTC(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds()
	);

	try {
		// Get the client and the database connection from mongoDB
		let client = await clientPromise;
		let db = await client.db();

		// Update the user profile
		await db
			.collection("users")
			.updateOne(
				{ email: data.email },
				{
					$set: {
						premium: true,
						address: data.address,
						premiumDate: new Date(now_utc).toISOString(),
					},
				}
			);

		// Return a success message
		return res.json({ msg: "success" });

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return res.status(500).json({ error: JSON.stringify(e) });
	}
}
