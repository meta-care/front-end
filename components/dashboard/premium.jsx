import { signOut } from "next-auth/client";
import styles from "../../styles/Home.module.css";

export function Premium({ user }) {
	return (
		<main className={styles.main}>
			<button
				className={styles.button}
				onClick={() =>
					signOut("google", {
						redirect: true,
						callbackUrl: "/",
					})
				}
			>
				{"SignOut"}
			</button>
		</main>
	);
}
