import { Suspense, useRef } from 'react';
import { useIsMounted } from "../hooks/useIsMounted";
import { getUser } from "../../components/mongoDB/getUser";
import { NavBar } from "../../components/navBar/InApplicationNav/index.jsx";
import { getSession } from "next-auth/react";
import DataMenu from "../../components/dashboard/data/Data.jsx";
import { getPatients } from "../../components/mongoDB/getPatients";
import { Canvas } from '@react-three/fiber';
import styles from "./data.module.css";
import AvatarDisplay from '../../components/characters/AvatarDisplay';

export default function Data({ user, patients }) {
	const mounted = useIsMounted();
	
	const productCanvasRef = useRef();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<div className={styles.main}>
						<div className={styles.product_canvas} ref={productCanvasRef}>
							<Canvas >
								<Suspense fallback={"null"}>
								<AvatarDisplay containerRef={productCanvasRef}/>
								</Suspense>
							</Canvas>  
						</div>
						<DataMenu user={user} patients={patients} />
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

	// Get the patients of this user
	let patients = await getPatients(user.email);
	patients = JSON.parse(JSON.stringify(patients));

	// Return the user profile and his patients
	return {
		props: { user, patients },
	};
}
