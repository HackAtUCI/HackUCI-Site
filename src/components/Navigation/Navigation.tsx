import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import HackLogo from "components/HackLogo/HackLogo";
import { NavLink, PrivateNavLink } from "./NavigationHelpers";

import styles from "./Navigation.module.scss";

// Temporary variable to indicate login status
const isLoggedIn = false;

function Navigation() {
	// TODO: CHECK LOGIN STATUS

	const router = useRouter();
	const currentRoute = router.asPath;
	const logText = isLoggedIn ? "Logout" : "Login";
	const logButtonPath = isLoggedIn ? "/" : "/login";

	return (
		<Navbar className={styles.navbar} expand="md" variant="dark">
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
					<Nav
						className="ms-auto"
						activeKey={currentRoute}
						defaultActiveKey="/"
					>
						<NavLink className={styles.link} href="/">
							Home
						</NavLink>
						<PrivateNavLink
							authorized={isLoggedIn}
							className={styles.link}
							href="/dashboard"
						>
							Dashboard
						</PrivateNavLink>
						<Nav.Item
							as={Button}
							bsPrefix="btn-light"
							className={styles.linkBtn}
							href={logButtonPath}
						>
							{logText}
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
