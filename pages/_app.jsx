import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
	RainbowKitProvider,
	getDefaultWallets,
	connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider, webSocketProvider } = configureChains(
	[chain.goerli, chain.mainnet],
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
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}
