import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { useIsMounted } from "../hooks/useIsMounted";
import styles from "../../styles/Home.module.css";
import clientPromise from "../../components/mongoDB/mongodb";

export default function NFT({ showData, user }) {
	const router = useRouter();
	const mounted = useIsMounted();
	const { tokenID } = router.query;
	const [image, setImage] = useState("");
	const [showTable, setShowTable] = useState(false);
	const [userData, setUserData] = useState([]);
	const [finished, setFinished] = useState(false);
	const [newUser, setNewUser] = useState(false);

	// Get the NFT svg image
	useEffect(() => {
		if (tokenID) {
			fetch(`/api/${tokenID}/image`)
				.then((res) => res.text())
				.then((svg) => setImage(svg));
		}
	}, [tokenID]);

	// Get data from the database
	useEffect(() => {
		if (showTable && showData) {
			const url = new URL("/api/getHistoricalData", window.location.origin);
			url.searchParams.append("email", user.email);
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
		if (newUser && showTable && showData) {
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
		<main className={styles.main}>
			<h2 style={{ color: "#091562", fontSize: "3rem" }}>
				Here is {user.name}'s Data Digital Twin:
			</h2>
			<div dangerouslySetInnerHTML={{ __html: image }} />
			{showData && mounted && (
				<>
					{!finished ? (
						<button className={styles.button} onClick={() => setShowTable(true)}>
							Show Table
						</button>
					) : (
						<>
							<h2 style={{ color: "#091562", fontSize: "2rem" }}>Historical Data:</h2>
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
													{new Date(
														data.endTimeNanos / 1000000
													).toLocaleString()}
												</td>
												<td>{data.value}</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<p>{user.name} don't have any historical data yet.</p>
							)}
						</>
					)}
				</>
			)}
		</main>
	);
}

export async function getServerSideProps(context) {
	// Get the tokenID from the url
	const tokenID = parseInt(context.params.tokenID);

	// Find the user in the database using the tokenID
	let client = await clientPromise;
	let db = await client.db();
	let profile = await db.collection("users").findOne({ tokenID: tokenID });
	if (!profile) {
		return {
			redirect: {
				destination: "/NFT",
				permanent: false,
			},
		};
	}

	//Transform the profile object so it doesn't show an error because of the _id component
	const user = JSON.parse(JSON.stringify(profile));

	// Anybody can see the data
	if (user.publicData) {
		return {
			props: { showData: true, user },
		};
	}

	// Get the user session
	const session = await getSession(context);

	// The user is the owner or a healthcare professional
	if (session?.user?.email == user.email || user.professionnals.includes(session?.user?.email)) {
		return {
			props: { showData: true, user },
		};
	}

	// The user is just a visitor
	return {
		props: { showData: false, user },
	};
}
