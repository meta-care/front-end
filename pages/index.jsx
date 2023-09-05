import { useIsMounted } from "./hooks/useIsMounted";
import { getSession } from "next-auth/react";
import { NavBar } from "../components/navBar/HomePage/index.jsx";
import { getUser } from "../components/mongoDB/getUser";
import { HomeMenu } from "../components/home/Home.jsx";

export default function Home({ user }) {
	const mounted = useIsMounted();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<HomeMenu />
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
