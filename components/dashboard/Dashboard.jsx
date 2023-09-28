import styles from "./Dashboard.module.css";
import { useRouter } from "next/router";

const DashboardMenu = ({ isDoctor }) => {
	const router = useRouter();

	return (
		<div className={styles.menu}>
			{/*Data Digital Twin*/}
			<div className={styles.menuItems} onClick={() => router.push("/dashboard/data")}>
				<img src={"/DDT.png"} className={styles.img} alt="" />
				<h2>Data Digital Twin</h2>
			</div>

			{/*Manage Doctor or Patient*/}
			{isDoctor ? (
				<div
					className={styles.menuItems}
					onClick={() => router.push("/dashboard/patients")}
				>
					<img src={"/Manage_Doctor.png"} className={styles.img} alt="" />
					<h2>Manage Patients</h2>
				</div>
			) : (
				<div className={styles.menuItems} onClick={() => router.push("/dashboard/doctors")}>
					<img src={"/Manage_Doctor.png"} className={styles.img} alt="" />
					<h2>Manage Doctor</h2>
				</div>
			)}

			{/*Settings*/}
			<div className={styles.menuItems} onClick={() => router.push("/dashboard/settings")}>
				<img src={"/Settings.png"} className={styles.img} alt="" />
				<h2>Settings</h2>
			</div>

			{/*Recommendations*/}
			<div className={styles.menuItems_soon}>
				<img src={"/Recommendations.png"} className={styles.img} alt="" />
				<h2>Recommendations</h2>
				<div className={styles.comingSoon}>
					<h2>Coming soon</h2>
				</div>
			</div>

			{/*Value Accrued*/}
			<div className={styles.menuItems_soon}>
				<img src={"/Value_accrued.png"} className={styles.img} alt="" />
				<h2>Value Accrued</h2>
				<div className={styles.comingSoon}>
					<h2>Coming soon</h2>
				</div>
			</div>
		</div>
	);
};

export default DashboardMenu;
