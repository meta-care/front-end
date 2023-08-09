import styles from "../styles/Home.module.css";
import { useIsMounted } from "./hooks/useIsMounted";
import { getSession } from "next-auth/react";
import { NavBar } from "../components/home/NavBar/NavBar.jsx";
import MainBody from "../components/home/Body/main.jsx";
import { getUser } from "../components/mongoDB/getUser";

export default function Home({ user }) {
	// Check if the component is mounted to avoid React state update on unmounted component
	const mounted = useIsMounted();

	return (
		<>
			<NavBar user={user} />
			<MainBody />
			<footer>
				<a href="https://www.crotaluslabs.com/" target="_blank" rel="noopener noreferrer">
					Powered by Crotalus Labs&reg;
				</a>
			</footer>
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
