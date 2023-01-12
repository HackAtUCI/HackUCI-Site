import { useEffect } from "react";

import DisplayMessage from "./components/DisplayMessage";
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
				<VerticleTimeline />
				<div className={styles.display_message}>
					<DisplayMessage status="attending" />
				</div>
			</div>
		</div>
	);
}

export default Portal;
