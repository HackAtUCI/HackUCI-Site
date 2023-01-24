import CheckCircle from "assets/icons/check-circle-fill.svg";
import XCircle from "assets/icons/x-circle-fill.svg";
import Image from "next/image";
import ListGroup from "react-bootstrap/ListGroup";
import styles from "views/portal/Portal.module.scss";

export interface TimelineProps {
	status: string | null;
	submission_time: string | null;
	verdict_time?: string | null;
}

function VerticalTimeline(props: TimelineProps) {
	const first_item = (
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

	const second_item =
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
				{first_item}
				{second_item}
			</ListGroup>
		</div>
	);
}

export default VerticalTimeline;
