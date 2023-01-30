import Button from "react-bootstrap/Button";

import { PortalStatus } from "./Portal";

interface ConfirmAttendanceProps {
	status: string;
}

function ConfirmAttendance({ status }: ConfirmAttendanceProps) {
	const buttonText =
		status === PortalStatus.accepted
			? "I will be attending Hack at UCI 2023"
			: "I am no longer able to attend the event";

	return (
		<div>
			<h4>RSVP</h4>
			<form method="post" action="/api/user/rsvp">
				<Button>{buttonText}</Button>
			</form>
		</div>
	);
}

export default ConfirmAttendance;
