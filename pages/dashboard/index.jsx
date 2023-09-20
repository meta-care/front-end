import { useIsMounted } from "../hooks/useIsMounted";
import DashboardMenu from "../../components/dashboard/Dashboard.jsx";
import { NavBar } from "../../components/navBar/InApplicationNav/index.jsx";
import { getSession } from "next-auth/react";
import { getUser } from "../../components/mongoDB/getUser";
import { useEffect } from "react";

export default function Dashboard({ user }) {
	const mounted = useIsMounted();

	// Store the newest user data in the database
	useEffect(() => {
		fetch(`http://localhost:8080/historical`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: user.email, refreshToken: user.refreshToken }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<div style={{ display: "flex", justifyContent: "center" }}>
						<img
							src={"/metacare.png"}
							width="350px"
							height="75px"
							style={{
								marginTop: "3%",
							}}
						/>
					</div>
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

	// Verify that the user does have all the required fields
	if (!user.birthDate || !user.weight || !user.height || !user.gender) {
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
