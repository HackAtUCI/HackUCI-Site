import Head from "next/head";
import Container from "react-bootstrap/Container";

import { TitleBanner } from "components";

import VerificationForm from "./components/VerificationForm";

function GuestLogin() {
	return (
		<>
			<Head>
				<title>Guest Login | HackUCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Log In</h1>
			</TitleBanner>
			<Container className="museum-container">
				<p>
					A login passphrase was sent to your email. Please enter the
					passphrase.
				</p>
				<VerificationForm />
			</Container>
		</>
	);
}

export default GuestLogin;
