import Image from "next/image";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import benchImage from "assets/images/bench_and_viewers.svg";
import { TitleBanner } from "components";

import styles from "./Landing.module.scss";

function Landing() {
	const hackerApplyButton = (
		<Button variant="museum" className={styles.btnLanding} href="/apply">
			Apply as a Hacker
		</Button>
	);
	const mentorApplyButton = (
		<Button variant="museum" className={styles.btnLanding} href="/mentor">
			Apply as a Mentor
		</Button>
	);

	return (
		<section className={styles.homeLanding}>
			<TitleBanner className={styles.homeBanner}>
				<div className="d-flex flex-column-reverse">
					<h1>Hack at UCI</h1>
					<span className={styles.landingDate}>February 3 &ndash; 5, 2023</span>
				</div>

				<Row className={styles.homeButtons}>
					<Col md="auto">{hackerApplyButton}</Col>
					<Col md="auto">{mentorApplyButton}</Col>
				</Row>
			</TitleBanner>
			<Image
				src={benchImage}
				alt="Two Anteaters sitting on a bench and admiring the gallery of artwork"
				className={styles.landingBench}
			/>
		</section>
	);
}

export default Landing;
