import { getSession } from "next-auth/client";
import { useIsMounted } from "./hooks/useIsMounted";
import { useRouter } from "next/router";
import { getUser } from "../components/getData/getUser";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Dashboard({ session, user, imageURL }) {
  const mounted = useIsMounted();
  const router = useRouter();
  const [showTable, setShowTable] = useState(false);
  const [userData, setUserData] = useState([]);
  const [finished, setFinished] = useState(false);

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
          setUserData(data);
		  setFinished(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user, showTable]);

  return (
	<main className={styles.main}>
	  <img
		src={"metacareLogo.png"}
		width="177px"
		height="192px"
		onClick={() => router.push(`/`)}
	  />
	  {mounted && (
		<>
		  {!user.premium ? (
			<>
			  <button
				className={styles.button}
				onClick={() => router.push(`/premium`)}
			  >
				Go Premium
			  </button>
			</>
		  ) : (
			<>
			  <h2 style={{ color: "#091562", fontSize: "2rem" }}>
				Here is your Data Digital Twin:
			  </h2>
			  <img
				src={imageURL}
				width="300px"
				height="300px"
				className={styles.nft}
			  />
			  <button
				className={styles.button}
				onClick={() => setShowTable(!showTable)}
			  >
				{showTable ? "Hide Table" : "Show Table"}
			  </button>
			  {finished && (
				<>
				  <h2 style={{ color: "#091562", fontSize: "2rem" }}>
					Your Historical Data:
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
							<td>{new Date(data.startTimeMillis).toLocaleString()}</td>
							<td>{new Date(data.endTimeMillis).toLocaleString()}</td>
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
		  )}
		</>
	  )}
	</main>
  );
}

export async function getServerSideProps(context) {
	// Check if the user is connected. Otherwise return him to the home page
	const session = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	// Get the user profile
	const { profile, imageURL } = await getUser(session);
	if (!profile) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	//Transform the profile object so it doesn't show an error because of the _id component
	const user = JSON.parse(JSON.stringify(profile));

	// Return the user profile
	return {
		props: { session, user, imageURL },
	};
}
