import { useEffect } from "react";

import VerticleTimeline from "./components/VerticleTimeline/VerticleTimeline";
import styles from "./Portal.module.scss";

function Portal() {
	useEffect(() => {
		// TODO: Get user information
	});

	return (
		<div className={styles.portal}>
			<h2>Application Portal</h2>
			<div className={styles.content}>
				<VerticleTimeline status="submitted" date_submitted="1/11/23" />
			</div>
		</div>
	);
}

export default Portal;
