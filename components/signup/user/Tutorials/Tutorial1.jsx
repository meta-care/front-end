import React, { Suspense, useState, useRef } from "react";
import styles from "../signup.module.css";
import { Canvas } from "@react-three/fiber";
import TutorialAvatar from "../../../characters/TutorialAvatar";

const Tutorial1 = ({ onNext }) => {
	const [tutorialStep, setTutorialStep] = useState(1);
	const productCanvasRef = useRef();

	const handleNextTutorialStep = () => {
		setTutorialStep(tutorialStep + 1);
	};

	return (
		<div className={styles.tutorial_overlay}>
			<div className={styles.tutorial_content}>
				<div
					style={{
						width: "85%",
						display: "flex",
						flexDirection: "row",
						justifyContent: "space-around",
					}}
				>
					<div className={styles.avatar_container} ref={productCanvasRef}>
						<Suspense fallback={"null"}>
							<Canvas>
								<TutorialAvatar containerRef={productCanvasRef} />
							</Canvas>
						</Suspense>
					</div>
					{tutorialStep === 1 && (
						<div className={styles.textAndButton}>
							<div style={{ width: "100%" }}>
								<h3 style={{ fontSize: "20px" }}>Welcome to Metacare Health!</h3>
								<p style={{ fontSize: "18px", textAlign: "justify" }}>
									Your journey for an healthier future just started! I'm Alberto,
									doctor and CEO of Metacare Health. In this small onboarding I'm
									going to quickly explain our mission and let you know our
									privacy terms. Click on "Next" to continue.
								</p>
							</div>
							<button
								className={styles.tutorial_button}
								onClick={handleNextTutorialStep}
							>
								Next
							</button>
						</div>
					)}

					{tutorialStep === 2 && (
						<div className={styles.textAndButton}>
							<div style={{ width: "100%" }}>
								<h3 style={{ fontSize: "20px" }}>Why we need some informations?</h3>
								<p style={{ fontSize: "18px", textAlign: "justify" }}>
									We at Metacare believe that the internet should be transparent
									and trustless. We require some personal information in order to
									provide a personalized health recommendation experience. Our
									business model is NOT personal data selling, although, in order
									to provide you with the best recommendations and experience,
									your ANONIMOUS data may be used to train an AI model.
								</p>
							</div>
							<button className={styles.tutorial_button} onClick={onNext}>
								Next
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Tutorial1;
