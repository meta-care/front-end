import { useIsMounted } from "../hooks/useIsMounted";
import DashboardMenu from "../../components/dashboard/Dashboard.jsx";
import { NavBar } from "../../components/navBar/InApplicationNav/index.jsx";
import { getSession } from "next-auth/react";
import { getUser } from "../../components/mongoDB/getUser";
import { useEffect } from "react";
import { getPatients } from "../../components/mongoDB/getPatients";

export default function Dashboard({ user, isDoctor, backendUrl }) {
	const mounted = useIsMounted();

	// Store the newest user data in the database
	useEffect(() => {
		fetch(`${backendUrl}/historical`, {
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
					<DashboardMenu isDoctor={isDoctor} />
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

	// Know if the user is a doctor or a patient
	let patients = await getPatients(user.email);
	patients = JSON.parse(JSON.stringify(patients));
	let isDoctor = false;
	if (patients.length > 0) {
		isDoctor = true;
	}

	// Return the user profile
	return {
		props: { user, isDoctor, backendUrl: process.env.BACKEND_URL },
	};
}
