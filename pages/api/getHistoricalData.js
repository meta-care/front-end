import clientPromise from "../../components/mongoDB/mongodb";

export default async (req, res) => {
	// Check if the request is a GET request
	if (req.method !== "GET") {
		return res.status(500).json({ msg: "This needs to be a get request" });
	}

	const email = req.query.email;
	if (!email) {
		return res.json({ msg: "no data" });
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
		const userData = await userDataCursor.toArray();

		// Return a success message
		return res.json({ data: userData });

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return res.status(500).json({ error: JSON.stringify(e) });
	}
};
