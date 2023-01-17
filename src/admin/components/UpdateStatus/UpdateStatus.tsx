import { Button } from "react-bootstrap";

function UpdateStatus() {
	return (
		<>
			<Button variant="success" className="me-3">
				Accept
			</Button>
			<Button variant="danger" className="me-3">
				Reject
			</Button>
			<Button variant="warning" className="me-3">
				Waitlist
			</Button>
		</>
	);
}

export default UpdateStatus;
