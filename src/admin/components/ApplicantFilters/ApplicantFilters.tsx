import { Dispatch, SetStateAction } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { StatusLabels } from "admin/components/ApplicantStatus/ApplicantStatus";
import { Status } from "admin/utils/useApplicants";

interface ApplicantFiltersProps {
	selectedStatuses: Status[];
	setSelectedStatuses: Dispatch<SetStateAction<Status[]>>;
}

function ApplicantFilters({
	selectedStatuses,
	setSelectedStatuses,
}: ApplicantFiltersProps) {
	const handleSelect = (status: Status) => {
		setSelectedStatuses((selected) => {
			const index = selected.indexOf(status);
			if (index === -1) {
				return selected.concat(status);
			}
			return selected.slice(0, index).concat(selected.slice(index + 1));
		});
	};

	return (
		<Container className="bg-white">
			<Form.Group controlId="filter-status">
				<Form.Label>Status</Form.Label>
				{Object.entries(Status).map(([name, value]) => (
					<Form.Check
						key={name}
						id={`status-${name}`}
						label={StatusLabels[value]}
						checked={selectedStatuses.includes(value)}
						onChange={() => handleSelect(value)}
					/>
				))}
			</Form.Group>
		</Container>
	);
}

export default ApplicantFilters;
