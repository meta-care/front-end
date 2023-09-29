import React, { useEffect, useState } from "react";
import styles from "../signup.module.css";

const SignupPage1 = ({ onSubmit, user }) => {
	const [saveData, setSaveData] = useState(false);

	// State to manage form fields
	const [formData, setFormData] = useState({
		gender: "",
		heardAbout: "",
		objectives: "",
		medication: "",
		chronicMedication: "",
	});

	// Define an array of options
	const heardAbout = [
		"Select an option",
		"LinkedIn",
		"Instagram",
		"Facebook",
		"From a friend",
		"Google search",
		"Other",
	];
	const genderOptions = ["Select an option", "Male", "Female", "Don't especify"];
	const objectivesOptions = [
		"Select an option",
		"Fitness",
		"Weight Loss",
		"Chronic Disease Management",
		"General Health Tracking",
		"Other",
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form Data:", formData);
		setSaveData(true);
	};

	// Store the newest user data in the database
	useEffect(() => {
		if (!saveData) return;
		fetch(`/api/saveSignup2`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email: user.email, formData: formData }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				onSubmit();
			})
			.catch((err) => {
				console.log(err);
			});
	}, [saveData]);

	return (
		<>
			<div className={styles.formDisplay}>
				<div className={styles.signupForm}>
					<img src={"/metacareLogo-removebg-preview.png"} width="275px" />
					<div style={{ height: "100%", marginBottom: "5%" }}>
						<form
							onSubmit={handleSubmit}
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-around",
								alignItems: "center",
							}}
						>
							<div className={styles.inputField}>
								<label htmlFor="gender" style={{ marginRight: "10px" }}>
									Gender:
								</label>
								<select
									id="gender"
									name="gender"
									value={formData.gender}
									onChange={handleInputChange}
								>
									{genderOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>

							<div className={styles.inputField}>
								<label htmlFor="heardAbout" style={{ marginRight: "10px" }}>
									Where did you hear about us?
								</label>
								<select
									id="heardAbout"
									name="heardAbout"
									value={formData.heardAbout}
									onChange={handleInputChange}
								>
									{heardAbout.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>

							<div className={styles.inputField}>
								<label htmlFor="objectives" style={{ marginRight: "10px" }}>
									What are your objectives with Metacare?
								</label>
								<select
									id="objectives"
									name="objectives"
									value={formData.objectives}
									onChange={handleInputChange}
								>
									{objectivesOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
							</div>

							<div className={styles.inputField}>
								<label htmlFor="medication" style={{ marginRight: "10px" }}>
									Do you take any Chronic medication?
								</label>
								<select
									id="medication"
									name="medication"
									value={formData.medication}
									onChange={handleInputChange}
									style={{ marginRight: "10px" }}
								>
									<option value="No">No</option>
									<option value="Yes">Yes</option>
								</select>
								{formData.medication === "Yes" && (
									<div className={styles.inputField}>
										<label
											htmlFor="chronicMedication"
											style={{ marginRight: "10px" }}
										>
											Please specify:
										</label>
										<input
											type="text"
											id="chronicMedication"
											name="chronicMedication"
											value={formData.chronicMedication}
											onChange={handleInputChange}
										/>
									</div>
								)}
							</div>
							<div>
								<button className={styles.tutorial_button} type="submit">
									Continue
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignupPage1;
