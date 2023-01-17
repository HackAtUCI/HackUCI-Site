import Badge from "react-bootstrap/Badge";

import { Status } from "admin/utils/useApplicants";

const StatusLabels = {
	[Status.accepted]: "accepted",
	[Status.rejected]: "rejected",
	[Status.waitlisted]: "waitlisted",
	[Status.pending]: "needs review",
};

// colors corresponding to Bootstrap's color utility classes
const StatusColors = {
	[Status.accepted]: "success",
	[Status.rejected]: "danger",
	[Status.waitlisted]: "warning",
	[Status.pending]: "secondary",
};

interface ApplicantStatusProps {
	status: Status;
}

function ApplicantStatus({ status }: ApplicantStatusProps) {
	return (
		<Badge bg={StatusColors[status]} pill className="float-end">
			{StatusLabels[status]}
		</Badge>
	);
}

export default ApplicantStatus;
