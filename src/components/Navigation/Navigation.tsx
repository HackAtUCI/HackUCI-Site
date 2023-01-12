import { useContext, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import HackLogo from "components/HackLogo/HackLogo";
import UserContext from "utils/userContext";

import styles from "./Navigation.module.scss";
import { NavLinkItem, PrivateNavLinkItem } from "./NavigationHelpers";

function Navigation() {
	const [expanded, setExpanded] = useState<boolean>(false);

	const { uid } = useContext(UserContext);

	const router = useRouter();
	const isLoggedIn = uid !== null;
	const currentRoute = router.asPath;
	const logText = isLoggedIn ? "Log Out" : "Log In";
	const logButtonPath = isLoggedIn ? "/logout" : "/login";

	return (
		<Navbar
			className={styles.navbar}
			expand="md"
			variant="dark"
			onToggle={setExpanded}
		>
			<Container fluid>
				<Navbar.Brand as={Link} href="/">
					<HackLogo />
				</Navbar.Brand>
				<Navbar.Toggle
					className="ms-auto"
					aria-expanded={expanded}
					aria-controls="main-navbar-nav"
				/>
				<Navbar.Collapse id="main-navbar-nav">
					<Nav as="ul" className="ms-auto" activeKey={currentRoute}>
						<NavLinkItem href="/">Home</NavLinkItem>
						<NavLinkItem href="/apply">Apply</NavLinkItem>
						<PrivateNavLinkItem authorized={isLoggedIn} href="/dashboard">
							Dashboard
						</PrivateNavLinkItem>
						<NavLinkItem
							href={logButtonPath}
							className="btn btn-light" // style underlying next/Link
							bsPrefix=" " // override .nav-link class while still using eventKey
						>
							{logText}
						</NavLinkItem>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}

export default Navigation;
