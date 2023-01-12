import { Card } from "react-bootstrap";

import styles from "views/portal/Portal.module.scss";

function DisplayMessage(props: { status: string }) {
	let cards: { [key: string]: { title: string; description: string } } = {
		submitted: {
			title: "Submitted",
			description: "submitted message",
		},
		rejected: {
			title: "Rejected",
			description: "rejected message",
		},
		accepted: {
			title: "Accepted",
			description: "accepted message",
		},
		attending: {
			title: "Attending",
			description: "attending message",
		},
	};

	return (
		<Card className={styles.card}>
			<Card.Title>Application Status: {cards[props.status].title}</Card.Title>
			<Card.Text>{cards[props.status].description}</Card.Text>
		</Card>
	);
}

export default DisplayMessage;
