import { useIsMounted } from "../hooks/useIsMounted";
import { getUser } from "../../components/mongoDB/getUser";
import { NavBar } from "../../components/navBar/InApplicationNav/index.jsx";
import { getSession } from "next-auth/react";
import { getPatients } from "../../components/mongoDB/getPatients";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { ShowData } from "../../components/dashboard/data/showData";

export default function ProfessionnalsData({ user, patients }) {
	const mounted = useIsMounted();
	const [selectedUser, setSelectedUser] = useState();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<div className={styles.main}>
						{selectedUser && <ShowData user={selectedUser} owndata={false} />}
						<h1> Look at your patients data:</h1>
						{patients.map((patient) => (
							<div onClick={() => setSelectedUser(patient)} key={patient._id}>
								{patient.name}
							</div>
						))}
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

	// Get the patients of this user
	let patients = await getPatients(user.email);
	patients = JSON.parse(JSON.stringify(patients));

	// Redirect users without patients to the dashboard page
	if (patients.length == 0) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	// Return the user profile and his patients
	return {
		props: { user, patients },
	};
}
