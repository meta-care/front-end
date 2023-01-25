import React from "react";
import AnimatedText from "react-animated-text-content";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
	useAccount,
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
import contractInterface from "../components/contract-abi.json";
import { useDebounce } from "usehooks-ts";
import { useIsMounted } from "./hooks/useIsMounted";

export default function Home() {
	// Check if the component is mounted to avoid React state update on unmounted component
	const mounted = useIsMounted();

	// Check if the user is connected to a wallet
	const { isConnected } = useAccount();

	// Get the doctor's address
	const [doctorAddress, setDoctorAddress] = React.useState("");
	const debouncedDoctorAddress = useDebounce(doctorAddress, 500);

	// Prepare the contract write
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: process.env.SMART_CONTRACT_ADDRESS, // ----------- ENTER THE SMART CONTRAT ADDRESS HERE
		abi: contractInterface,
		functionName: "mint",
		args: [debouncedDoctorAddress],
		enabled: Boolean(debouncedDoctorAddress),
	});

	// Write to the contract
	const { data, error, isError, write } = useContractWrite(config);

	// Wait for the transaction to be mined
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>MetaCare Health</title>
				<meta name="description" content="Your Health Data On-Chain" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				{mounted && (
					<div className={styles.columns}>
						<div>
							<img
								src={"metacareLogo.png"}
								width="177px"
								height="192px"
								alt=""
								style={{ display: "block" }}
							/>
							<p className={styles.description}>
								<h2 style={{ color: "#091562" }}>
									A Blockchain-based Healthcare <br></br>Data Management Solution.
								</h2>
								<h5 style={{ color: "#091562" }}>
									<AnimatedText
										type="words" // animate words or chars
										animation={{
											x: "200px",
											y: "-20px",
											scale: 1.1,
											ease: "ease-in-out",
										}}
										animationType="lights"
										interval={0.06}
										duration={0.8}
										tag="p"
										className="animated-paragraph"
										includeWhiteSpaces
										threshold={0.1}
										rootMargin="20%"
									>
										Track your data. Share it with your doctor. Improve your
										global health.
									</AnimatedText>
								</h5>
							</p>

							{!isConnected && (
								<div>
									<h2 style={{ color: "#091562" }}>
										Step 1: Connect your wallet
									</h2>
									<ConnectButton showBalance={false} />
								</div>
							)}

							{isConnected && !isSuccess && (
								<div>
									<h2 style={{ color: "#091562" }}>Step 2: Mint your NFT</h2>
									<ConnectButton showBalance={false} />
									<form
										style={{ marginTop: "2%" }}
										onSubmit={(e) => {
											e.preventDefault();
											write?.();
										}}
									>
										<input
											id="doctorAddress"
											className={styles.form}
											onChange={(e) => setDoctorAddress(e.target.value)}
											placeholder="Doctor's Address"
											value={doctorAddress}
										/>
										<button
											className={styles.button1}
											disabled={!write || isLoading}
											style={{ marginLeft: "1%" }}
										>
											{isLoading ? "Minting..." : "Mint Health NFT"}
										</button>

										{(isPrepareError || isError) && (
											<div>Error: {(prepareError || error)?.message}</div>
										)}
									</form>
								</div>
							)}

							{isConnected && isSuccess && (
								<div>
									<h2 style={{ color: "#091562" }}>
										Step 3: Access your Health Data
									</h2>
									<ConnectButton showBalance={false} />
									<h3>You have successfully minted your NFT!</h3>
									<a
										className=""
										href={`https://goerli.etherscan.io/tx/${data?.hash}`}
									>
										You can look at your transaction here on Etherscan
									</a>

									<div>
										<img
											src={"normalHeartRate.png"}
											width="400px"
											height="400px"
											style={{ float: "left" }}
										/>
									</div>
								</div>
							)}
						</div>
						<img
							className={styles.img}
							src={"blue-men.jpg"}
							width="350px"
							height="600px"
							alt=""
							style={{
								margin: "auto",
								marginTop: "5%",
								marginLeft: "4%",
							}}
						/>
					</div>
				)}
			</main>

			<footer className={styles.footer}>
				<a href="https://github.com/meta-care" target="_blank" rel="noopener noreferrer">
					Made with
					<img id="animated" src="heartbeat.gif" width="23px" height="23px" alt=""></img>
					by some frens
				</a>
			</footer>
		</div>
	);
}
