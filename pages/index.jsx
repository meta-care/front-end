import styles from "../styles/Home.module.css";
import AnimatedText from "react-animated-text-content";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	return (
		<main className={styles.main}>
			<div className={styles.columns}>
				<div style={{ display: "block" }}>
					<img
						src={"metacareLogo.png"}
						width="177px"
						height="192px"
						alt=""
						style={{ display: "block" }}
					/>

					<div className={styles.description}>
						<h2 style={{ color: "#091562" }}>
							A Blockchain-based Healthcare <br></br>Data Management Solution.
						</h2>

						<h5 style={{ color: "#091562" }}>
							<AnimatedText
								type="words" // animate words or chars
								animation={{
									x: "200px",
									y: "-20px",
									scale: 1.1,
									ease: "ease-in-out",
								}}
								animationType="lights"
								interval={0.06}
								duration={0.8}
								tag="p"
								className="animated-paragraph"
								includeWhiteSpaces
								threshold={0.1}
								rootMargin="20%"
							>
								Track your data. Share it with your doctor. Improve your global
								health.
							</AnimatedText>
						</h5>
					</div>

					<button
						className={styles.button1}
						onClick={() => router.push(`/dashboard`)}
						style={{
							margin: "auto",
							marginTop: "40px",
							marginLeft: "250px",
						}}
					>
						Get Started
					</button>
				</div>

				<img
					className={styles.img}
					src={"blue-men.jpg"}
					width="350px"
					height="600px"
					alt=""
					style={{
						margin: "auto",
						marginTop: "5%",
						marginLeft: "4%",
					}}
				/>
			</div>
		</main>
	);
}
