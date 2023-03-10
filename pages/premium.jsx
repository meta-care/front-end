import { ConnectButton } from "@rainbow-me/rainbowkit";
import { getSession } from "next-auth/client";
import { useIsMounted } from "./hooks/useIsMounted";
import { useRouter } from "next/router";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Home.module.css";
import {
	useAccount,
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
} from "wagmi";
import clientPromise from "../components/mongoDB/mongodb";
import { useEffect, useState } from "react";
const abi = require("../components/contract-abi.json");

export default function premium({ session, user }) {
	const { isConnected, address } = useAccount();
	const [finished, setFinished] = useState(false);
	const [alreadyOwn, setalreadyOwn] = useState(false);
	const [tokenID, setTokenID] = useState();
	const mounted = useIsMounted();
	const router = useRouter();

	// Handle the form
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
	} = useForm({
		defaultValues: {
			name: user.name,
			publicData: false,
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

	//Handle the achievements input fields
	const {
		fields: achievementsInputFields,
		append: achievementsInputAppend,
		remove: achievementsInputRemove,
	} = useFieldArray({
		name: "achievements",
		control,
	});

	//Handle the form submit & errors
	const [isFormSumbitted, setIsFormSumbitted] = useState(false);
	const [formData, setFormData] = useState();
	const onSubmit = async (formData) => {
		setFormData(formData);
		setIsFormSumbitted(true);
	};
	const onError = (errors) => {
		console.log("ERRORS: ", errors);
	};

	// Handle contract write
	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: "0xFD4047e04476b15FF95cc36782256B8594a60582",
		abi,
		functionName: "mint",
		args: [],
	});
	const { data, error, isError, write } = useContractWrite(config);
	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	// Update the user profile to premium
	useEffect(() => {
		if (address && isConnected && isFormSumbitted && (isSuccess || alreadyOwn)) {
			fetch("/api/setPremium", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ address, email: session.user.email, formData }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					setTokenID(data.tokenID);
					setFinished(true);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [isSuccess, alreadyOwn]);

	// Check if the user already have an NFT
	useEffect(() => {
		if (isConnected && address && isFormSumbitted) {
			fetch("/api/ownNFT", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ address }),
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					if (data.ownNFT) {
						setalreadyOwn(true);
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [isConnected, address, isFormSumbitted]);

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
					{!isConnected ? (
						<>
							<h2 style={{ color: "#091562", fontSize: "2rem" }}>
								Connect your wallet
							</h2>
							<ConnectButton showBalance={false} />
						</>
					) : (
						<>
							{!isFormSumbitted ? (
								<>
									<h2 style={{ color: "#091562", fontSize: "2rem" }}>
										Personnalize your NFT
									</h2>
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
										<div>
											<label>Name:</label>
											<input
												type="text"
												{...register("name", {
													required: "Name is required",
													maxLength: {
														value: 30,
														message: "Maximum name length is 30",
													},
												})}
											/>
										</div>
										<p>{errors.name?.message}</p>
										<div>
											<label>Allow anyone to see your data:</label>
											<input type="checkbox" {...register("publicData")} />
										</div>
										{professionnalInputFields.map((field, index) => (
											<div key={field.id}>
												<div>
													<label>
														HealthCare Professionnal {index + 1} email:
													</label>
													<div
														onClick={() =>
															professionnalInputRemove(index)
														}
													>
														X
													</div>
													<input
														{...register(
															`professionnals.${index}.email`,
															{
																required: "Email is required",
																maxLength: {
																	value: 50,
																	message:
																		"Maximum email length is 50",
																},
															}
														)}
													/>
												</div>
												<p>
													{errors.professionnals?.[index]?.email?.message}
												</p>
											</div>
										))}
										{professionnalInputFields.length < 10 && (
											<div>
												<button
													type="button"
													onClick={() =>
														professionnalInputAppend({ email: "" })
													}
												>
													+ HealthCare Professionnal
												</button>
											</div>
										)}
										{achievementsInputFields.map((field, index) => (
											<div key={field.id}>
												<div>
													<label>Achievements {index + 1}:</label>
													<div
														onClick={() =>
															achievementsInputRemove(index)
														}
													>
														X
													</div>
													<input
														{...register(`achievements.${index}.text`, {
															required: "achievements is required",
															maxLength: {
																value: 200,
																message:
																	"Maximum achievements length is 200",
															},
														})}
													/>
												</div>
												<p>{errors.achievements?.[index]?.text?.message}</p>
											</div>
										))}
										{achievementsInputFields.length < 3 && (
											<div>
												<button
													type="button"
													onClick={() =>
														achievementsInputAppend({ text: "" })
													}
												>
													+ Achievement
												</button>
											</div>
										)}

										<button>
											<input type="submit" />
										</button>
									</form>
								</>
							) : (
								<>
									{!finished ? (
										<>
											<h2 style={{ color: "#091562", fontSize: "2rem" }}>
												Step 2: Mint your NFT
											</h2>
											<a
												href="/privacy"
												style={{
													color: "#0093ff",
													marginBottom: "1rem",
												}}
											>
												By minting an NFT, you agree to our Privacy Policy
											</a>
											<button
												onClick={write}
												disabled={isLoading}
												className={styles.button}
											>
												<p> {isLoading ? "Minting..." : "Mint NFT"}</p>
											</button>
											{(isPrepareError || isError) && (
												<p>Error: {(prepareError || error)?.message}</p>
											)}
										</>
									) : (
										<>
											<h2 style={{ color: "#091562", fontSize: "2rem" }}>
												🎉 Congratulations: Your Data Digital Twin has been
												generated! 🎉
											</h2>
											<button
												className={styles.button}
												onClick={() => router.push(`/NFT/${tokenID}`)}
											>
												<p>See your new NFT</p>
											</button>
										</>
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

	// Get the user profile and check if he is premium. If he is, redirect him to the dashboard
	let client = await clientPromise;
	let db = await client.db();
	let profile = await db.collection("users").findOne({ email: session.user.email });
	if (!profile || profile.premium) {
		return {
			redirect: {
				destination: "/dashboard",
				permanent: false,
			},
		};
	}

	//Transform the profile object so it doesn't show an error because of the _id component
	const user = JSON.parse(JSON.stringify(profile));

	// Return the user profile
	return {
		props: { session, user },
	};
}
