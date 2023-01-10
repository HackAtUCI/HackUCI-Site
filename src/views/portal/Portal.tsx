import { useEffect } from "react";

import DisplayMessage from "./components/DisplayMessage/DisplayMessage";
import VerticleTimeline from "./components/VerticleTimeline/VerticleTimeline";
import styles from "./Portal.module.scss";

function Portal() {
	useEffect(() => {
		// TODO: Get user information
	});

	return (
		<div className={styles.dashboard}>
			<h2>Application Portal</h2>
			<div className={styles.content}>
				<VerticleTimeline />
				<DisplayMessage />
			</div>
		</div>
	);
}

export default Portal;
