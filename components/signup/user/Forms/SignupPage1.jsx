import React, { useEffect, useState } from "react";
import styles from "../signup.module.css";

const SignupPage1 = ({ onSubmit, user }) => {
	const [saveData, setSaveData] = useState(false);

	// State to manage form fields
	const [formData, setFormData] = useState({
		dateOfBirth: "",
		height: "",
		weight: "",
		knownDiseases: "None",
	});

	// Define an array of disease options
	const diseaseOptions = ["None", "Hypertension", "Diabetes", "Asthma", "Other"];

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
		fetch(`/api/saveSignup1`, {
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
		<div>
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
								<label htmlFor="dateOfBirth" style={{ marginRight: "10px" }}>
									Date of Birth: <span style={{ color: "red" }}>*</span>
								</label>
								<input
									type="date"
									id="dateOfBirth"
									name="dateOfBirth"
									value={formData.dateOfBirth}
									onChange={handleInputChange}
									required
								/>
							</div>
							<div className={styles.inputField}>
								<label htmlFor="height" style={{ marginRight: "10px" }}>
									Height (cm): <span style={{ color: "red" }}>*</span>
								</label>
								<input
									type="number"
									id="height"
									name="height"
									value={formData.height}
									onChange={handleInputChange}
									required
									style={{ maxWidth: "100px" }} // Set a maximum width
								/>
							</div>
							<div className={styles.inputField}>
								<label htmlFor="weight" style={{ marginRight: "10px" }}>
									Weight (kg): <span style={{ color: "red" }}>*</span>
								</label>
								<input
									type="number"
									id="weight"
									name="weight"
									value={formData.weight}
									onChange={handleInputChange}
									required
									style={{ maxWidth: "100px" }} // Set a maximum width
								/>
							</div>
							<div className={styles.inputField}>
								<label htmlFor="knownDiseases" style={{ marginRight: "10px" }}>
									Known Diseases:
								</label>
								<select
									id="knownDiseases"
									name="knownDiseases"
									value={formData.knownDiseases}
									onChange={handleInputChange}
								>
									{diseaseOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
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
		</div>
	);
};

export default SignupPage1;
