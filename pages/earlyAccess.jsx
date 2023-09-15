import { useIsMounted } from "./hooks/useIsMounted";
import { getSession } from "next-auth/react";
import { NavBar } from "../components/navBar/HomePage/index.jsx";
import { getUser } from "../components/mongoDB/getUser";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function EarlyAccess({ user }) {
	const mounted = useIsMounted();
	const router = useRouter();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />

					<div style={{ textAlign: "center" }}>
						<h1>Coming Soon...</h1>
						<button className={styles.button} onClick={() => router.push(`/`)}>
							Go back home
						</button>
					</div>
				</>
			)}
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
