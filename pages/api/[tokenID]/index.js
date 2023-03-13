import clientPromise from "../../../components/mongoDB/mongodb";

export default async function metadata(req, res) {
	// get the tokenID from the URL
	let { tokenID } = req.query;
	tokenID = parseInt(tokenID);

	//find a user with this tokenID in the database
	let user = null;
	try {
		let client = await clientPromise;
		let db = await client.db();
		user = await db.collection("users").findOne({ tokenID: tokenID });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal Server Error" });
	}

	// if there is no user with this tokenID, return 404
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}

	// return the metadata
	return res.json({
		name: `${user.name}'s Data Digital Twin`,
		description: "MetaCare Health",
		image: `${process.env.NEXTAUTH_URL}/api/${tokenID}/image`,
		external_url: `${process.env.NEXTAUTH_URL}/NFT/${tokenID}`,
		attributes: [
			{ "trait-type": "achievement 1", value: user.achievements[0] },
			{ "trait-type": "achievement 2", value: user.achievements[1] },
			{ "trait-type": "achievement 3", value: user.achievements[2] },
		],
	});
}
