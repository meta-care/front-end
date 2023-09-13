import {
	AvatarCreator,
	AvatarCreatorConfig,
	AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";
import { getUser } from "../components/mongoDB/getUser";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

const config = {
	clearCache: true,
	bodyType: "fullbody",
	quickStart: false,
	language: "en",
};

const style = {
	width: "100%",
	height: "100vh",
	border: "none",
};

export default function CreateAvatar({ user }) {
	const [avatarCreated, setAvatarCreated] = useState(false);
	const [avatarURL, setAvatarURL] = useState("");
	const [saved, setSaved] = useState(false);

	const handleOnAvatarExported = async (event) => {
		setAvatarURL(event.data.url);
		setAvatarCreated(true);
		setSaved(false);
	};

	// Update the user profile
	useEffect(() => {
		if (avatarCreated) {
			console.log("creating avatar");
			fetch("/api/saveAvatar", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: user.email, avatarURL }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setSaved(true);
					setAvatarCreated(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [avatarCreated]);

	return (
		<AvatarCreator
			subdomain="nunos"
			config={config}
			style={style}
			onAvatarExported={handleOnAvatarExported}
		/>
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
	const profile = await getUser(session);
	if (!profile) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
	const user = JSON.parse(JSON.stringify(profile));

	// Return the user profile
	return {
		props: { user },
	};
}
