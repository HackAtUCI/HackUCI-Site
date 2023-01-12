import Container from "react-bootstrap/Container";

import VerificationForm from "./components/VerificationForm";

function GuestLogin() {
	return (
		<Container className="bg-white p-4">
			<h1>Log In</h1>
			<p>
				A login passphrase was sent to your email. Please enter the passphrase.
			</p>
			<VerificationForm />
		</Container>
	);
}

export default GuestLogin;
