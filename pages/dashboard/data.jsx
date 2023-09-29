import { Suspense, useRef } from "react";
import { useIsMounted } from "../hooks/useIsMounted";
import { getUser } from "../../components/mongoDB/getUser";
import { NavBar } from "../../components/navBar/InApplicationNav/index.jsx";
import { getSession } from "next-auth/react";
import { ShowData } from "../../components/dashboard/data/showData";
import { Canvas } from "@react-three/fiber";
import styles from "./data.module.css";
import AvatarDisplay from "../../components/characters/AvatarDisplay";

export default function Data({ user, backendUrl }) {
	const mounted = useIsMounted();

	const productCanvasRef = useRef();

	return (
		<>
			{mounted && (
				<>
					<NavBar user={user} />
					<div className={styles.main}>
						<div className={styles.product_canvas} ref={productCanvasRef}>
							<Canvas>
								<Suspense fallback={"null"}>
									<AvatarDisplay user={user} containerRef={productCanvasRef} />
								</Suspense>
							</Canvas>
						</div>
						<ShowData user={user} owndata={true} backendUrl={backendUrl} />
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
		props: { user, backendUrl: process.env.BACKEND_URL },
	};
}
