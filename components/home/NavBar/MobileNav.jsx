import { useRouter } from "next/router";
import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";
import { CgMenu , CgClose } from "react-icons/cg"
import { useState } from "react";

const MobileNav = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false); 

const hamburgerButton = <CgMenu 
                        className={styles.burgerMenu}
                        size='40px'
                        color="#0d76fc"
                        onClick={() => setOpen(!open)}
                        />;

const closeButton = <CgClose 
                    className={styles.burgerMenu}
                    size='40px'
                    color="#0d76fc"
                    onClick={() => setOpen(!open)}
                    />

    return ( 
        <nav className={styles.mobileNav}>
            {open ? closeButton : hamburgerButton}
            {open && <NavLinks />}
            <div className={styles.imgMediumScreen}>
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

            <div className={styles.imgSmallScreen}>
                <img
                        src={"metacare.png"}
                        width="159.6px"
                        height="34.3px"
                        style={{
                            marginLeft: "2.75rem",
                            cursor: "pointer",
                            marginTop: "3px",
                        }}
                        onClick={() => router.push(`/`)}
                />
            </div>
        </nav>
     );
}
 
export default MobileNav;