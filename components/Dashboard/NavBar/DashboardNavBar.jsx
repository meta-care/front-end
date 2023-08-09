import { BiUserCircle } from "react-icons/bi"
import styles from "./DashboardNavBar.module.css";

const MenuNav = () => {
    
    return ( 
        <nav className={styles.desktopNav}>
            <div style={{ alignItems: "center" }}
            className={styles.navLogo}>
                <img
                    src={"metacare.png"}
                    width="228px"
                    height="49px"
                    style={{
                        marginLeft: "2.75rem",
                        cursor: "pointer",
                        marginTop: "3px",
                    }}
                
                />
            </div>
            <div className={styles.user}>
                <BiUserCircle style={{ width: "30px", height: "30px" }} />
                <h3>Nuno Silva</h3>
            </div>
        </nav>
     );
}
 
export default MenuNav;