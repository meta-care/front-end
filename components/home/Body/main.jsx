import DesktopMain from "./DesktopMain";
import MobileMain from "./MobileMain";
import styles from "./body.module.css";

const MainBody = () => {
    return ( 
        <div>
            <div className={styles.DesktopMain}>
            <DesktopMain />
            </div>
            <div className={styles.mobileMain}>
            <MobileMain />
            </div>
        </div>
     );
}
 
export default MainBody;