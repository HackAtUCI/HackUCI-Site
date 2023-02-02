import Card from "react-bootstrap/Card";
import styles from "views/schedule/components/Event.module.scss";

interface EventProps {
	title: string;
	start: string;
	end: string;
	category: string;
	host: string;
	description: string;
}

function Event({ title, start, end, category, host, description }: EventProps) {
	return (
		<Card className={styles.card}>
			<Card.Body>
				<Card.Title as="h4" className={styles.cardTitle}>
					<h4 className={styles.cardTitleName}>{title}</h4>
					<h4 className={styles.cardTitleCategory}>{category}</h4>
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

export default Event;
