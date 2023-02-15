import { ethers } from "ethers";
import abi from "../../components/contract-abi.json";

// Check if the user have an NFT
export default async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
	}

	// Get the address from the request body
	const { address } = req.body;
	if (!address) {
		return res.status(404).json({ msg: "no data" });
	}

	// Connect to the contract
	const contractAddress = "0x1Cd5c46E1a7df46d6145A8d67830fc02b3187767";
	const provider = new ethers.providers.JsonRpcProvider(
		`https://${process.env.BLOCKCHAIN}.infura.io/v3/${process.env.INFURA_KEY}`
	);
	const contract = new ethers.Contract(contractAddress, abi, provider);

	try {
		// Call the view function to check if the user have an NFT
		const balance = await contract.balanceOf(address);

		// If the user have an NFT, return the image URL
		if (balance != 0) {
			// Get the token number
			const tokenNumber = await contract.tokenOfOwnerByIndex(address, 0);

			// Get the token URI
			const tokenURI = await contract.tokenURI(tokenNumber);
			const response = await fetch(tokenURI);
			const data = await response.json();
			const imageURL = data.image;

			// Return the image URL and a boolean to indicate that the user have an NFT
			res.json({ ownNFT: true, imageURL });

			// If the user don't have an NFT, return an empty string
		} else {
			res.json({ ownNFT: false, imageURL: "" });
		}
	} catch (e) {
		console.log("ERROR: " + e);
		res.status(500).json({ error: JSON.stringify(e) });
	}
};
