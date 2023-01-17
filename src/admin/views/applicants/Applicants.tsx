import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { ApplicantList, Application } from "admin/components";
import useApplicants, { Applicants, uid } from "admin/utils/useApplicants";
import Loading from "utils/Loading";

import styles from "./Applicants.module.scss";

function Applications() {
	const [currentApplicant, setCurrentApplicant] = useState<uid>("");
	const { applicantList, submitReview } = useApplicants();

	if (!applicantList) {
		return <Loading />;
	}

	const applicants: Applicants = Object.fromEntries(
		applicantList.map((applicant) => [applicant._id, applicant])
	);

	return (
		<>
			<h1>Applications</h1>
			<Row className={styles["application-review"] + " " + "mt-5 px-5"}>
				<Col>
					<ApplicantList
						applicantList={applicantList}
						currentApplicant={currentApplicant}
						setCurrentApplicant={setCurrentApplicant}
					/>
				</Col>
				{currentApplicant && (
					<Col className={styles["application-side"]} lg="9">
						<Application
							applicant={applicants[currentApplicant]}
							submitReview={submitReview}
						/>
					</Col>
				)}
			</Row>
		</>
	);
}

export default Applications;
