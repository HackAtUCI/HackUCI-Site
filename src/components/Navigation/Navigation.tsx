import Link from "next/link";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import HackLogo from "components/HackLogo/HackLogo";
import styles from "./Navigation.module.scss";

// Temporary variable to indicate login status
const isLoggedIn = false;

function Navigation() {
	// TODO: CHECK LOGIN STATUS

	const router = useRouter();
	const currentRoute = router.asPath;
	const logText = isLoggedIn ? "Logout" : "Login";
	const logButtonPath = isLoggedIn ? "/" : "/login";

	/** Creates a navigation link based on the user's currently selected route */
	const NavLink = ({ style, to, text }: any) =>
		currentRoute == to ? (
			<Nav.Link
				className={`${style} ${styles.linkSelected}`}
				as={Link}
				href={to}
			>
				{text}
			</Nav.Link>
		) : (
			<Nav.Link
				className={`${style} ${styles.linkNotSelected}`}
				as={Link}
				href={to}
			>
				{text}
			</Nav.Link>
		);

	/** Creates a private NavLink (visible only by logging in) */
	const PrivateNavLink = ({ style, to, text }: any) =>
		isLoggedIn ? <NavLink style={style} to={to} text={text} /> : null;

	return (
		<Navbar className={styles.navbar} expand="md">
			<Container fluid>
				<Navbar.Brand href="/">
					<HackLogo />
				</Navbar.Brand>
				<Navbar.Toggle
					className="ms-auto"
					aria-controls="basic-navbar-nav"
					aria-expanded="true"
				/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<NavLink style={styles.link} to="/" text="Home" />
						<PrivateNavLink
							style={styles.link}
							to="/dashboard"
							text="Dashboard"
						/>
						<NavLink style={styles.linkBtn} to={logButtonPath} text={logText} />
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
