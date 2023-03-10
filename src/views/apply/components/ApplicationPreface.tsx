import { Button } from "react-bootstrap";

interface ApplicationPrefaceProps {
	isLoggedIn: boolean;
	setAcceptedPreface: (b: boolean) => void;
}

function ApplicationPreface(props: ApplicationPrefaceProps) {
	return (
		<div>
			<h2>Before Applying</h2>
			<p>
				By submitting an application for Hack at UCI 2023, I understand that
				Hack at UCI will take place in person during the day from February 3rd
				to 5th, and that Hack at UCI will not be providing transportation or
				overnight accommodations. In addition, I understand that I must check in
				at certain times on all three event days in order to be eligible to win
				prizes. Lastly, I acknowledge that I am currently a student enrolled in
				an accredited college or university in the United States and will be
				over the age of 18 by February 3rd, 2023.
			</p>
			<p>
				<s aria-hidden>Applications are due on January 25, 2023 at 11:59 PM.</s>
				<br />
				<strong>Applications are due on January 28, 2023 at 11:59 PM.</strong>
			</p>
			{props.isLoggedIn ? (
				<Button
					variant="museum"
					className="button"
					onClick={() => {
						props.setAcceptedPreface(true);
					}}
				>
					Continue
				</Button>
			) : (
				<Button variant="museum" className="button" href="/login">
					Log In To Apply
				</Button>
			)}
			<hr className="mt-5" />
			<small className="text-secondary">
				Interested in helping out instead? Consider applying to be a{" "}
				<a href="/mentor">mentor</a> or a <a href="/volunteer">volunteer</a>.
			</small>
		</div>
	);
}

export default ApplicationPreface;
