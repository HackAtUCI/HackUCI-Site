import { useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { ApplicantFilters, ApplicantList, Application } from "admin/components";
import { Status, uid } from "admin/utils/useApplicant";
import useApplicants, { Applicants } from "admin/utils/useApplicants";
import Loading from "utils/Loading";

import styles from "./Applicants.module.scss";

function Applications() {
	const [currentApplicant, setCurrentApplicant] = useState<uid>("");
	const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([
		Status.pending,
	]);
	const { applicantList } = useApplicants();

	if (!applicantList) {
		return <Loading />;
	}

	const filteredApplicants = applicantList.filter((applicant) =>
		selectedStatuses.includes(applicant.status)
	);

	const applicants: Applicants = Object.fromEntries(
		applicantList.map((applicant) => [applicant._id, applicant])
	);

	return (
		<>
			<h1>Applications</h1>
			<Row>
				<ApplicantFilters
					selectedStatuses={selectedStatuses}
					setSelectedStatuses={setSelectedStatuses}
				/>
			</Row>
			<Row className={styles["application-review"] + " " + "mt-5 px-5"}>
				<Col>
					<ApplicantList
						applicantList={filteredApplicants}
						currentApplicant={currentApplicant}
						setCurrentApplicant={setCurrentApplicant}
					/>
				</Col>
				{currentApplicant && (
					<Col className={styles["application-side"]} lg="9">
						<Application applicant={applicants[currentApplicant]} />
					</Col>
				)}
			</Row>
		</>
	);
}

export default Applications;
