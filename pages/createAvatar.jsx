import {
	AvatarCreator,
	AvatarCreatorConfig,
	AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";
import { getUser } from "../components/mongoDB/getUser";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

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
	const [image, setImage] = useState("");
	const router = useRouter();

	const handleOnAvatarExported = async (event) => {
		const glbURL = event.data.url;
		const pngURL = glbURL.replace(".glb", ".png") + "?blendShapes[mouthSmile]=0.8";
		setAvatarURL(glbURL);
		setImage(pngURL);
		setAvatarCreated(true);
	};

	// Update the user profile
	useEffect(() => {
		if (avatarCreated) {
			fetch("/api/saveAvatar", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: user.email, avatarURL, image }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					router.push("/dashboard");
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

	// Verify that the user does have all the required profile fields
	if (!user.birthDate || !user.weight || !user.height) {
		return {
			redirect: {
				destination: "/signup",
				permanent: false,
			},
		};
	}

	// Return the user profile
	return {
		props: { user },
	};
}
