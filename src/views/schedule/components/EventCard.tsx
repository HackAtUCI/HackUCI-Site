import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";

import { formatTime } from "views/schedule/sections/ScheduleList";

import styles from "./EventCard.module.scss";

interface EventProps {
	now: Date;
	title: string;
	start: Date;
	end: Date;
	category: string;
	host: string;
	description: string;
}

function EventCard({
	now,
	title,
	start,
	end,
	category,
	host,
	description,
}: EventProps) {
	const dStart = dayjs(start);
	const eventMoment = dStart.from(now);

	const over = now > end;

	return (
		<Card
			text="light"
			className={styles.card + " " + (over && styles.pastEventCard)}
		>
			<Card.Body>
				<Badge bg={category} text="dark" pill className="float-end">
					{category}
				</Badge>
				<Card.Title as="h4" className={styles.cardTitle}>
					{title}
				</Card.Title>
				<Card.Subtitle className={styles.cardSubtitle}>
					{host !== "" ? <p>Hosted by: {host}</p> : null}
					<p>
						{formatTime(start)} &ndash; {formatTime(end)}
					</p>
				</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
				<footer className="text-secondary text-end">{eventMoment}</footer>
			</Card.Body>
		</Card>
	);
}

export default EventCard;
