import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";

const DesktopNav = ({ user }) => {
	const router = useRouter();
	return (
		<nav className={styles.desktopNav}>
			<div style={{ alignItems: "center" }} className={styles.navLogo}>
				<img
					src={"metacare.png"}
					width="228px"
					height="49px"
					style={{
						cursor: "pointer",
						marginTop: "3px",
					}}
					onClick={() => router.push(`/`)}
				/>
			</div>
			<NavLinks user={user} />
		</nav>
	);
};

export default DesktopNav;
