import { useEffect, useState } from "react";

export function ShowData({ user, owndata: ownData }) {
	const [userData, setUserData] = useState([]);
	const [finishedGettingData, setFinishedGettingData] = useState(false);
	const [error, setError] = useState(null);

	// Get user's data
	useEffect(() => {
		setFinishedGettingData(false);
		setUserData([]);
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
				if (data.error) {
					throw data.error;
				}
				setUserData(data);
				setError(null);
				setFinishedGettingData(true);
			})
			.catch((error) => {
				setError(JSON.stringify(error));
				setUserData([]);
				setFinishedGettingData(true);
			});
	}, [user]);

	return (
		<>
			<h2 style={{ color: "#091562", fontSize: "2rem" }}>
				{ownData ? "Your" : user.name} Historical{!ownData && "'s"} Data:
			</h2>
			{!finishedGettingData ? (
				<p>Loading...</p>
			) : (
				<>
					{error ? (
						<p>There was an error while getting the user's data: {error}</p>
					) : (
						<>
							{!userData?.data?.length ? (
								<p>
									{ownData ? "You don't " : `${user.name} doesn't `}have any
									historical data yet.
								</p>
							) : (
								<p>
									{ownData ? "You have " : `${user.name} has `}{" "}
									{userData.data.length} data pieces{" "}
								</p>
							)}
						</>
					)}
				</>
			)}
		</>
	);
}
