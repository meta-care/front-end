import styles from "../styles/Home.module.css";
import AnimatedText from "react-animated-text-content";
import { useIsMounted } from "./hooks/useIsMounted";
import { getSession } from "next-auth/client";
import { Header } from "../components/header.jsx";
import { getUser } from "../components/mongoDB/getUser";

export default function Home({ user }) {
	// Check if the component is mounted to avoid React state update on unmounted component
	const mounted = useIsMounted();

	return (
		<>
			<Header user={user} />
			<main className={styles.main}>
				{mounted && (
					<div className={styles.columns}>
						<div className={styles.description}>
							<h2 style={{ color: "#091562" }}>
								A Blockchain-based Healthcare <br></br>Data Management Solution.
							</h2>

							<h5 style={{ color: "#091562" }}>
								<AnimatedText
									type="words"
									animation={{
										x: "200px",
										y: "-20px",
										scale: 1.1,
										ease: "ease-in-out",
									}}
									animationType="lights"
									interval={0.06}
									duration={0.8}
									tag="p"
									className="animated-paragraph"
									includeWhiteSpaces
									threshold={0.1}
									rootMargin="20%"
								>
									Track your data. Share it with your doctor. Improve your global
									health.
								</AnimatedText>
							</h5>
						</div>

						<img
							className={styles.img}
							src={"blue-men.jpg"}
							width="350px"
							height="600px"
							alt=""
							style={{
								margin: "auto",
								marginLeft: "4%",
							}}
						/>
					</div>
				)}
			</main>
			<footer>
				<a href="https://www.crotaluslabs.com/" target="_blank" rel="noopener noreferrer">
					Powered by Crotalus Labs&reg;
				</a>
			</footer>
		</>
	);
}

export async function getServerSideProps(context) {
	// Check if the user is connected and get his profile
	let user = null;
	const session = await getSession(context);
	if (session) {
		const profile = await getUser(session);
		if (profile) {
			user = JSON.parse(JSON.stringify(profile));
		}
	}

	return {
		props: { user },
	};
}
