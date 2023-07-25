import { useRouter } from "next/router";
import { NavBar } from "../components/home/NavBar/NavBar.jsx";
import ProfessionalsForm from "../components/landingpage_extras/DoctorEarlyAccess.jsx";
import styles from "../styles/Home.module.css";

export default function comingSoon() {
	const router = useRouter();
	return (
        <>
        <NavBar />
		<div style={{ textAlign: "center", paddingTop: "35px"} }>
			<img src={"logo.png"} width="200px" height="200px" />
			<ProfessionalsForm />
		</div>
        </>
	);
}
