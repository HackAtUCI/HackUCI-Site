import { Button } from "react-bootstrap";

interface ApplicationPrefaceProps {
	isLoggedIn: boolean;
	setAcceptedPreface: (b: boolean) => void;
}

function ApplicationPreface(props: ApplicationPrefaceProps) {
	return (
		<div>
			<h2>Application Preface</h2>
			<p>
				By filling out an application for HackUCI 2023, I understand that
				HackUCI will take place in-person during the day from February 3rd to
				5th, and that HackUCI will not be providing transportation or overnight
				accommodations. In addition, I understand that I must check-in at
				certain times on all three event days in order to be eligible to win
				prizes. Lastly, I acknowledge that I am student currently enrolled in a
				US accredited college or university who will be over the age of 18 by
				February 3rd, 2023.
			</p>
			<p>
				<strong>Applications are due on January 25, 2023 at 11:59 PM.</strong>
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
					Log In To Apply
				</Button>
			)}
			<p style={{ marginTop: "1vh" }}>
				Interested in helping out instead? Consider applying to be a{" "}
				<a href="https://forms.gle/tcnikpj5gHnGPNvx7">mentor</a> or a{" "}
				<a href="https://forms.gle/bLw9nHffqoz4kAGR7">volunteer</a>.
			</p>
		</div>
	);
}

export default ApplicationPreface;
