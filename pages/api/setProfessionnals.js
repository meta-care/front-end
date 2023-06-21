import clientPromise from "../../components/mongoDB/mongodb";

export default async function setPremium(req, res) {
	// Check if the request is a POST request
	if (req.method !== "POST") {
		return res.status(500).json({ error: "This needs to be a post request" });
	}

	// Get the data from the request
	const data = req.body;
	if (!data) {
		return res.status(500).json({ error: "no data" });
	}

	// Get the professionnals
	let professionnals = [];
	if (data.formData.professionnals) {
		for (let i = 0; i < data.formData.professionnals.length; i++) {
			professionnals.push(data.formData.professionnals[i].email);
		}
	}

	try {
		// Get the client and the database connection from mongoDB
		let client = await clientPromise;
		let db = await client.db();

		// Update the user profile
		await db.collection("users").updateOne(
			{ email: data.email },
			{
				$set: {
					professionnals,
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
