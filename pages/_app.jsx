import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";

const { chains, provider, webSocketProvider } = configureChains(
	[chain.goerli],
	[
		infuraProvider({
			apiKey: process.env.INFURA_API_KEY,
		}),
		publicProvider(),
	]
);

const { connectors } = getDefaultWallets({
	appName: "RainbowKit App",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider,
});

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>MetaCare Health</title>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta name="description" content="Your Health Data On-Chain" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains}>
					<Component {...pageProps} />
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
}
