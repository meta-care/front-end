import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

export function Premium({ session, user }) {
	const router = useRouter();

	return (
		<>
			<button className={styles.button} onClick={() => router.push(`/NFT/${user.tokenID}`)}>
				<p>See your NFT</p>
			</button>
		</>
	);
}
