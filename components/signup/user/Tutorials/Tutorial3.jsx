import React, { Suspense, useState, useRef } from "react";
import { useRouter } from "next/router";
import styles from "../signup.module.css";
import { Canvas } from "@react-three/fiber";
import TutorialAvatar from "../../../characters/TutorialAvatar";

const Tutorial3 = ({ onNext }) => {
	const router = useRouter();
	const productCanvasRef = useRef();

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

					<div className={styles.textAndButton}>
						<div style={{ width: "100%" }}>
							<img src={"/metacareLogo-removebg-preview.png"} width="275px" />
							<h3 style={{ fontSize: "20px" }}>Let's create your own Avatar</h3>
							<p style={{ fontSize: "18px", textAlign: "justify" }}>
								Don't walk alone through this journey, just create your own Virtual
								Pal! This will be the representation of your Data Digital Twin, and
								to create your look alike Avatar takes less than 5 minutes. Just
								upload a photo and it's done! You can also create it without
								uploading a photo, but we encourage you to create it through a
								selfie (it's funnier and gives you a better user experience).
							</p>
						</div>
						<button
							className={styles.tutorial_button}
							onClick={() => {
								onNext();
								router.push("/createAvatar");
							}}
						>
							Create my Avatar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Tutorial3;
