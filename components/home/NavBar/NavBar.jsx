import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

export function NavBar({ user }) {
	return (
		<div>
			<DesktopNav user={user} />
			<MobileNav user={user} />
		</div>
	);
}
