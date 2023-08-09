import { useEffect, useState } from "react";
import styles from "../../../styles/Home.module.css";

const DataMenu = ({ user }) => {
	const [userData, setUserData] = useState([]);
	const [finishedGettingData, setFinishedGettingData] = useState(false);

	// Get user's data
	useEffect(() => {
		const url = new URL("/api/getHistoricalData", window.location.origin);
		url.searchParams.append("email", user.email);
		url.searchParams.append("refreshToken", user.refreshToken);
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				setUserData(data);
				setFinishedGettingData(true);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [user]);

	return (
		<main className={styles.main}>
			<h2 style={{ color: "#091562", fontSize: "2rem" }}>Your Historical Data:</h2>
			{!finishedGettingData ? (
				<p>Loading...</p>
			) : (
				<>
					{userData.data.length > 0 ? (
						<p>You have {userData.data.length} data pieces </p>
					) : (
						<p>You don't have any historical data yet.</p>
					)}
				</>
			)}
		</main>
	);
};

export default DataMenu;
