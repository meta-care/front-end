import styles from "./NavBar.module.css";
import { useRouter } from "next/router";
import { useIsMounted } from "../../../pages/hooks/useIsMounted";

const NavLinks = ({ user }) => {
	const router = useRouter();
	const mounted = useIsMounted();

	return (
		<div style={{ width: "100%" }}>
			{mounted && (
				<div className={styles.navLinks}>
					<ul>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								height: "80%",
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
								}}
							>
								<div className={styles.userImgContainer}>
									<img className={styles.userImg} src={user.image} alt="" />
								</div>
								<h2
									style={{
										whiteSpace: "nowrap",
										marginLeft: "20px",
										color: "#0093ff",
									}}
								>
									{user.name}
								</h2>
							</div>

							<div
								style={{
									position: "absolute",
									left: "50%",
									transform: "translateX(-50%)",
								}}
							>
								<img src={"/metacare.png"} width="200px" />
							</div>

							<div
								style={{
									position: "absolute",
									left: "100%",
									transform: "translateX(-115%)",
									marginRight: "20px",
								}}
							>
								<button
									className={styles.startedButton}
									onClick={() => router.push(`/dashboard`)}
								>
									{"Dashboard"}
								</button>
							</div>
						</div>
					</ul>
				</div>
			)}
		</div>
	);
};

export default NavLinks;
