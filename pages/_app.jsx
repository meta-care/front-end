import "../styles/globals.css";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<>
			<Head>
				<title>MetaCare Health</title>
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<meta name="description" content="Monitor Your Health Data" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<SessionProvider session={session} refetchInterval={5 * 60}>
				<Component {...pageProps} />
			</SessionProvider>
		</>
	);
}
