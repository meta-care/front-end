import { signIn, signOut } from "next-auth/react";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";
import { useIsMounted } from "../../../pages/hooks/useIsMounted";

const NavLinks = ({ user }) => {
	const router = useRouter();
	const mounted = useIsMounted();
	return (
		<div>
			{mounted && (
				<div className={styles.navLinks}>
					<ul>
						<li>
							<a href="https://www.crotaluslabs.com/" className={styles.navText}>
								About Us
							</a>
						</li>

						{/*Link for other pages (Blog, Docs)...*/}

						<li>
							<button
							style={{marginLeft: "20%"}}
								className={styles.startedButton}
								onClick={() =>
									user
										? router.push(`/dashboard`)
										: signIn("google", {
												redirect: true,
												callbackUrl: "/signup",
										  })
								}
							>
								{user ? "Dashboard" : "Sign Up"}
							</button>
						</li>

					</ul>
				</div>
			)}
		</div>
	);
};

export default NavLinks;
