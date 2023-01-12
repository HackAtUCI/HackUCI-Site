import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserContext from "utils/userContext";
import styles from "./Apply.module.scss";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationPreface from "./components/ApplicationPreface";

function Apply() {
	const { uid, status } = useContext(UserContext);
	const isLoggedIn = uid !== null;
	const [submittedApplication, setSubmittedApplication] = useState(
		status !== null
	);

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
					<ApplicationForm setSubmittedApplication={setSubmittedApplication} />
				)}
			</Container>
		</div>
	);
}

export default Apply;
