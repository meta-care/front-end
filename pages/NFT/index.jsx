import { useRouter } from "next/router";
import { Header } from "../../components/header";
import styles from "../../styles/Home.module.css";
import { getSession } from "next-auth/client";
import { getUser } from "../../components/mongoDB/getUser";

export default function NFT({ user }) {
	const router = useRouter();
	return (
		<>
			<Header user={user} />
			<div style={{ textAlign: "center" }}>
				<h1>Coming Soon...</h1>
				<button className={styles.button} onClick={() => router.push(`/`)}>
					Go back home
				</button>
			</div>
		</>
	);
}

export async function getServerSideProps(context) {
	// Check if the user is connected and get his profile
	let user = null;
	const session = await getSession(context);
	if (session) {
		const profile = await getUser(session);
		if (profile) {
			user = JSON.parse(JSON.stringify(profile));
		}
	}

	return {
		props: { user },
	};
}
