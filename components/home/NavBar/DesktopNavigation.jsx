import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";

const DesktopNav = () => {
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
                    onClick={() => router.push(`/`)}
                />
            </div>
            <NavLinks />
        </nav>
     );
}
 
export default DesktopNav;