import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { TitleBanner } from "components";
import UserContext from "utils/userContext";

import ApplicationForm from "./components/ApplicationForm";
import ApplicationPreface from "./components/ApplicationPreface";

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

	const applyBody = !acceptedPreface ? (
		<ApplicationPreface
			isLoggedIn={isLoggedIn}
			setAcceptedPreface={setAcceptedPreface}
		/>
	) : (
		<ApplicationForm setSubmittedApplication={setSubmittedApplication} />
	);

	return (
		<>
			<Head>
				<title>Apply | HackUCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Apply</h1>
			</TitleBanner>
			<Container className="museum-container museum-container-wide">
				{applyBody}
			</Container>
		</>
	);
}

export default Apply;
