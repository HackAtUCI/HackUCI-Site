import Container from "react-bootstrap/Container";
import UpdateStatus from "../UpdateStatus/UpdateStatus";
import styles from "./Application.module.scss";
import ApplicationHeader from "./ApplicationHeader/ApplicationHeader";
import ApplicationSection from "./ApplicationSection/ApplicationSection";

import { Applicant } from "admin/views/applications/Applications";

const PERSONAL_INFORMATION = ["gender", "pronouns", "ethnicity", "is_18_older"];
const EDUCATION = ["university", "education_level", "major"];
const EXPERIENCE = ["portfolio_link", "linkedin_link", "resume_url"];
const FRQ = ["stress_relief_question", "company_specialize_question"];

const TITLE_PROPERTY_MAP = {
	"Personal Information": PERSONAL_INFORMATION,
	Education: EDUCATION,
	Experience: EXPERIENCE,
	"Free Response Questions": FRQ,
};

interface ApplicationProps {
	applicant: Applicant;
}

function Application({ applicant }: ApplicationProps) {
	return (
		<div className={styles["application"]}>
			<Container className="p-5">
				<ApplicationHeader
					firstName={applicant.first_name}
					lastName={applicant.last_name}
					email={applicant.email}
					submissionTime={applicant.submission_time}
				/>
				{Object.entries(TITLE_PROPERTY_MAP).map((entry, index) => (
					<ApplicationSection
						key={index}
						title={entry[0]}
						data={applicant}
						propsToShow={entry[1]}
					/>
				))}
				<UpdateStatus />
			</Container>
		</div>
	);
}

export default Application;
