import Card from "react-bootstrap/Card";

import { formatTime } from "views/schedule/sections/ScheduleList";

import styles from "./Announcement.module.scss";

interface AnnouncementProps {
	now: Date;
	title: string;
	start: Date;
	description: string;
}

function Announcement({ now, title, start, description }: AnnouncementProps) {
	const over = now > start;

	return (
		<Card className={styles.card + " " + (over && styles.pastEventCard)}>
			<Card.Body>
				<Card.Title as="h4">
					{description !== "" ? (
						<a className={styles.announcementLink} href={description}>
							{title}
						</a>
					) : (
						title
					)}
				</Card.Title>
				<Card.Text>{formatTime(start)}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Announcement;
