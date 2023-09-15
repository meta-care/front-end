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
												callbackUrl: "/signup",
										  })
								}
							>
								{user ? "Dashboard" : "Get Started"}
							</button>
						</li>

						{user && <img className={styles.userImg} src={user.image} alt="" />}

						{user && (
							<h2
								style={{
									whiteSpace: "nowrap",
									marginLeft: "5px",
									color: "#0093ff",
								}}
							>
								{user.name}
							</h2>
						)}
					</ul>
				</div>
			)}
		</div>
	);
};

export default NavLinks;
