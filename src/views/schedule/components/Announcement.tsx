import Card from "react-bootstrap/Card";

import styles from "views/schedule/components/Announcement.module.scss";
import { formatTime } from "views/schedule/sections/ScheduleList";

interface AnnouncementProps {
	title: string;
	start: Date;
	description: string;
}

function Announcement({ title, start, description }: AnnouncementProps) {
	return (
		<Card className={styles.card}>
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
