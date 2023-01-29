import Image from "next/image";

import CheckCircle from "assets/icons/check-circle-fill.svg";
import XCircle from "assets/icons/x-circle-fill.svg";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "views/portal/Portal.module.scss";

export interface VerticalTimelineProps {
	status: string | null;
	submission_time: string | null;
	verdict_time?: string | null;
}

function VerticalTimeline(props: VerticalTimelineProps) {
	const submission_component = (
		<ListGroup.Item className={styles.list_item}>
			<Image
				src={CheckCircle}
				alt="checked-circle"
				width={25}
				height={25}
				className={styles.icon}
			/>
			Application submitted: {props.submission_time}
		</ListGroup.Item>
	);

	const verdict_component =
		props.status === "accepted" || props.status === "confirmed" ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={CheckCircle}
					alt="checked-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Application accepted: {props.verdict_time}
			</ListGroup.Item>
		) : props.status === "denied" ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={XCircle}
					alt="checked-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Application denied: {props.verdict_time}
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
