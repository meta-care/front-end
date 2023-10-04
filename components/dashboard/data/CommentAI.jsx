import { useEffect, useState } from "react";

export default function CommentAI({ averageHeartRate }) {
	const [response, setResponse] = useState("Loading...");

	useEffect(() => {
		fetch("/api/openai", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ averageHeartRate }),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					console.log(data.error);
					setResponse("Sorry, there was an error while loading the AI commentary.");
					return;
				}
				setResponse(data.message.content);
			})
			.catch((err) => console.log(err));
	}, [averageHeartRate]);

	return (
		<div
			style={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<h2>Your tips today:</h2>
			<p>{response}</p>
		</div>
	);
}
