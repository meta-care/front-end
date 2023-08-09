import styles from "../../../styles/Home.module.css";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const DoctorsMenu = ({ user }) => {
	// Show saved message
	const [saved, setSaved] = useState(false);
	useEffect(() => {
		if (saved) {
			setTimeout(() => {
				setSaved(false);
			}, 3000);
		}
	}, [saved]);

	// Handle the form
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			professionnals: user.professionnals.map((professionnal) => ({
				email: professionnal,
			})),
		},
	});

	//Handle the professionnals input fields
	const {
		fields: professionnalInputFields,
		append: professionnalInputAppend,
		remove: professionnalInputRemove,
	} = useFieldArray({
		name: "professionnals",
		control,
	});

	//Handle the form submit & errors
	const [isFormSumbitted, setIsFormSumbitted] = useState(false);
	const [formData, setFormData] = useState();
	const onSubmit = async (formData) => {
		setSaved(false);
		setFormData(formData);
		setIsFormSumbitted(true);
	};
	const onError = (errors) => {
		console.log("ERRORS: ", errors);
	};

	// Update the user profile
	useEffect(() => {
		if (isFormSumbitted) {
			fetch("/api/setProfessionnals", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: user.email, formData }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setSaved(true);
					setIsFormSumbitted(false);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [isFormSumbitted]);

	return (
		<div style={{ textAlign: "center" }}>
			<h2 style={{ color: "#091562", fontSize: "2rem" }}>Your HealthCare Professionnals</h2>
			<form
				onSubmit={(e) =>
					handleSubmit(
						onSubmit,
						onError
					)(e).catch((e) => {
						console.log("Server error...");
					})
				}
			>
				{professionnalInputFields.map((field, index) => (
					<div key={field.id}>
						<div>
							<label
								style={{
									fontSize: "1.5rem",
								}}
							>
								HealthCare Professionnal {index + 1} email:
							</label>
							<input
								style={{
									fontSize: "1.5rem",
									marginRight: "1rem",
									marginLeft: "1rem",
								}}
								{...register(`professionnals.${index}.email`, {
									required: "Email is required",
									maxLength: {
										value: 50,
										message: "Maximum email length is 50",
									},
								})}
							/>
							<span
								style={{
									color: "red",
									fontSize: "1.5rem",
								}}
								onClick={() => professionnalInputRemove(index)}
							>
								X
							</span>
						</div>
						<p style={{ color: "red" }}>
							{errors.professionnals?.[index]?.email?.message}
						</p>
					</div>
				))}
				{professionnalInputFields.length < 10 && (
					<div>
						<button
							type="button"
							className={styles.button}
							style={{
								margin: "1rem",
							}}
							onClick={() => professionnalInputAppend({ email: "" })}
						>
							+ HealthCare Professionnal
						</button>
					</div>
				)}
				<button
					className={styles.button}
					style={{
						margin: "1rem",
					}}
					type="submit"
				>
					Save
				</button>
				{saved && <p style={{ color: "green" }}>Saved!</p>}
			</form>
		</div>
	);
};

export default DoctorsMenu;
