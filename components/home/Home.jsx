import Desktop from "./Desktop";
import Mobile from "./Mobile";
import styles from "./home.module.css";

export function HomeMenu() {
	return (
		<>
			<div className={styles.DesktopMain}>
				<Desktop />
			</div>
			<div className={styles.mobileMain}>
				<Mobile />
			</div>
		</>
	);
}
