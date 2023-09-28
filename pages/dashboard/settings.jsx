import { useIsMounted } from "../hooks/useIsMounted";
import { getUser } from "../../components/mongoDB/getUser";
import { NavBar } from "../../components/navBar/InApplicationNav/index.jsx";
import { getSession } from "next-auth/react";
import styles from "../../styles/Home.module.css";
import { signOut } from "next-auth/react";
import router from "next/router";

export default function Data({ user }) {
	const mounted = useIsMounted();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<div className={styles.main}>
						<button
							className={styles.button}
							onClick={() =>
								signOut("google", {
									redirect: true,
									callbackUrl: "/",
								})
							}
						>
							SignOut
						</button>
						<button
							className={styles.button}
							onClick={() => {
								router.push("/createAvatar");
							}}
						>
							Modify your Avatar
						</button>
					</div>
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

	// Verify that the user does have all the required profile fields
	if (!user.birthDate || !user.weight || !user.height) {
		return {
			redirect: {
				destination: "/signup",
				permanent: false,
			},
		};
	}

	// Verify that the user does have an avatar
	if (!user.avatarURL) {
		return {
			redirect: {
				destination: "/createAvatar",
				permanent: false,
			},
		};
	}

	// Return the user profile
	return {
		props: { user },
	};
}
