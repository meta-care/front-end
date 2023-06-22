import { getSession } from "next-auth/client";
import { useIsMounted } from "./hooks/useIsMounted";
import { getUser } from "../components/mongoDB/getUser";
import { Header } from "../components/header";
import { Professionnals } from "../components/professionnals";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/client";
import styles from "../styles/Home.module.css";

export default function Dashboard({ user }) {
	const mounted = useIsMounted();
	const [userData, setUserData] = useState([]);
	const [finishedGettingData, setFinishedGettingData] = useState(false);

	// Get user's data
	useEffect(() => {
		const url = new URL("/api/getHistoricalData", window.location.origin);
		url.searchParams.append("email", user.email);
		url.searchParams.append("refreshToken", user.refreshToken);
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
				setFinishedGettingData(true);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [user]);

	return (
		<>
			<Header user={user} />
			{mounted && (
				<main className={styles.main}>
					<button
						className={styles.button}
						onClick={() =>
							signOut("google", {
								redirect: true,
								callbackUrl: "/",
							})
						}
					>
						{"SignOut"}
					</button>
					<Professionnals user={user} />
					<h2 style={{ color: "#091562", fontSize: "2rem" }}>Your Historical Data:</h2>
					{!finishedGettingData ? (
						<p>Loading...</p>
					) : (
						<>
							{userData.data.length > 0 ? (
								<p>You have {userData.data.length} data pieces </p>
							) : (
								<p>You don't have any historical data yet.</p>
							)}
						</>
					)}
				</main>
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
