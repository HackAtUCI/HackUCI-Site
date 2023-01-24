import styles from "views/portal/Portal.module.scss";

interface MessageProps {
	status: string;
}

function Message(props: MessageProps) {
	// messages are temp: TODO: coordinate with Logistics for messages
	const messages: { [key: string]: JSX.Element } = {
		submitted: (
			<p>
				Thank you for submitting your application! We are currently reviewing
				applications on a rolling basis and you will hear back from us soon!
			</p>
		),
		accepted: (
			<p>
				Your application has been accepted! We look forward to seeing you at
				Hack at UCI.
			</p>
		),
		denied: (
			<p>
				We appreciate you taking the time to fill out an application for Hack at
				UCI. We regret to inform you that we are unable to accept your
				application for Hack at UCI 2023.
			</p>
		),
	};

	return <div className={styles.message}>{messages[props.status]}</div>;
}

export default Message;
