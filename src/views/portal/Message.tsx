import AcceptedMessage from "./AcceptedMessage";
import { PortalStatus } from "./Portal";

import styles from "views/portal/Portal.module.scss";

interface MessageProps {
	status: PortalStatus;
}

function Message({ status }: MessageProps) {
	const submittedMessage = (
		<p>
			Thank you for submitting your application! We are currently reviewing
			applications on a rolling basis, and you will hear back from us soon!
		</p>
	);

	const messages: Record<PortalStatus, JSX.Element> = {
		[PortalStatus.pending]: submittedMessage,
		[PortalStatus.reviewed]: submittedMessage,
		[PortalStatus.rejected]: (
			<p>
				Thank you for applying to Hack at UCI this year. We have read through
				many applications so far, and unfortunately are unable to offer you a
				spot at our event. We highly encourage you to continue developing your
				skills and passion for technology. We would love to see you apply again
				next year!
			</p>
		),
		[PortalStatus.waitlisted]: <></>,
		[PortalStatus.accepted]: (
			<>
				<h3>Event Logistics</h3>
				<p>
					Congrats on your acceptance to Hack at UCI 2023! Before confirming
					your attendance, it is crucial that you read through the following
					event logistics in its entirety and complete the required tasks. We
					look forward to seeing you at Hack at UCI!
				</p>
				<AcceptedMessage />
			</>
		),
		[PortalStatus.confirmed]: (
			<>
				<h3>Event Logistics</h3>
				<p>
					Thank you for confirming your attendance! We look forward to seeing
					you at Hack at UCI!
				</p>
				<AcceptedMessage />
			</>
		),
	};

	return <div className={styles.message}>{messages[status]}</div>;
}

export default Message;
