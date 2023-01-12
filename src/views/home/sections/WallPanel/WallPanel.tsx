import Container from "react-bootstrap/Container";
import styles from "./WallPanel.module.scss";

function WallPanel() {
	return (
		<Container className={styles["container"]} as="section">
			<div className={styles["intro-section"]}>
				<h3>
					<span className={styles["number"]}>36</span> Hours
				</h3>
				<h3>
					<span className={styles["number"]}>400+</span> Attendees
				</h3>
				<h3>
					<span className={styles["number"]}>$5,000</span> in Prizes
				</h3>
				<h4>Create + Connect + Inspire</h4>
				<p>
					HackUCI is the largest collegiate hackathon in Orange County and we
					continue expanding and improving our event every year. Our focus? -
					Enhance the community around us by giving students the platform to
					unleash their creativity in an environment of forward thinking
					individuals.
				</p>
				<p>
					This year, HackUCI will take place the weekend of February 3rd to 5th.
					The event will be 100% in-person during the day (
					<a href="#faq" style={{ color: "white" }}>
						not overnight
					</a>
					). Free workshops, socials, food, and swag will be provided!
				</p>
			</div>
		</Container>
	);
}

export default WallPanel;
