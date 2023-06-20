import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { useIsMounted } from "../pages/hooks/useIsMounted";
import styles from "../styles/Home.module.css";

export function Header({ user }) {
	const router = useRouter();
	const mounted = useIsMounted();

	return (
		<div>
			{mounted && (
				<div className={styles.header}>
					<div style={{ alignItems: "center" }}>
						<img
							src={"logo.png"}
							width="130px"
							height="130px"
							style={{ cursor: "pointer" }}
							onClick={() => router.push(`/`)}
						/>
						<img
							src={"metacare.png"}
							width="326px"
							height="70px"
							style={{
								marginLeft: "2.75rem",
								cursor: "pointer",
								marginBottom: "1.75rem",
							}}
							onClick={() => router.push(`/`)}
						/>
					</div>

					<button
						style={{ marginLeft: "2rem" }}
						className={styles.button}
						onClick={() =>
							user
								? router.push(`/dashboard`)
								: signIn("google", {
										redirect: true,
										callbackUrl: "/dashboard",
								  })
						}
					>
						{user ? "Dashboard" : "Get Started"}
					</button>
				</div>
			)}
		</div>
	);
}
