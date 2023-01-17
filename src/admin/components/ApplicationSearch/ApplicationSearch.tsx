import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { Container, Form } from "react-bootstrap";
import styles from "./ApplicationSearch.module.scss";
import SearchResults from "./SearchResults/SearchResults";

// import { SidebarDisplay, Status } from "admin/views/applications/Applications";

interface ApplicationSidebarProps {
	data: SidebarDisplay[];
	setUser: Dispatch<SetStateAction<number>>;
}

function ApplicationSearch({ data, setUser }: ApplicationSidebarProps) {
	const [displayedApplicants, setDisplayedApplicants] = useState<number[]>([]);
	const [showStatuses, setShowStatuses] = useState<Array<string>>([]);

	function updateDisplayedNames(e: ChangeEvent<HTMLInputElement>): void {
		setDisplayedApplicants(
			data
				.map((_, index) => index)
				.filter((index) =>
					data[index].name.toLowerCase().includes(e.target.value.toLowerCase())
				)
		);
	}

	function updateStatuses(changedStatus: string): void {
		if (showStatuses.includes(changedStatus)) {
			setShowStatuses(
				showStatuses.filter((status) => status !== changedStatus)
			);
		} else {
			setShowStatuses([...showStatuses, changedStatus]);
		}
	}

	useEffect(() => {
		setDisplayedApplicants(
			data
				.map((_, index) => index)
				.filter((index) => {
					return (
						(showStatuses.includes("accepted") &&
							data[index].status === Status.accepted) ||
						(showStatuses.includes("rejected") &&
							data[index].status === Status.rejected) ||
						(showStatuses.includes("waitlisted") &&
							data[index].status === Status.waitlisted) ||
						(showStatuses.includes("pending") &&
							data[index].status === Status.pending)
					);
				})
		);
	}, [showStatuses, data]);

	return (
		<div className={styles["sidebar"]}>
			<Container className="px-0">
				<Form.Group className="m-3 mb-4" controlId="applicant-search">
					<Form.Label>
						<strong>Applicant Search</strong>
					</Form.Label>
					<Form.Control
						className="mb-3"
						style={{ fontSize: "0.75em" }}
						onChange={updateDisplayedNames}
					/>

					<Form.Check
						id="pending_review"
						label="Pending Review"
						checked={showStatuses.includes("pending")}
						onChange={() => updateStatuses("pending")}
					/>
					<Form.Check
						id="accepted"
						label="Accepted"
						checked={showStatuses.includes("accepted")}
						onChange={() => updateStatuses("accepted")}
					/>
					<Form.Check
						id="rejected"
						label="Rejected"
						checked={showStatuses.includes("rejected")}
						onChange={() => updateStatuses("rejected")}
					/>
					<Form.Check
						id="waitlisted"
						label="Waitlisted"
						onChange={() => updateStatuses("waitlisted")}
					/>
				</Form.Group>
			</Container>
			<SearchResults
				data={data}
				results={displayedApplicants}
				setUser={setUser}
			/>
		</div>
	);
}

export default ApplicationSearch;
