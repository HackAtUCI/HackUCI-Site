import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import UserContext from "utils/userContext";

import ApplicationForm from "./components/ApplicationForm";
import ApplicationPreface from "./components/ApplicationPreface";

import styles from "./Apply.module.scss";

function Apply() {
	const { uid, status } = useContext(UserContext);
	const isLoggedIn = uid !== null;
	const [submittedApplication, setSubmittedApplication] = useState(
		status !== null
	);

	const [acceptedPreface, setAcceptedPreface] = useState(false);

	useEffect(() => {
		if (submittedApplication || status !== null) {
			window.location.href = "/portal";
		}
	}, [status, submittedApplication]);

	if (status !== null) {
		return null;
	}

	return (
		<div className={styles.main}>
			<Head>
				<title>Apply | HackUCI 2023</title>
			</Head>
			<Container className={styles.apply}>
				{!acceptedPreface ? (
					<ApplicationPreface
						isLoggedIn={isLoggedIn}
						setAcceptedPreface={setAcceptedPreface}
					/>
				) : (
					<ApplicationForm setSubmittedApplication={setSubmittedApplication} />
				)}
			</Container>
		</div>
	);
}

export default Apply;
