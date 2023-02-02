import Card from "react-bootstrap/Card";
import styles from "views/schedule/components/Announcement.module.scss";

interface AnnouncementProps {
	title: string;
	start: string;
	description: string;
}

function Announcement({ title, start, description }: AnnouncementProps) {
	return (
		<Card className={styles.card}>
			<Card.Body>
				<Card.Title as="h4">
					{description !== "" ? (
						<a className={styles.announcementLink} href={description}>
							<h4>{title}</h4>
						</a>
					) : (
						<h4>{title}</h4>
					)}
				</Card.Title>
				<Card.Text>{start}</Card.Text>
			</Card.Body>
		</Card>
	);
}

export default Announcement;
