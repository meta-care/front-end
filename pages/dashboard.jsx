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
	const [createUserLoading, setCreateUserLoading] = useState(false);
	const [createUserError, setCreateUserError] = useState("");
	const { isConnected, address } = useAccount();
	const [imageURL, setimageURL] = useState("");
	const [ownNFT, setOwnNFT] = useState(false);
	const [session] = useSession();
	const mounted = useIsMounted();
	const router = useRouter();

	// Handle contract write
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: "0x93834E6754C4086D7ED460349D1925108d14e29e",
		abi,
		functionName: "mint",
		args: [],
	});
	const { data, error, isError, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	// Send user data to MongoDB and then mint NFT
	const handleMint = async () => {
		setCreateUserLoading(true);
		setCreateUserError("");
		fetch("/api/createUser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ session, address }),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setCreateUserLoading(false);
				console.log(data);

				// Mint NFT
				write();
			})
			.catch((error) => {
				setCreateUserLoading(false);
				setCreateUserError(error);
			});
	};

	// Check if the user have an NFT
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
					setimageURL(data.imageURL);
					setOwnNFT(data.ownNFT);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [isConnected, address, isSuccess]);

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
												onClick={() => {
													handleMint();
												}}
												disabled={isLoading || createUserLoading}
												className={styles.button}
											>
												<p>
													{" "}
													{isLoading || createUserLoading
														? "Minting..."
														: "Mint NFT"}
												</p>
											</button>
											{(createUserError || isPrepareError || isError) && (
												<p>
													Error:{" "}
													{
														(createUserError || prepareError || error)
															?.message
													}
												</p>
											)}
										</>
									)}
								</>
							) : (
								<>
									<h2 style={{ color: "#091562", fontSize: "2rem" }}>
										Here is your beautiful NFT:
									</h2>
									<img
										src={imageURL}
										width="300px"
										height="300px"
										className={styles.nft}
									/>
								</>
							)}
						</>
					)}
				</>
			)}
		</main>
	);
}

/*
		const user = {
			address: address,
			accessToken: session.accessToken,
			refreshToken: session.refreshToken,
			expirationDate: session.expires,
		};*/

// Send user data to MongoDB

/*
		try {
			await fetch("/api/mint", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
		} catch (error) {
			console.error(error);
		}
		*/
