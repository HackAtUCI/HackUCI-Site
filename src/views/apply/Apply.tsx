import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./Apply.module.scss";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationPreface from "./components/ApplicationPreface";

function Apply() {
	// TODO: CHECK LOGIN STATUS AND SUBMISSION STATUS
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [submittedApplication, setSubmittedApplication] = useState(true);
	const [acceptedPreface, setAcceptedPreface] = useState(false);

	const router = useRouter();

	useEffect(() => {
		if (submittedApplication) {
			router.push("/portal");
		}
	});

	return (
		<div className={styles.main}>
			<Container className={styles.apply}>
				{!acceptedPreface ? (
					<ApplicationPreface
						isLoggedIn={isLoggedIn}
						setAcceptedPreface={setAcceptedPreface}
					/>
				) : (
					<ApplicationForm />
				)}
			</Container>
		</div>
	);
}

export default Apply;
