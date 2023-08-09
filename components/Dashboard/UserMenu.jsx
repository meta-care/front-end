import styles from "./UserMenu.module.css"
import { useRouter } from 'next/router';


const UserMenu = () => {
    const router = useRouter();

    return ( 
        <div className={styles.menu}>
            {/*Data Digital Twin*/}
            <div className={styles.menuItems}
                onClick={() => router.push("/dashboard")} /*Redirects the user to the dashboard (DDT)*/
                >
                <img src={"DDT.png"}
                className={styles.img}
                alt=""
                />
                <h2>Data Digital Twin</h2>
            </div>
            {/*Recommendations*/}
            <div className={styles.menuItems_soon}
                onClick={() => router.push("/comingSoon")} /*Redirects the user to the Coming soon page*/
                >
                <img src={"Recommendations.png"}
                className={styles.img}
                alt="" 
                
                />
                <h2>Recommendations</h2>
                <div className={styles.comingSoon}>
                    <h2>Coming soon</h2>
                </div>
            </div>
            {/*Value Accrued*/}
            <div className={styles.menuItems_soon}>
                <img src={"Value_accrued.png"}
                className={styles.img}
                alt="" 
                />
                <h2>Value Accrued</h2>
                <div className={styles.comingSoon}>
                    <h2>Coming soon</h2>
                </div>
            </div>
            {/*Manage Doctor*/}
            <div className={styles.menuItems_soon}>
                <img src={"Manage_Doctor.png"}
                className={styles.img}
                alt="" 
                />
                <h2>Manage Doctor</h2>
                <div className={styles.comingSoon}>
                    <h2>Coming soon</h2>
                </div>
            </div>
            {/*Settings*/}
            <div className={styles.menuItems_soon}>
                <img src={"Settings.png"}
                className={styles.img}
                alt="" 
                />
                <h2>Settings</h2>
                <div className={styles.comingSoon}>
                    <h2>Coming soon</h2>
                </div>
            </div>
        </div>
     );
}
 
export default UserMenu;
