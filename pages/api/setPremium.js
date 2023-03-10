import clientPromise from "../../components/mongoDB/mongodb";
import { ethers } from "ethers";
import abi from "../../components/contract-abi.json";

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

	// Get the token ID
	let tokenID;
	try {
		const contractAddress = "0xFD4047e04476b15FF95cc36782256B8594a60582";
		const provider = new ethers.providers.JsonRpcProvider(
			`https://${process.env.BLOCKCHAIN}.infura.io/v3/${process.env.INFURA_KEY}`
		);
		const contract = new ethers.Contract(contractAddress, abi, provider);
		tokenID = await contract.tokenOfOwnerByIndex(data.address, 0);
		tokenID = tokenID.toNumber();
	} catch (e) {
		console.log("ERROR: " + e);
		return res.status(500).json({ error: JSON.stringify(e) });
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
					premium: true,
					address: data.address,
					premiumDate: new Date(now_utc).toISOString(),
					tokenID,
				},
			}
		);

		// Return the token ID
		return res.json({ tokenID });

		// Catch any errors
	} catch (e) {
		console.log("ERROR: " + e);
		return res.status(500).json({ error: JSON.stringify(e) });
	}
}
