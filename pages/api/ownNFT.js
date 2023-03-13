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
	const contractAddress = "0x7bAa340fc65e41a43ad8266db3c1dc8849193E92";
	const provider = new ethers.providers.JsonRpcProvider(
		`https://${process.env.BLOCKCHAIN}.infura.io/v3/${process.env.INFURA_KEY}`
	);
	const contract = new ethers.Contract(contractAddress, abi, provider);

	try {
		// Call the view function to check if the user have an NFT
		const balance = await contract.balanceOf(address);

		// Return the result
		if (balance != 0) {
			res.json({ ownNFT: true });
		} else {
			res.json({ ownNFT: false });
		}
	} catch (e) {
		console.log("ERROR: " + e);
		res.status(500).json({ error: JSON.stringify(e) });
	}
};
