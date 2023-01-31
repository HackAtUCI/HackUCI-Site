import Image from "next/image";
import ListGroup from "react-bootstrap/ListGroup";

import BorderCircle from "assets/icons/border-circle.svg";
import CheckCircle from "assets/icons/check-circle-fill.svg";
import XCircle from "assets/icons/x-circle-fill.svg";

import { PortalStatus } from "./Portal";

import styles from "views/portal/Portal.module.scss";

interface VerticalTimelineProps {
	status: string;
}

function VerticalTimeline({ status }: VerticalTimelineProps) {
	const submission_component = (
		<ListGroup.Item className={styles.list_item}>
			<Image
				src={CheckCircle}
				alt="checked-circle"
				width={25}
				height={25}
				className={styles.icon}
			/>
			Application submitted
		</ListGroup.Item>
	);

	const verdict_component =
		status === PortalStatus.accepted || status === PortalStatus.confirmed ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={CheckCircle}
					alt="checked-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Application accepted
			</ListGroup.Item>
		) : status === PortalStatus.rejected ? (
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

	const rsvp_component =
		status === PortalStatus.accepted ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={BorderCircle}
					alt="border-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Confirm attendance
			</ListGroup.Item>
		) : status === PortalStatus.confirmed ? (
			<ListGroup.Item className={styles.list_item}>
				<Image
					src={CheckCircle}
					alt="checked-circle"
					width={25}
					height={25}
					className={styles.icon}
				/>
				Attendance confirmed
			</ListGroup.Item>
		) : null;

	return (
		<div className="p-3">
			<ListGroup className={styles.list}>
				{submission_component}
				{verdict_component}
				{rsvp_component}
			</ListGroup>
		</div>
	);
}

export default VerticalTimeline;
