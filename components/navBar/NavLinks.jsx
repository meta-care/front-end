import { signIn, signOut } from "next-auth/react";
import styles from "./NavBar.module.css";
import { useRouter } from "next/router";
import { useIsMounted } from "../../pages/hooks/useIsMounted";

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

						{user && (
							<li>
								<button
									className={styles.startedButton}
									onClick={() =>
										signOut("google", {
											redirect: true,
											callbackUrl: "/",
										})
									}
								>
									SignOut
								</button>
							</li>
						)}

						<li>
							<button
								className={styles.startedButton}
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
						</li>

						{user && <h2>{user.name}</h2>}

						{user && <img src={user.image} alt="" />}
					</ul>
				</div>
			)}
		</div>
	);
};

export default NavLinks;
