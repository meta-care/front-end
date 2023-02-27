import { getSession } from "next-auth/client";
import { useIsMounted } from "./hooks/useIsMounted";
import { useRouter } from "next/router";
import { getUser } from "../components/getData/getUser";
import { Free } from "../components/dashboard/free";
import { Premium } from "../components/dashboard/premium";
import styles from "../styles/Home.module.css";

export default function Dashboard({ session, user, imageURL }) {
	const mounted = useIsMounted();
	const router = useRouter();

	return (
		<main className={styles.main}>
			<img
				src={"metacareLogo.png"}
				width="177px"
				height="192px"
				onClick={() => router.push(`/`)}
			/>
			{mounted && (
				<>
					{user.premium ? (
						<Premium session={session} user={user} imageURL={imageURL} />
					) : (
						<Free session={session} user={user} />
					)}
				</>
			)}
		</main>
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
	const result = await getUser(session);
	if (!result?.profile) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	//Transform the profile object so it doesn't show an error because of the _id component
	const user = JSON.parse(JSON.stringify(result.profile));

	// Return the user profile
	return {
		props: { session, user, imageURL: result.imageURL },
	};
}
