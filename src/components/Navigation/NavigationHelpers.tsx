import Link from "next/link";
import Nav from "react-bootstrap/Nav";
import { NavLinkProps } from "react-bootstrap/NavLink";

interface PrivateNavLinkProps extends NavLinkProps {
	authorized: boolean;
}

/** Creates a navigation link item */
function NavLinkItem(props: NavLinkProps) {
	return (
		<Nav.Item as="li">
			<Nav.Link as={Link} {...props} />
		</Nav.Item>
	);
}

/** Creates a private NavLinkItem (visible only by logging in) */
function PrivateNavLinkItem({ authorized, ...rest }: PrivateNavLinkProps) {
	return authorized ? <NavLinkItem {...rest} /> : null;
}

export { NavLinkItem, PrivateNavLinkItem };
