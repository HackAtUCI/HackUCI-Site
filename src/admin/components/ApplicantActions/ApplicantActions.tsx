import Button from "react-bootstrap/Button";

import { Decision, submitReview, uid } from "admin/utils/useApplicants";
import { useContext } from "react";
import UserContext from "utils/userContext";

interface ApplicantActionsProps {
	applicant: uid;
	submitReview: submitReview;
}

function ApplicantActions({ applicant, submitReview }: ApplicantActionsProps) {
	const { role } = useContext(UserContext);

	if (role !== "reviewer") {
		return null;
	}

	const reviewSubmitter = (review: Decision) => {
		return () => {
			submitReview(applicant, review);
		};
	};

	return (
		<>
			<Button variant="success" onClick={reviewSubmitter(Decision.accepted)}>
				Accept
			</Button>
			<Button variant="danger" onClick={reviewSubmitter(Decision.rejected)}>
				Reject
			</Button>
			<Button variant="warning" onClick={reviewSubmitter(Decision.waitlisted)}>
				Waitlist
			</Button>
		</>
	);
}

export default ApplicantActions;
