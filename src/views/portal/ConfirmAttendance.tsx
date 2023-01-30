import Button from "react-bootstrap/Button";

interface ConfirmAttendanceProps {
	status: string;
}

function ConfirmAttendance(props: ConfirmAttendanceProps) {
	const status = props.status;
	return (
		<>
			<h4>RSVP</h4>
			{status === "accepted" ? (
				<form method="post" action="/api/user/rsvp">
					<Button>Click here to RSVP</Button>
				</form>
			) : (
				<form method="post" action="/api/user/rsvp">
					<Button>Click here to revoke RSVP</Button>
				</form>
			)}
		</>
	);
}

export default ConfirmAttendance;
