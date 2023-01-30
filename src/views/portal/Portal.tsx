import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";

import { TitleBanner } from "components";
import UserContext from "utils/userContext";
import ConfirmAttendance from "./ConfirmAttendance";
import Message from "./Message";
import VerticalTimeline from "./VerticalTimeline";

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

	const isAccepted = status === "accepted" || status === "confirmed";

	return (
		<>
			<Head>
				<title>Portal | Hack at UCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Portal</h1>
			</TitleBanner>
			<Container className="museum-container museum-container-wide">
				<h2>Status</h2>
				<VerticalTimeline status={status} />
				<Message status={status} />
				{isAccepted && <ConfirmAttendance status={status} />}
			</Container>
		</>
	);
}

export default Portal;
