import { useRouter } from "next/router";
import { signOut } from "next-auth/client";
import styles from "../../styles/Home.module.css";

export function Premium({ user }) {
	const router = useRouter();

	return (
		<>
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
			<button
				style={{ margin: "1rem" }}
				className={styles.button}
				onClick={() => router.push(`/NFT/${user.tokenID}`)}
			>
				<p>See your NFT</p>
			</button>
		</>
	);
}
