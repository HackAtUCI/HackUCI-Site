import Head from "next/head";
// import Router from "next/router";
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";

import { TitleBanner } from "components";
import UserContext from "utils/userContext";
import Message from "./Message";
import VerticalTimeline from "./VerticalTimeline";

function Portal() {
	const { status, submission_time, verdict_time } = useContext(UserContext);

	useEffect(() => {
		if (status === null) {
			// Router.push("/apply");
		}
	}, [status]);

	if (status === null) {
		// return null;
	}

	return (
		<>
			<Head>
				<title>Portal | HackUCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Portal</h1>
			</TitleBanner>
			<Container className="museum-container">
				<h2>Status</h2>
				<VerticalTimeline
					status={status}
					submission_time={submission_time}
					verdict_time={verdict_time}
				/>
				<Message status={status} />
			</Container>
		</>
	);
}

export default Portal;
