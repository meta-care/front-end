import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";

export function Free({ session, user }) {
	const router = useRouter();
	const [showTable, setShowTable] = useState(false);
	const [userData, setUserData] = useState([]);
	const [finished, setFinished] = useState(false);

	useEffect(() => {
		if (showTable) {
			const url = new URL("/api/getFreeHistoricalData", window.location.origin);
			url.searchParams.append("refreshToken", session.refreshToken);
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
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [user, showTable]);

	return (
		<>
			<button className={styles.button} onClick={() => router.push(`/premium`)}>
				Go Premium
			</button>
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
