import Mobile from "./Mobile";
import Desktop from "./Desktop";

export function NavBar({ user }) {
	return (
		<div>
			<Desktop user={user} />
			<Mobile user={user} />
		</div>
	);
}
