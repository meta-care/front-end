import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export function Premium({ session, user, imageURL }) {
	const [showTable, setShowTable] = useState(false);
	const [userData, setUserData] = useState([]);
	const [finished, setFinished] = useState(false);
	const [newUser, setNewUser] = useState(false);

	// Get data from the database
	useEffect(() => {
		if (showTable) {
			const url = new URL("/api/getHistoricalData", window.location.origin);
			url.searchParams.append("email", session.user.email);
			fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.length) {
						setUserData(data);
						setFinished(true);
					} else {
						setNewUser(true);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [user, showTable]);

	// Get data directly from google (if he is a new user)
	useEffect(() => {
		if (newUser) {
			const url = new URL("/api/getFreeHistoricalData", window.location.origin);
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
					setFinished(true);
					setNewUser(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [newUser]);

	return (
		<>
			<h2 style={{ color: "#091562", fontSize: "2rem" }}>Here is your Data Digital Twin:</h2>
			<img src={imageURL} width="300px" height="300px" className={styles.nft} />
			<button className={styles.button} onClick={() => setShowTable(!showTable)}>
				{showTable ? "Hide Table" : "Show Table"}
			</button>
			{finished && showTable && (
				<>
					<h2 style={{ color: "#091562", fontSize: "2rem" }}>Your Historical Data:</h2>
					{userData.data.length > 0 ? (
						<table className={styles.datatable}>
							<thead>
								<tr>
									<th>Email</th>
									<th>Address</th>
									<th>Type</th>
									<th>Start Time</th>
									<th>End Time</th>
									<th>Value</th>
								</tr>
							</thead>
							<tbody>
								{userData.data.map((data) => (
									<tr key={data._id}>
										<td>{data.email}</td>
										<td>{data.address}</td>
										<td>{data.type}</td>
										<td>
											{new Date(
												data.startTimeNanos / 1000000
											).toLocaleString()}
										</td>
										<td>
											{new Date(data.endTimeNanos / 1000000).toLocaleString()}
										</td>
										<td>{data.value}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>You don't have any historical data yet.</p>
					)}
				</>
			)}
		</>
	);
}
