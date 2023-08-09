import { useIsMounted } from "../hooks/useIsMounted";
import DashboardMenu from "../../components/Dashboard/Dashboard.jsx";
import { NavBar } from "../../components/navBar/NavBar.jsx";
import { getSession } from "next-auth/react";
import { getUser } from "../../components/mongoDB/getUser";

export default function Dashboard({ user }) {
	const mounted = useIsMounted();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<DashboardMenu />
				</>
			)}
		</>
	);
}

export async function getServerSideProps(context) {
	// Check if the user is connected. Otherwise return him to the home page
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	// Get the user profile
	const profile = await getUser(session);
	if (!profile) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	const user = JSON.parse(JSON.stringify(profile));

	// Return the user profile
	return {
		props: { user },
	};
}
