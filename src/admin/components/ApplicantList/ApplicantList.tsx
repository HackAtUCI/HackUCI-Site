import { Dispatch, SetStateAction } from "react";
import ListGroup from "react-bootstrap/ListGroup";

import { ApplicantStatus } from "admin/components";
import { Applicant, uid } from "admin/utils/useApplicants";

interface ApplicantListProps {
	applicantList: Applicant[];
	currentApplicant: uid;
	setCurrentApplicant: Dispatch<SetStateAction<uid>>;
}

function ApplicantList({
	applicantList,
	currentApplicant,
	setCurrentApplicant,
}: ApplicantListProps) {
	return (
		<ListGroup activeKey={currentApplicant}>
			{applicantList.map((applicant) => {
				const { _id, application_data, status } = applicant;
				const { first_name, last_name } = application_data;
				const selectApplicant = () => setCurrentApplicant(_id);

				return (
					<ListGroup.Item
						key={_id}
						action
						onClick={selectApplicant}
						eventKey={_id}
					>
						<div className="h5">{`${first_name} ${last_name}`}</div>
						<ApplicantStatus status={status} />
					</ListGroup.Item>
				);
			})}
		</ListGroup>
	);
}

export default ApplicantList;
