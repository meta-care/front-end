import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import { useIsMounted } from "../hooks/useIsMounted";
import styles from "../../styles/Home.module.css";
import clientPromise from "../../components/mongoDB/mongodb";
import { getUser } from "../../components/mongoDB/getUser";
import { Header } from "../../components/header";

export default function NFT({ user, showData, nftUser }) {
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
			url.searchParams.append("email", nftUser.email);
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
	}, [nftUser, showTable]);

	// Get data directly from google (if he is a new user)
	useEffect(() => {
		if (newUser && showTable && showData) {
			const url = new URL("/api/getFreeHistoricalData", window.location.origin);
			url.searchParams.append("refreshToken", nftUser.refreshToken);
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
			<Header user={user} />
			<main className={styles.main}>
				<h2 style={{ color: "#091562", fontSize: "3rem" }}>
					Here is {nftUser.name}'s Data Digital Twin:
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
								<h2 style={{ color: "#091562", fontSize: "2rem" }}>
									Historical Data:
								</h2>
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
									<p>{nftUser.name} don't have any historical data yet.</p>
								)}
							</>
						)}
					</>
				)}
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	// Check if the user is connected and get his profile
	let user = null;
	const session = await getSession(context);
	if (session) {
		const profile = await getUser(session);
		if (profile) {
			user = JSON.parse(JSON.stringify(profile));
		}
	}

	// Find the user in the database using the tokenID from the url
	const tokenID = parseInt(context.params.tokenID);
	let client = await clientPromise;
	let db = await client.db();
	let nftProfile = await db.collection("users").findOne({ tokenID: tokenID });
	if (!nftProfile) {
		return {
			redirect: {
				destination: "/NFT",
				permanent: false,
			},
		};
	}
	const nftUser = JSON.parse(JSON.stringify(nftProfile));

	// The user is the owner or anybody can see the data or is a healthcare professional
	if (
		session?.user?.email == nftUser.email ||
		nftUser.publicData ||
		nftUser.professionnals.includes(session?.user?.email)
	) {
		return {
			props: { user, showData: true, nftUser },
		};
	}

	// The user is just a visitor
	return {
		props: { user, showData: false, nftUser },
	};
}
