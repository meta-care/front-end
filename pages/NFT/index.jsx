import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export default function NFT() {
	const router = useRouter();
	return (
		<div style={{ textAlign: "center" }}>
			<h1>Nothing here for now, come back later...</h1>
			<button className={styles.button} onClick={() => router.push(`/`)}>
				Go back home
			</button>
		</div>
	);
}
