import Image from "next/image";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import mentorStatue from "assets/images/mentor_statue.svg";
import volunteerStatue from "assets/images/volunteer_statue.svg";

import styles from "./MentorsVolunteers.module.scss";

function MentorsVolunteers() {
	return (
		<Row>
			<Col>
				<div className={styles.statueContainer}>
					<Image src={mentorStatue} alt="HackUCI Mentor Statue" />
					<h3 className={styles.statueTitle}>Apply to be a Mentor</h3>
					<div className={styles.statueCube}>
						<div className={`${styles.cubeSide} ${styles.cubeTop}`} />
						<div className={`${styles.cubeSide} ${styles.cubeLeft}`} />
						<div
							className={`${styles.cubeSide} ${styles.cubeFront} ${styles.statueDescription}`}
						>
							<p>
								Have a knack for innovation? Interested in inspiring the next
								generation of developers? Our mentors are vital to making
								HackUCI 2023 successful and enjoyable for our hackers. Apply to
								be a mentor today!
							</p>
							<Button
								variant="museum"
								href="https://forms.gle/tcnikpj5gHnGPNvx7"
								target="_blank"
								rel="noreferrer noopener"
							>
								Mentor Application
							</Button>
						</div>
					</div>
				</div>
			</Col>
			<Col>
				<div className={styles.statueContainer}>
					<Image src={volunteerStatue} alt="HackUCI Volunteer Statue" />
					<h3 className={styles.statueTitle}>Become a Volunteer</h3>
					<div className={styles.statueCube}>
						<div className={`${styles.cubeSide} ${styles.cubeTop}`} />
						<div className={`${styles.cubeSide} ${styles.cubeLeft}`} />
						<div
							className={`${styles.cubeSide} ${styles.cubeFront} ${styles.statueDescription}`}
						>
							<p>
								Want a peek behind the scenes? Join our team of event volunteers
								that make HackUCI run as smoothly as possible! Many roles are
								available and shifts are flexible. Plus, get access to all the
								free food and all our hackathon swag. We hope to see you on the
								team!
							</p>
							<Button
								variant="museum"
								href="https://forms.gle/bLw9nHffqoz4kAGR7"
								target="_blank"
								rel="noreferrer noopener"
							>
								Volunteer Form
							</Button>
						</div>
					</div>
				</div>
			</Col>
		</Row>
	);
}

export default MentorsVolunteers;
