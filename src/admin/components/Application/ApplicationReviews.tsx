import { useContext } from "react";

import { Review } from "admin/utils/useApplicants";
import UserContext from "utils/userContext";

interface ApplicationReviewsProps {
	reviews: Review[];
}

function ApplicationReviews({ reviews }: ApplicationReviewsProps) {
	const { uid } = useContext(UserContext);

	if (reviews.length === 0) {
		return <p>No reviews</p>;
	}

	const formattedReviews = reviews.map(([date, reviewer, decision]) => [
		date,
		new Date(date).toLocaleDateString(),
		reviewer.split(".").at(-1) as string,
		decision,
	]);

	return (
		<ul>
			{formattedReviews.map(([raw_date, date, reviewer, decision]) =>
				reviewer === uid ? (
					<li key={raw_date}>
						You reviewed as {decision} on {date}
					</li>
				) : (
					<li key={date}>
						{reviewer} reviewed this application on {date}
					</li>
				)
			)}
		</ul>
	);
}

export default ApplicationReviews;
