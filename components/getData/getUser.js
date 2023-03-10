import clientPromise from "../mongoDB/mongodb";
import User from "../mongoDB/user";
import abi from "../contract-abi.json";
import { ethers } from "ethers";
const mongoose = require("mongoose");

export async function getUser(session) {
	try {
		// Get the client and the database connection from mongoDB
		let client = await clientPromise;
		let db = await client.db();

		// Check if the user is registered on the database
		let profile = await db.collection("users").findOne({ email: session.user.email });
		let imageURL = null;

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

			// Else, the user already exists
		} else {
			// Get the NFT image URL if the user is premium
			if (profile.premium) {
				const contractAddress = "0xFD4047e04476b15FF95cc36782256B8594a60582";
				const provider = new ethers.providers.JsonRpcProvider(
					`https://${process.env.BLOCKCHAIN}.infura.io/v3/${process.env.INFURA_KEY}`
				);
				const contract = new ethers.Contract(contractAddress, abi, provider);
				const tokenNumber = await contract.tokenOfOwnerByIndex(profile.address, 0);
				const tokenURI = await contract.tokenURI(tokenNumber);
				const response = await fetch(tokenURI);
				const data = await response.json();
				imageURL = data.image;
			}

			// Check if the user have a new refresh token
			if (session.refreshToken != profile.refreshToken) {
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
		}

		return { profile, imageURL };

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return;
	}
}
