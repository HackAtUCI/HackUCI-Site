import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { Container, Form } from "react-bootstrap";
import { SidebarDisplay, Status } from "views/admin/applications/AdminHome";
import styles from "./ApplicationSearch.module.scss";
import SearchResults from "./SearchResults/SearchResults";

interface ApplicationSidebarProps {
	data: SidebarDisplay[];
	setUser: Dispatch<SetStateAction<number>>;
}

function ApplicationSearch({ data, setUser }: ApplicationSidebarProps) {
	const [displayedApplicants, setDisplayedApplicants] = useState<number[]>([]);
	const [showAccepted, setShowAccepted] = useState<boolean>(false);
	const [showRejected, setShowRejected] = useState<boolean>(false);
	const [showWaitlisted, setShowWaitlisted] = useState<boolean>(false);
	const [showPending, setShowPending] = useState<boolean>(true);

	function updateDisplayedNames(e: ChangeEvent<HTMLInputElement>): void {
		setDisplayedApplicants(
			data
				.map((_, index) => index)
				.filter((index) =>
					data[index].name.toLowerCase().includes(e.target.value.toLowerCase())
				)
		);
	}

	useEffect(() => {
		setDisplayedApplicants(
			data
				.map((_, index) => index)
				.filter((index) => {
					return (
						(showAccepted && data[index].status === Status.accepted) ||
						(showRejected && data[index].status === Status.rejected) ||
						(showWaitlisted && data[index].status === Status.waitlisted) ||
						(showPending && data[index].status === Status.pending)
					);
				})
		);
	}, [showAccepted, showRejected, showWaitlisted, showPending, data]);

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
						checked={showPending}
						onChange={() => setShowPending(!showPending)}
					/>
					<Form.Check
						id="accepted"
						label="Accepted"
						checked={showAccepted}
						onChange={() => setShowAccepted(!showAccepted)}
					/>
					<Form.Check
						id="rejected"
						label="Rejected"
						checked={showRejected}
						onChange={() => setShowRejected(!showRejected)}
					/>
					<Form.Check
						id="waitlisted"
						label="Waitlisted"
						checked={showWaitlisted}
						onChange={() => setShowWaitlisted(!showWaitlisted)}
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
