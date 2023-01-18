import Image from "next/image";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import sponsors from "assets/data/sponsors.json";
import logo_stickerMule from "assets/sponsors/sticker_mule.svg";

import styles from "./Sponsors.module.scss";

interface SponsorItemProps {
	name: string;
	src: string;
	url: string;
}

function SponsorItem({ name, src, url }: SponsorItemProps) {
	return (
		<a href={url}>
			<Image src={src} alt={name} className={styles.smallTierImage} />
		</a>
	);
}

function Sponsors() {
	// Temporary workaround
	const stickerMule = sponsors.smallTier[4];

	return (
		<section id="sponsors" className="container">
			<h2>Sponsors</h2>
			<p className={styles.sponsorInfo}>
				Interested in sponsoring HackUCI 2023? Check out our information above
				to learn more about our event! For more information, please email us at
				hack@uci.edu.
			</p>
			<Row className="my-4">
				<Col className={styles.column}>
					<SponsorItem {...stickerMule} src={logo_stickerMule} />
				</Col>
			</Row>
			<p className="text-center">
				<span className="h3">...and more to come!</span>
			</p>
		</section>
	);
}

export default Sponsors;