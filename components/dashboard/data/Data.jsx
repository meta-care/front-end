import { useState, Suspense } from "react";
import styles from "../../../styles/Home.module.css";
import { ShowData } from "./showData";
import DataVisualization from "./DataVisualization.jsx";

const DataMenu = ({ user, patients }) => {
	const [selectedUser, setSelectedUser] = useState(user);

	return (
		<main className={styles.main}>
			{patients.length == 0 ? (
				<ShowData user={user} owndata={true} />
			) : (
				<>
					{selectedUser && (
						<ShowData user={selectedUser} owndata={selectedUser == user} />
					)}
				</>
			)}
			<Suspense>
			<div style={{
			width: "100%",
			padding: "20px", 
			display: "flex",
			flexDirection: "column", 
			alignItems: "center", 
			textAlign: "center",
			}}>
			<h3 style={{margin: 0}}>Heart Rate</h3>
			<DataVisualization />
			</div>
			</Suspense>
			<h2> Look at your patients data:</h2>
			{patients.map((patient) => (
				<div onClick={() => setSelectedUser(patient)} key={patient._id}>
					{patient.name}
				</div>
			))}
			<div onClick={() => setSelectedUser(user)}>Your own data</div>
		</main>
	);
};

export default DataMenu;
