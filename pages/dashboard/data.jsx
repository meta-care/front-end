import { Suspense, useRef, useState } from 'react';
import { useIsMounted } from "../hooks/useIsMounted";
import { getUser } from "../../components/mongoDB/getUser";
import { NavBar } from "../../components/navBar/NavBar.jsx";
import { getSession } from "next-auth/react";
import DataMenu from "../../components/dashboard/data/Data.jsx";
import { getPatients } from "../../components/mongoDB/getPatients";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'
import MaleModel from '../../components/characters/MaleModel';
import FemaleModel from '../../components/characters/FemaleModel.jsx';
import styles from "./data.module.css";

export default function Data({ user, patients }) {
	const mounted = useIsMounted();

	const ref = useRef();

  	const [currentModel, setCurrentModel] = useState('male');
  
	const handleModelChange = (model) => {
		setCurrentModel(model);
	};

	// State to track current animation
	const [currentAnimation] = useState('Wave');

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<div className={styles.main}>
						<div className={styles.product_canvas}>
							<Canvas>
								<Suspense fallback={null}>
								<ambientLight intensity={1.5}/> 
								<OrbitControls enablePan={false}
									enableZoom ={false}
									enableRotate = {true}
									maxPolarAngle={Math.PI/2.7}
									minPolarAngle={Math.PI/2.7}
									maxAzimuthAngle={0}/>
								{currentModel === 'male' ? <MaleModel currentAnimation={currentAnimation} /> : <FemaleModel currentAnimation={currentAnimation} />}
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
