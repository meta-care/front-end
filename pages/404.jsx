import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function FourOhFour() {
	const router = useRouter();
	return (
		<div style={{ textAlign: "center" }}>
			<h1>404 | Page Not Found :(</h1>
			<button className={styles.button} onClick={() => router.push(`/`)}>
				Go back home
			</button>
		</div>
	);
}
