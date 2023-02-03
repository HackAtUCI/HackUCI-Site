import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import styles from "views/schedule/components/EventCard.module.scss";

interface EventProps {
	title: string;
	start: string;
	end: string;
	category: string;
	host: string;
	description: string;
}

function EventCard({
	title,
	start,
	end,
	category,
	host,
	description,
}: EventProps) {
	return (
		<Card text="light" className={styles.card}>
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
						{start} - {end}
					</p>
				</Card.Subtitle>
				<Card.Text>{description}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default EventCard;
