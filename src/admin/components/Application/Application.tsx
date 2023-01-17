import Card from "react-bootstrap/Card";

import { ApplicantActions, ApplicantStatus } from "admin/components";
import {
	Applicant,
	ApplicationQuestion,
	submitReview,
} from "admin/utils/useApplicants";

import ApplicationReviews from "./ApplicationReviews";
import ApplicationSection from "./ApplicationSection/ApplicationSection";

import styles from "./Application.module.scss";

interface ApplicationSections {
	[key: string]: ApplicationQuestion[];
}

const APPLICATION_SECTIONS: ApplicationSections = {
	"Personal Information": ["gender", "pronouns", "ethnicity", "is_18_older"],
	Education: ["university", "education_level", "major"],
	Experience: ["portfolio_link", "linkedin_link", "resume_url"],
	"Free Response Questions": [
		"stress_relief_question",
		"company_specialize_question",
	],
};

interface ApplicationProps {
	applicant: Applicant;
	submitReview: submitReview;
}

function Application({ applicant, submitReview }: ApplicationProps) {
	const { _id, application_data, status } = applicant;
	const { first_name, last_name, email, submission_time, reviews } =
		application_data;

	const submittedDate = new Date(submission_time).toDateString();

	return (
		<Card className={styles.application}>
			<Card.Header>
				{email} submitted {submittedDate} <ApplicantStatus status={status} />
			</Card.Header>
			<Card.Body>
				<Card.Title as="h2">{`${first_name} ${last_name}`}</Card.Title>

				{Object.entries(APPLICATION_SECTIONS).map(([section, questions]) => (
					<ApplicationSection
						key={section}
						title={section}
						data={application_data}
						propsToShow={questions}
					/>
				))}

				<Card.Subtitle as="h3">Reviews</Card.Subtitle>
				<Card.Text>
					<ApplicationReviews reviews={reviews} />
				</Card.Text>

				<ApplicantActions applicant={_id} submitReview={submitReview} />
			</Card.Body>
		</Card>
	);
}

export default Application;
