import { useEffect } from "react";
import Container from "react-bootstrap/Container";

import MuseumRoom from "layouts/MuseumRoom";
import LoginForm from "./components/LoginForm";
import styles from "./Login.module.scss";

function Login() {
	useEffect(() => {
		// TODO: check if user is already authenticated
	});

	return (
		<MuseumRoom>
			<section className={styles.login}>
				<Container className={styles.container}>
					<h1>Log In</h1>
					<LoginForm />
				</Container>
			</section>
		</MuseumRoom>
	);
}

export default Login;
