import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signIn, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useIsMounted } from "./hooks/useIsMounted";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
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

	// redirect to other pages
	const router = useRouter();

	// Check if the component is mounted to avoid React state update on unmounted component
	const mounted = useIsMounted();

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
		<main className={styles.main}>
			<img
				src={"metacareLogo.png"}
				width="177px"
				height="192px"
				onClick={() => router.push(`/`)}
			/>
			{mounted && (
				<>
					{!isConnected ? (
						<>
							<h2 style={{ color: "#091562", fontSize: "2rem" }}>
								Step 1: Connect your wallet
							</h2>
							<ConnectButton showBalance={false} />
						</>
					) : (
						<>
							{!ownNFT ? (
								<>
									{!session ? (
										<>
											<h2 style={{ color: "#091562", fontSize: "2rem" }}>
												Step 2: Connect your Google account
											</h2>
											<button
												className={styles.button}
												onClick={() => signIn("google")}
											>
												Connect Google
											</button>
										</>
									) : (
										<>
											<h2 style={{ color: "#091562", fontSize: "2rem" }}>
												Step 3: Mint your NFT
											</h2>
											<button
												onClick={write}
												disabled={isLoading}
												className={styles.button}
											>
												<p> {isLoading ? "Minting..." : "Mint NFT"}</p>
											</button>
											{(isPrepareError || isError) && (
												<p>Error: {(prepareError || error)?.message}</p>
											)}
										</>
									)}
								</>
							) : (
								<h2 style={{ color: "#091562", fontSize: "2rem" }}>
									Here is your beautiful NFT:
								</h2>
							)}
						</>
					)}
				</>
			)}
		</main>
	);
}
