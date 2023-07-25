import { useIsMounted } from "./hooks/useIsMounted.js";
import styles from "./body.module.css";
import SubscribeForm from "./SubscribeForm";

const MobileMain = () => {
    // Check if the component is mounted to avoid React state update on unmounted component
    const mounted = useIsMounted();
    return ( 
            <main className={styles.mobileBody}>
                    {mounted && (
                        <div className={styles.columns}>
                            <div className={styles.description}>
                                <div className={styles.logoBody}>
                                    <img src="/logo.png" alt="Metacare Logo" width={200} height={200}/>
                                </div>
                                <h2 style={{ color: "#091562" }}>
                                    Your Personal Pathway To Your Healthier Future.
                                </h2>

                                <h5 style={{ color: "#091562" }}>
                                    Unleash the power of your personal Data Digital Twin.
                                </h5>

                                <h5 className={styles.description2}>
                                Join our waitlist and be the first to experience a new era of healthcare
                                </h5>

                                <SubscribeForm />

                                <h3 style={{fontWeight: "lighter", fontSize: 13, marginTop: "15px"}}>
                                    Are you a healthcare professional? <span><a href="/DoctorEarlyAccess" style={{color: "blue"}}>Click here </a></span>
                                    and get early access.
                                </h3>
                                
                            </div>
                        </div>
                    )}
                </main>
     );
}
 
export default MobileMain;