import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import { TitleBanner } from "components";
import UserContext from "utils/userContext";

import ApplicationForm from "./components/ApplicationForm";
import ApplicationPreface from "./components/ApplicationPreface";

const applicationsOpen = false;

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

	const applicationsClosed = (
		<div className="py-5 text-center">
			<div className="lead">
				<p>Applications for Hack at UCI 2023 were closed on January 29th.</p>
			</div>
			<p>
				If you already applied, please <Link href="/login">log in</Link> to
				visit your applicant portal.
			</p>
			<p>
				If you have any other questions or concerns, feel free to contact us at{" "}
				<a href="mailto:hack@uci.edu">hack@uci.edu</a>.
			</p>
		</div>
	);

	return (
		<>
			<Head>
				<title>Apply | Hack at UCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Apply</h1>
			</TitleBanner>
			<Container className="museum-container museum-container-wide">
				{applicationsOpen ? applyBody : applicationsClosed}
			</Container>
		</>
	);
}

export default Apply;
