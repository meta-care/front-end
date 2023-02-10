import clientPromise from "../../components/mongoDB/mongodb";
import User from "../../components/mongoDB/user";
const mongoose = require("mongoose");

export default async function submit(req, res) {
	// Check if the request is a POST request
	if (req.method !== "POST") {
		return res.status(500).json({ msg: "This needs to be a post request" });
	}

	const data = req.body;
	if (!data) {
		return res.json({ msg: "no data" });
	}

	try {
		// Get the client and the database connection from mongoDB
		let client = await clientPromise;
		let db = await client.db();

		// Check if the user is registered on the database
		let userProfile = await db.collection("users").findOne({ ethAddress: data.address });

		// If the user is not registered, create a new user
		if (!userProfile) {
			let user = new User({
				_id: mongoose.Types.ObjectId(),
				ethAddress: data.address,
				accessToken: data.session.accessToken,
				refreshToken: data.session.refreshToken,
				expirationDate: data.session.expires,
			});
			await db.collection("users").insertOne(user);

			// Else, update the user profile
		} else {
			await db.collection("users").updateOne(
				{ ethAddress: data.address },
				{
					$set: {
						accessToken: data.session.accessToken,
						refreshToken: data.session.refreshToken,
						expirationDate: data.session.expires,
					},
				}
			);
		}

		// Return a success message
		return res.json({ msg: "success" });

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return res.status(500).json({ error: JSON.stringify(e) });
	}
}
