import Head from "next/head";
import Router from "next/router";
import { useContext, useEffect } from "react";
import UserContext from "utils/userContext";

import VerticleTimeline from "./components/VerticleTimeline/VerticleTimeline";
import styles from "./Portal.module.scss";

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
		<div className={styles.portal}>
			<Head>
				<title>Application Portal | HackUCI 2023</title>
			</Head>
			<h2>Application Portal</h2>
			<div className={styles.content}>
				<VerticleTimeline status="submitted" date_submitted="1/11/23" />
			</div>
		</div>
	);
}

export default Portal;
