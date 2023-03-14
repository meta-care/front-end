import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { baseGoerli } from "@wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import Head from "next/head";

const { chains, provider, webSocketProvider } = configureChains(
	[baseGoerli],
	[
		jsonRpcProvider({
			rpc: (chain) => ({
				http: `https://${process.env.QUICKNODE_URL}`,
				webSocket: `wss://${process.env.QUICKNODE_URL}`,
			}),
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
