import { signIn } from "next-auth/client";
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
						<a 
						href="https://www.crotaluslabs.com/"
						className={styles.navText}>
							About Us
						</a>
					</li>
					<li>
						<a 
						href="https://www.crotaluslabs.com/"
						className={styles.navText}>
							Blog
						</a>
					</li>
					<li>
						<a 
						href="https://www.crotaluslabs.com/"
						className={styles.navText}>
							Documentation
						</a>
					</li>
					<li>

					<button
						className={styles.startedButton}
						onClick={() => router.push(`/comingSoon`)
						}
						> Get Started
						</button>

						{/* Commented the redirect button to Google Auth and replaced routing to ComingSoon page

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
						</button>*/}
					</li>
				</ul>
			</div>
		)}
	 </div>
	);
}
 
export default NavLinks;