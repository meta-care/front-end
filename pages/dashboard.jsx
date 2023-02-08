import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { signIn, useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function dashboard() {
	const { isConnected, address } = useAccount();
	const [ownNFT, setOwnNFT] = useState(false);
	const [session] = useSession();

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
								<p>mint</p>
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

/*
<div>
	<h2 style={{ color: "#091562" }}>Step 2: Mint your NFT</h2>
	<form
		style={{ marginTop: "2%" }}
		onSubmit={(e) => {
			e.preventDefault();
			write?.();
		}}
	>
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
);

<div>
	<h2 style={{ color: "#091562" }}>Step 3: Access your Health Data</h2>
	<ConnectButton showBalance={false} />
	<h3>You have successfully minted your NFT!</h3>
	<a className="" href={`https://goerli.etherscan.io/tx/${data?.hash}`}>
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
);
*/
