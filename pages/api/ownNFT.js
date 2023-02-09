import { ethers } from "ethers";
import abi from "../../components/contract-abi.json";

// Check if the user have an NFT
export default async (req, res) => {
	if (req.method !== "POST") {
		res.status(405).json({ message: "Method not allowed" });
	}

	const { address } = req.body;
	if (!address) {
		return res.status(404).json({ msg: "no data" });
	}

	const contractAddress = "0xf2F5502c9E5311920c79fB860CC257Dc0Bc9ce16";
	const provider = new ethers.providers.JsonRpcProvider(
		`https://${process.env.BLOCKCHAIN}.infura.io/v3/${process.env.INFURA_KEY}`
	);
	const contract = new ethers.Contract(contractAddress, abi, provider);

	try {
		const balance = await contract.balanceOf(address);
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
