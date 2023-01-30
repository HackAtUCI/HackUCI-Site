import Button from "react-bootstrap/Button";

import { PortalStatus } from "./Portal";

interface ConfirmAttendanceProps {
	status: string;
}

function ConfirmAttendance({ status }: ConfirmAttendanceProps) {
	const buttonText =
		status === PortalStatus.accepted
			? "I will be attending Hack at UCI 2023"
			: "I am no longer able to attend Hack at UCI 2023";

	return (
		<div>
			<h4>RSVP</h4>
			{status === PortalStatus.confirmed && (
				<p>
					Thank you for confirming your attendance. We look forward to seeing
					you at the event!
				</p>
			)}
			<form method="post" action="/api/user/rsvp">
				<Button type="submit" variant="museum">
					{buttonText}
				</Button>
			</form>
		</div>
	);
}

export default ConfirmAttendance;
