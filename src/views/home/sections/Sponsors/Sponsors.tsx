import Image from "next/image";
import Link from "next/link";

import { Col, Row } from "react-bootstrap";

import sponsors from "assets/data/sponsors.json";

import styles from "./Sponsors.module.scss";

import stickerMule from "assets/sponsors/sticker_mule.svg";

function SponsorItem(props: any) {
	return (
		<Link href={props.data.url}>
			<Image
				src={props.src}
				alt={props.name}
				className={styles.smallTierImage}
			/>
		</Link>
	);
}

function Sponsors() {
	// Temporary workaround
	const stickermule = sponsors.smallTier[4];

	return (
		<section id="sponsors" className="container">
			<h2 className="text-center">Sponsors</h2>
			<p className={styles.sponsorInfo}>
				Interested in sponsoring HackUCI 2023? Check out our information above
				to learn more about our event! For more information, please email us at
				hack@uci.edu.
			</p>
			<Row className={styles.smallTier}>
				<Col className={styles.column}>
					<SponsorItem data={stickermule} src={stickerMule} />
				</Col>
			</Row>
			<h3 className="text-center">...and more to come!</h3>
		</section>
	);
}

export default Sponsors;
