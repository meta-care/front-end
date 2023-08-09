import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import { NavBar } from "../components/navBar/NavBar.jsx";
import { useIsMounted } from "./hooks/useIsMounted";

export default function FourOhFour() {
	const mounted = useIsMounted();
	const router = useRouter();

	return (
		<>
			{mounted && (
				<>
					<NavBar />

					<div style={{ textAlign: "center" }}>
						<h1>404 | Page Not Found :(</h1>
						<button className={styles.button} onClick={() => router.push(`/`)}>
							Go back home
						</button>
					</div>
				</>
			)}
		</>
	);
}
