import { useIsMounted } from "./hooks/useIsMounted";
import MenuNav from "../components/Dashboard/NavBar/DashboardNavBar.jsx";
import UserMenu from "../components/Dashboard/UserMenu.jsx";

const Menu = () => {
    // Check if the component is mounted to avoid React state update on unmounted component
	const mounted = useIsMounted();
    
    return ( 
        <>
        <MenuNav />
        <UserMenu />
        </>
     );
}
 
export default Menu;