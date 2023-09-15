import React, { useState } from "react";
import { useRouter } from "next/router";
import SignupPage1 from "../components/signup/user/Forms/SignupPage1";
import SignupPage2 from "../components/signup/user/Forms/SignupPage2";
import Tutorial1 from "../components/signup/user/Tutorials/Tutorial1";
import Tutorial2 from "../components/signup/user/Tutorials/Tutorial2";
import Tutorial3 from "../components/signup/user/Tutorials/Tutorial3";
import { getSession } from "next-auth/react";
import { getUser } from "../components/mongoDB/getUser";

const RegistrationForm = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({}); // Store user inputs

	const router = useRouter();

	const handleNextStep = (data) => {
		// Save user inputs and advance to the next step
		setFormData({ ...formData, ...data });
		setStep(step + 1);
	};

	const handleFinish = () => {
		// Handle the completion of the signup process (e.g., redirect the user)
	};

	return (
		//Registration Form
		<>
			{/* Render the appropriate signup form and tutorial based on the step */}
			{step === 1 && (
				<>
					<SignupPage1 onSubmit={handleNextStep} />
					<Tutorial1 onNext={() => setStep(step + 1)} />
				</>
			)}

			{step === 2 && (
				<>
					<SignupPage1 onSubmit={() => setStep(step + 1)} />
					{/* Hide the Tutorial */}
				</>
			)}

			{step === 3 && (
				<>
					<SignupPage2 onSubmit={() => setStep(step + 1)} />
					<Tutorial2 onNext={() => setStep(step + 1)} />
				</>
			)}

			{step === 4 && (
				<>
					<SignupPage2 onSubmit={() => setStep(step + 1)} />
					{/* Hide the Tutorial */}
				</>
			)}

			{step === 5 && (
				<>
					<Tutorial3 onNext={() => setStep(step + 1)} />
				</>
			)}
		</>
	);
};

export default RegistrationForm;

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

	// Verify that the user does NOT have all the required profile fields
	if (user.birthDate && user.weight && user.height && user.gender) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	// Return the user profile
	return {
		props: { user },
	};
}
