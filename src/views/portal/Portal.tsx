import Head from "next/head";
import { Container } from "react-bootstrap";

import Router from "next/router";
import { useContext, useEffect } from "react";

import { TitleBanner } from "components";
import UserContext from "utils/userContext";

import VerticleTimeline from "./components/VerticleTimeline/VerticleTimeline";

function Portal() {
	const { status } = useContext(UserContext);

	useEffect(() => {
		if (status === null) {
			Router.push("/apply");
		}
	}, [status]);

	if (status === null) {
		return null;
	}

	return (
		<>
			<Head>
				<title>Portal | Hack at UCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Portal</h1>
			</TitleBanner>
			<Container className="museum-container">
				<VerticleTimeline status="submitted" date_submitted="1/11/23" />
			</Container>
		</>
	);
}

export default Portal;
