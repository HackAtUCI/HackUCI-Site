import Image from "next/image";

import CheckCircle from "assets/icons/check-circle-fill.svg";
import XCircle from "assets/icons/x-circle-fill.svg";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "views/portal/Portal.module.scss";

interface VerticalTimelineProps {
	status: string | null;
	submission_time: string | null;
}

function VerticalTimeline(props: VerticalTimelineProps) {
	const { status, submission_time } = props;

	const submission_component = (
		<ListGroup.Item className={styles.list_item}>
			<Image
				src={CheckCircle}
				alt="checked-circle"
				width={25}
				height={25}
				className={styles.icon}
			/>
			Application submitted: {submission_time}
		</ListGroup.Item>
	);

	const verdict_component =
		status === "accepted" || status === "confirmed" ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={CheckCircle}
					alt="checked-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Application accepted!
			</ListGroup.Item>
		) : status === "denied" ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={XCircle}
					alt="checked-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Application rejected
			</ListGroup.Item>
		) : null;

	return (
		<div className={styles.verticle_timeline}>
			<ListGroup className={styles.list}>
				{submission_component}
				{verdict_component}
			</ListGroup>
		</div>
	);
}

export default VerticalTimeline;
