import benchImage from 'assets/images/bench_and_viewers.svg';
import TextPanel from 'components/TextPanel/TextPanel';
import Image from 'next/image';
import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './Landing.module.scss';


function Landing() {
	const panelContent = <div>
		<div className={styles.homeDate}>Feburary 3 - 5, 2023</div>
		<div className={styles.homeHeading}>HackUCI</div>

		<div className={styles.homeButtons}>
			<Button className="btn-museum btn-landing" href="#">Apply as a Hacker</Button>
			<Button className="btn-museum btn-landing" href="#">Apply as a Mentor</Button>
		</div>
	</div>;

	return (
		<section className={styles.homeLanding}>
			<TextPanel props={panelContent} />
			<div className={styles.homeBenches}>
				<Image src={benchImage} alt="Landing Benches" className={styles.homeBenchImage} />
			</div>
		</section>
	);
}

export default Landing;