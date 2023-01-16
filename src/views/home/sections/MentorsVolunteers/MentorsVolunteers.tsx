import Row from "react-bootstrap/Row";

import mentorStatue from "assets/images/mentor_statue.svg";
import volunteerStatue from "assets/images/volunteer_statue.svg";

import { StatuePedastal } from "components";

function MentorsVolunteers() {
	return (
		<Row>
			<StatuePedastal
				statueTitle="Apply to be a Mentor"
				statueImage={mentorStatue}
				statueAlt="HackUCI Mentor Statue"
				href="/mentor"
				buttonName="Mentor Application"
			>
				Have a knack for innovation? Interested in inspiring the next generation
				of developers? Our mentors are vital to making HackUCI 2023 successful
				and enjoyable for our hackers. Apply to be a mentor today!
			</StatuePedastal>
			<StatuePedastal
				statueTitle="Become a Volunteer"
				statueImage={volunteerStatue}
				statueAlt="HackUCI Volunteer Statue"
				href="/volunteer"
				buttonName="Volunteer Form"
			>
				Want a peek behind the scenes? Join our team of event volunteers that
				make HackUCI run as smoothly as possible! Many roles are available and
				shifts are flexible. Plus, get access to all the free food and all our
				hackathon swag. We hope to see you on the team!
			</StatuePedastal>
		</Row>
	);
}

export default MentorsVolunteers;
