import { getSession } from "next-auth/client";
import { useIsMounted } from "../hooks/useIsMounted";
import { getUser } from "../../components/mongoDB/getUser";
import { Free } from "../../components/dashboard/free";
import { Premium } from "../../components/dashboard/premium";
import { Header } from "../../components/header";

export default function Dashboard({ user }) {
	const mounted = useIsMounted();

	return (
		<>
			<Header user={user} />
			{mounted && <>{user.premium ? <Premium user={user} /> : <Free user={user} />}</>}
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
