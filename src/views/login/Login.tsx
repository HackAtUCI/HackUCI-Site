import Head from "next/head";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";

import { TitleBanner } from "components";

import LoginForm from "./components/LoginForm";

function Login() {
	useEffect(() => {
		// TODO: check if user is already authenticated
	});

	return (
		<>
			<Head>
				<title>Log In | Hack at UCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Log In</h1>
			</TitleBanner>
			<Container className="museum-container">
				<LoginForm />
			</Container>
		</>
	);
}

export default Login;
