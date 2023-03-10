import dayjs from "dayjs";
import Card from "react-bootstrap/Card";

import styles from "./EventCard.module.scss";

interface EventSpacerCardProps {
	now: Date;
	title: string;
	start: Date;
	end: Date;
	description: string;
}

function EventSpacerCard({
	now,
	title,
	start,
	end,
	description,
}: EventSpacerCardProps) {
	const duration = dayjs(end).diff(dayjs(start), "hour", true);
	const durationText = duration + " hours";

	const over = now > end;
	const minHeight = 80 * (duration + 1);

	return (
		<Card
			className={"text-end mb-4 " + (over && styles.pastEventCard)}
			bg="dark"
			text="white"
			style={{ minHeight }}
		>
			<Card.Body className="d-flex flex-column justify-content-center">
				<Card.Title as="h4">{title}</Card.Title>
				<Card.Text>{description}</Card.Text>
				<footer className="text-white-50 text-end">{durationText}</footer>
			</Card.Body>
		</Card>
	);
}

export default EventSpacerCard;
