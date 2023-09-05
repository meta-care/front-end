import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";

const Desktop = ({ user }) => {
	const router = useRouter();
	return (
		<nav className={styles.desktopNav}>
			<NavLinks user={user} />
		</nav>
	);
};

export default Desktop;
