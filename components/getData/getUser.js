import clientPromise from "../mongoDB/mongodb";
import User from "../mongoDB/user";
const mongoose = require("mongoose");

export async function getUser(session) {
	try {
		// Get the user profile from mongoDB
		let client = await clientPromise;
		let db = await client.db();
		let profile = await db.collection("users").findOne({ email: session.user.email });

		// If the user is not registered, create a new user
		if (!profile) {
			var date = new Date();
			var now_utc = Date.UTC(
				date.getUTCFullYear(),
				date.getUTCMonth(),
				date.getUTCDate(),
				date.getUTCHours(),
				date.getUTCMinutes(),
				date.getUTCSeconds()
			);
			let user = new User({
				_id: mongoose.Types.ObjectId(),
				email: session.user.email,
				name: session.user.name,
				image: session.user.image,
				refreshToken: session.refreshToken,
				signupDate: new Date(now_utc).toISOString(),
				premium: false,
			});
			profile = user;
			await db.collection("users").insertOne(user);

			// Else check if the user have a new refresh token
		} else if (session.refreshToken != profile.refreshToken) {
			profile = { ...profile, refreshToken: session.refreshToken };
			await db.collection("users").updateOne(
				{ email: session.user.email },
				{
					$set: {
						refreshToken: session.refreshToken,
						image: session.user.image,
					},
				}
			);
		}
		return profile;

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return;
	}
}
