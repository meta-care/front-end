import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";

const DesktopNav = () => {
    return ( 
        <nav className={styles.desktopNav}>
            <div style={{ alignItems: "center" }}
            className={styles.navLogo}>
                <img
                    src={"logo.png"}
                    width="100px"
                    height="100px"
                    style={{ cursor: "pointer" }}
                    onClick={() => router.push(`/`)}
                />
                <img
                    src={"metacare.png"}
                    width="228px"
                    height="49px"
                    style={{
                        marginLeft: "2.75rem",
                        cursor: "pointer",
                        marginBottom: "1.75rem",
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