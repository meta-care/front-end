import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import {
	useAccount,
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
const abi = require("../components/contract-abi.json");

export default function dashboard() {
	const { isConnected, address } = useAccount();
	const [ownNFT, setOwnNFT] = useState(false);
	const [session] = useSession();

	// Check if the user already has an NFT
	useEffect(() => {
		if (isConnected && address) {
			fetch("/api/ownNFT", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ address }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setOwnNFT(data.ownNFT);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [isConnected, address]);

	// Handle contract write
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: "0xf2F5502c9E5311920c79fB860CC257Dc0Bc9ce16",
		abi,
		functionName: "mint",
		args: [],
	});
	const { data, error, isError, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	// If the mint transaction is successful, show the NFT
	useEffect(() => {
		if (isSuccess) {
			setOwnNFT(true);
		}
	}, [isSuccess]);

	return (
		<main>
			{!isConnected ? (
				<ConnectButton showBalance={false} />
			) : (
				<>
					{!ownNFT ? (
						<>
							{!session ? (
								<button onClick={() => signIn("google")}>
									Connect your Google account
								</button>
							) : (
								<>
									<button onClick={write} disabled={isLoading}>
										<p> {isLoading ? "Minting..." : "Mint your NFT"}</p>
									</button>
									{(isPrepareError || isError) && (
										<p>Error: {(prepareError || error)?.message}</p>
									)}
								</>
							)}
						</>
					) : (
						<p>show nft</p>
					)}
				</>
			)}
		</main>
	);
}
