import { useState } from "react";
import styles from "../../../styles/Home.module.css";
import { ShowData } from "./showData";

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
