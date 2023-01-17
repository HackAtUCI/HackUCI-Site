import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import Application from "admin/components/Application/Application";
import ApplicationSearch from "admin/components/ApplicationSearch/ApplicationSearch";
import styles from "./Applications.module.scss";

// Applicant stores an applicant's responses
export interface Applicant {
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	pronouns: Array<string>;
	ethnicity: string;
	is_18_older: boolean;
	university: string;
	education_level: string;
	major: string;
	is_first_hackathon: boolean;
	portfolio_link: string | null;
	linkedin_link: string | null;
	stress_relief_question: string;
	company_specialize_question: string;
	resume_url: string;
	submission_time: string;
}

// SidebarDisplay stores an applicant's name and string. This will be used
// to display search results for applicants (formatted as name and status)
// in the admin portal.
export interface SidebarDisplay {
	name: string;
	status: Status;
}

export enum Status {
	accepted,
	rejected,
	waitlisted,
	pending,
}

interface User {
	_id: string;
	guest_auth?: object;
	application_data: Applicant;
	role: string;
	status: string;
}

function Applications() {
	const [userDisplayed, setUserDisplayed] = useState<number>(0);
	const [sidebarInfo, setSidebarInfo] = useState<SidebarDisplay[]>([
		{
			name: "Peter Anteater",
			status: Status.pending,
		},
	]);
	const [applications, setApplications] = useState<Applicant[]>([
		{
			first_name: "Peter",
			last_name: "Anteater",
			email: "panteater@uci.edu",
			gender: "Male",
			pronouns: ["he/him/his"],
			ethnicity: "Anteater",
			is_18_older: true,
			university: "UC Irvine",
			education_level: "Alumni",
			major: "Mascot",
			is_first_hackathon: false,
			portfolio_link: "https://github.com/samderanova",
			linkedin_link: "https://linkedin.com/in/sam-der",
			stress_relief_question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
				sed do eiusmod tempor incididunt ut labore et dolore magna \
				aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
				ullamco laboris nisi ut aliquip ex ea commodo consequat. \
				Duis aute irure dolor in reprehenderit in voluptate velit \
				esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \
				occaecat cupidatat non proident, sunt in culpa qui officia \
				deserunt mollit anim id est laborum.",
			company_specialize_question:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit, \
				sed do eiusmod tempor incididunt ut labore et dolore magna \
				aliqua. Ut enim ad minim veniam, quis nostrud exercitation \
				ullamco laboris nisi ut aliquip ex ea commodo consequat. \
				Duis aute irure dolor in reprehenderit in voluptate velit \
				esse cillum dolore eu fugiat nulla pariatur. Excepteur sint \
				occaecat cupidatat non proident, sunt in culpa qui officia \
				deserunt mollit anim id est laborum.",
			resume_url: "",
			submission_time: "now",
		},
	]);

	useEffect(() => {
		const getUsers = async () => {
			const res = await axios.get<User[]>("/api/admin/applicants");
			setApplications(res.data.map((app) => app["application_data"]));
			setSidebarInfo(
				res.data.map((app) => {
					const name =
						app["application_data"].first_name +
						" " +
						app["application_data"].last_name;
					let status;
					switch (app["status"]) {
						case "ACCEPTED":
							status = Status.accepted;
							break;
						case "REJECTED":
							status = Status.rejected;
							break;
						case "WAITLISTED":
							status = Status.waitlisted;
							break;
						default:
							status = Status.pending;
					}
					return { name, status };
				})
			);
		};
		getUsers();
	}, []);

	return (
		<>
			<h1>Applications</h1>
			<Row className={styles["application-review"] + " " + "mt-5 px-5"}>
				<Col md="3">
					<ApplicationSearch data={sidebarInfo} setUser={setUserDisplayed} />
				</Col>
				<Col className={styles["application-side"]}>
					<Application applicant={applications[userDisplayed]} />
				</Col>
			</Row>
		</>
	);
}

export default Applications;
