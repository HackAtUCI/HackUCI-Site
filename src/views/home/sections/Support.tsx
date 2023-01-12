import Container from "react-bootstrap/Container";

import MentorsVolunteers from "./MentorsVolunteers/MentorsVolunteers";

function Support() {
	return (
		<Container as="section">
			<h2 className="visually-hidden">Support</h2>
			<MentorsVolunteers />
		</Container>
	);
}

export default Support;
