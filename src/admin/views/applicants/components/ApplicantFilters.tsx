import { Dispatch, SetStateAction } from "react";

import { IconProps } from "@cloudscape-design/components/icon";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import Multiselect from "@cloudscape-design/components/multiselect";

import { StatusLabels } from "admin/components/ApplicantStatus/ApplicantStatus";
import { ReviewStatus, Status } from "admin/utils/useApplicant";

export interface StatusOptionDefinition extends OptionDefinition {
	value?: Status;
}

interface ApplicantFiltersProps {
	selectedStatuses: readonly OptionDefinition[];
	setSelectedStatuses: Dispatch<SetStateAction<readonly OptionDefinition[]>>;
}

const StatusIcons: Record<ReviewStatus, IconProps.Name> = {
	[ReviewStatus.pending]: "status-pending",
	[ReviewStatus.reviewed]: "status-in-progress",
	[ReviewStatus.released]: "status-positive",
};

const STATUS_OPTIONS: OptionDefinition[] = Object.values(ReviewStatus).map(
	(status) => ({
		label: StatusLabels[status],
		value: status,
		iconName: StatusIcons[status],
	})
);

function ApplicantFilters({
	selectedStatuses,
	setSelectedStatuses,
}: ApplicantFiltersProps) {
	return (
		<Multiselect
			selectedOptions={selectedStatuses}
			onChange={({ detail }) => setSelectedStatuses(detail.selectedOptions)}
			deselectAriaLabel={(e) => `Remove ${e.label}`}
			options={STATUS_OPTIONS}
			placeholder="Choose statuses"
			selectedAriaLabel="Selected"
		/>
	);
}

export default ApplicantFilters;
