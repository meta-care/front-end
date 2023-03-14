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
	const contractAddress = "0x9C0A3088f2366E2e94BEd6B679471C7a23e1A62E";
	const provider = new ethers.providers.JsonRpcProvider(`https://${process.env.QUICKNODE_URL}`);
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
