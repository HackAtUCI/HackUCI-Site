import styles from "./VerticleTimeline.module.scss";

import { Card } from "react-bootstrap";

interface TimelineProps {
	status: string;
	date_submitted: string;
	forms_submitted_date?: string;
}

function VerticleTimeline(props: TimelineProps) {
	// const middle_card = (
	// 	<Card className={styles.card}>
	// 		<Card.Text>
	// 			{props.status !== "submitted"
	// 				? props.status === "accepted" || props.status === "attending"
	// 					? "Application Accepted"
	// 					: "Application Denied"
	// 				: "Application Pending Review"}
	// 		</Card.Text>
	// 	</Card>
	// );

	// const end_card =
	// 	props.status === "accepted" || props.status === "attending" ? (
	// 		<Card className={styles.card}>
	// 			<Card.Text>
	// 				{props.status === "attending"
	// 					? "Forms Submitted on " + props.forms_submitted_date
	// 					: "Awaiting Form Submission"}
	// 			</Card.Text>
	// 		</Card>
	// 	) : null;

	return (
		<div className={styles.verticle_timeline}>
			<h5>Status</h5>
			<Card className={styles.card}>
				<Card.Title>Application Submitted: {props.date_submitted}</Card.Title>
				<Card.Text>Your application is under review</Card.Text>
			</Card>
			{/* {middle_card} */}
			{/* {end_card} */}
		</div>
	);
}

export default VerticleTimeline;
