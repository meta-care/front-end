import { useRouter } from "next/router";
import { NavBar } from "../components/home/NavBar/NavBar.jsx";
import SoonSubForm from "../components/landingpage_extras/comingSoonSubmission.jsx";
import styles from "../styles/Home.module.css";

export default function comingSoon() {
	const router = useRouter();
	return (
        <>
        <NavBar />
		<div style={{ textAlign: "center", paddingTop: "35px"} }>
			<img src={"logo.png"} width="200px" height="200px" />
			<h1 style={{ color: "#091562" }}>Coming Soon...</h1>
			<h3 style={{ color: "#091562" }}>Subscribe our newsletter to stay updated.</h3>
			<SoonSubForm />
			<h3 style={{fontWeight: "lighter", fontSize: 13, paddingTop: "20px"}}>
				Are you a healthcare professional? <span><a href="/DoctorEarlyAccess" style={{color: "blue"}}>Click here </a></span>
				and get early access.
			</h3>
		</div>
        </>
	);
}
