import { useEffect, useState } from "react";
import CommentAI from "./CommentAI.jsx";
import styles from "./DataVisualization.module.css";

export function ShowData({ user, owndata: ownData, backendUrl }) {
	const [finishedGettingHeartRate, setFinishedGettingHeartRate] = useState(false);
	const [heartRateError, setHeartRateError] = useState(false);
	const [averageHeartRate, setAverageHeartRate] = useState(null);

	const [finishedGettingSteps, setFinishedGettingSteps] = useState(false);
	const [stepsError, setStepsError] = useState(false);
	const [dailySteps, setDailySteps] = useState(null);

	// Get the newest user data from the database
	useEffect(() => {
		const currentTimestampInNanoseconds = Date.now() * 1000000;
		const nanosecondsPerDay = 24 * 60 * 60 * 1000000000;
		const nanosecondsSinceMidnight = currentTimestampInNanoseconds % nanosecondsPerDay;

		// HEART RATE
		setFinishedGettingHeartRate(false);
		setHeartRateError(false);
		var queryParams = new URLSearchParams({
			email: user.email,
			type: "com.google.heart_rate.bpm",
			startTime: currentTimestampInNanoseconds - nanosecondsPerDay * 1, // 1 day ago
			endTime: currentTimestampInNanoseconds,
			limit: 10000,
		});

		fetch(`${backendUrl}/historical?${queryParams}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error || data.length === 0) {
					throw data.error;
				}

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
				if (dataNumber === 0) {
					throw "No heart rate data";
				}
				setAverageHeartRate(Math.round((totalHeartRate / dataNumber) * 10) / 10); // Only keep 2 decimals
				setFinishedGettingHeartRate(true);
			})
			.catch((error) => {
				setHeartRateError(true);
				setAverageHeartRate(null);
				setFinishedGettingHeartRate(true);
			});

		// STEPS
		setFinishedGettingSteps(false);
		setStepsError(false);
		var queryParams = new URLSearchParams({
			email: user.email,
			type: "com.google.step_count.delta",
			startTime: currentTimestampInNanoseconds - nanosecondsSinceMidnight, // Since midnight
			endTime: currentTimestampInNanoseconds,
			limit: 10000,
		});

		fetch(`${backendUrl}/historical?${queryParams}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error || data.length === 0) {
					throw data.error;
				}

				// Group the data by streamId
				var streamIds = [];
				var dataByStreamId = [];
				for (let i = 0; i < data.length; i++) {
					if (data[i].value !== 0 && data[i].value.length !== 0) {
						// If the streamId is not in the list, add it
						if (!streamIds.includes(data[i].streamId)) {
							streamIds.push(data[i].streamId);
							dataByStreamId.push({
								streamId: data[i].streamId,
								value: data[i].value,
							});

							// If the streamId is in the list, add the value to the existing value
						} else {
							for (let j = 0; j < dataByStreamId.length; j++) {
								if (dataByStreamId[j].streamId === data[i].streamId) {
									dataByStreamId[j].value += data[i].value;
								}
							}
						}
					}
				}
				if (dataByStreamId.length === 0) {
					throw "No steps data";
				}

				// Set the average step count
				let totalSteps = 0;
				for (let i = 0; i < dataByStreamId.length; i++) {
					totalSteps += dataByStreamId[i].value;
				}
				setDailySteps(Math.round(totalSteps / dataByStreamId.length));
				setFinishedGettingSteps(true);
			})
			.catch((error) => {
				setStepsError(true);
				setDailySteps(null);
				setFinishedGettingSteps(true);
			});
	}, [user]);

	return (
		<main className={styles.main}>
			<h2 style={{ color: "#091562", fontSize: "2rem" }}>
				{ownData ? "Your" : `${user.name}'s`} Health Data Summary:
			</h2>
			{!finishedGettingHeartRate || !finishedGettingSteps ? (
				<p>Loading...</p>
			) : (
				<>
					{stepsError ? (
						<p>
							We were unable to retrieve your daily steps count. You may not have any
							yet, or you may not have synchronized your watch with its phone app.
							Make sure to be able to see your data on Google FIT, then come back and
							refresh this page and the dashboard page.
						</p>
					) : (
						<p>
							{ownData ? "You have " : `${user.name} has `}
							{` a daily step count of ${dailySteps} steps.`}
						</p>
					)}
					{heartRateError ? (
						<p>
							We were unable to retrieve your heart rate Data. You may not have any
							yet, or you may not have synchronized your watch with its phone app.
							Make sure to be able to see your data on Google FIT, then come back and
							refresh this page and the dashboard page.
						</p>
					) : (
						<p>
							{ownData ? "You have " : `${user.name} has `}
							{` an average daily heart rate of ${averageHeartRate}bpm.`}
						</p>
					)}
					{!heartRateError && <CommentAI averageHeartRate={averageHeartRate} />}
				</>
			)}
		</main>
	);
}
