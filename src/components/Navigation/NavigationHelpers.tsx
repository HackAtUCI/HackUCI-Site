import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import { NavLinkProps } from "react-bootstrap/NavLink";

interface PrivateNavLinkProps extends NavLinkProps {
	authorized: boolean;
}

/** Creates a navigation link */
function NavLink(props: NavLinkProps) {
	return <Nav.Link as={Link} {...props} />;
}

/** Creates a private NavLink (visible only by logging in) */
function PrivateNavLink(props: PrivateNavLinkProps) {
	return props.authorized ? <NavLink {...props} /> : null;
}

export { NavLink, PrivateNavLink };
