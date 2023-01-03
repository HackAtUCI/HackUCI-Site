import { useEffect } from "react";
import Container from "react-bootstrap/Container";

import LoginForm from "./components/LoginForm";
import styles from "./Login.module.scss";

function Login() {
	useEffect(() => {
		// TODO: check if user is already authenticated
	});

	return (
		<Container className={styles.container}>
			<h1>Log In</h1>
			<LoginForm />
		</Container>
	);
}

export default Login;
