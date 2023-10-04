import { useEffect, useState, Suspense } from "react";
import CommentAI from "./CommentAI.jsx";
import styles from "./DataVisualization.module.css";

export function ShowData({ user, owndata: ownData, backendUrl }) {
	const [userData, setUserData] = useState([]);
	const [finishedGettingData, setFinishedGettingData] = useState(false);
	const [error, setError] = useState(null);
	const [averageHeartRate, setAverageHeartRate] = useState(0);

	// Get the newest user data from the database
	useEffect(() => {
		setFinishedGettingData(false);
		setUserData([]);

		// Construct query parameters
		const currentTimestampInNanoseconds = Date.now() * 1000000;
		const nanosecondsPerDay = 24 * 60 * 60 * 1000000000;
		const queryParams = new URLSearchParams({
			email: user.email,
			type: "com.google.heart_rate.bpm",
			startTime: currentTimestampInNanoseconds - nanosecondsPerDay * 1, // 1 day ago
			endTime: currentTimestampInNanoseconds,
			limit: 1000,
		});

		fetch(`${backendUrl}/historical?${queryParams}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					throw data.error;
				}
				setUserData(data);
				setError(null);
				setFinishedGettingData(true);

				// Calculate the average heart rate
				let totalHeartRate = 0;
				let dataNumber = 0;
				for (let i = 0; i < data.length; i++) {
					// Only add the value if it's not 0 or an empty array
					if (data[i].value !== 0 && data[i].value.length !== 0) {
						totalHeartRate += data[i].value;
						dataNumber++;
					}
				}

				//Save the value and only keep 2 decimals
				setAverageHeartRate(Math.round((totalHeartRate / dataNumber) * 10) / 10);
			})
			.catch((error) => {
				console.log(error);
				setError(JSON.stringify(error));
				setFinishedGettingData(true);
			});
	}, [user]);

	return (
		<main className={styles.main}>
			<h2 style={{ color: "#091562", fontSize: "2rem" }}>
				{ownData ? "Your" : `${user.name}'s`} Health Data Summary:
			</h2>
			{!finishedGettingData ? (
				<p>Loading...</p>
			) : (
				<>
					{error ? (
						<p>There was an error while getting the user's data: {error}</p>
					) : (
						<>
							{!userData?.length ? (
								<p>
									{ownData ? "You don't " : `${user.name} doesn't `}have any
									historical data yet.
								</p>
							) : (
								<>
									<p>
										{ownData ? "You have " : `${user.name} has `}
										{` an average daily heart rate of ${averageHeartRate}bpm.`}
									</p>
									<CommentAI averageHeartRate={averageHeartRate} />
								</>
							)}
						</>
					)}
				</>
			)}
		</main>
	);
}
