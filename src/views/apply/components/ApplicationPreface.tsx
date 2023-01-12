import { Button } from "react-bootstrap";

interface ApplicationPrefaceProps {
	isLoggedIn: boolean;
	setAcceptedPreface: Function;
}

function ApplicationPreface(props: ApplicationPrefaceProps) {
	return (
		<div>
			<h2>Application Preface</h2>
			<p>
				I acknowledge that I am student currently enrolled in a US accredited
				college or university who will be over the age of 18 by February 3rd,
				2023. By filling out an application for HackUCI 2023, I understand that
				HackUCI will take place in-person during the day from February 3rd to
				5th, and that HackUCI will not be providing transportation or overnight
				accommodations. In addition, I understand that I must check-in at
				certain times on all three event days in order to be eligible to win
				prizes.
			</p>
			{props.isLoggedIn ? (
				<Button
					variant="primary"
					className="button"
					onClick={() => {
						props.setAcceptedPreface(true);
					}}
				>
					Continue
				</Button>
			) : (
				<Button variant="primary" className="button" href="/login">
					Log In
				</Button>
			)}
		</div>
	);
}

export default ApplicationPreface;
