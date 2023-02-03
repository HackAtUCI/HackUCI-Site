import Image from "next/image";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

import sponsors from "assets/data/sponsors.json";
import logo_stickerMule from "assets/sponsors/sticker-mule-logo-light-bg-stacked.svg";
import logo_cockroach from "assets/sponsors/cockroach_labs.svg";
import logo_costar from "assets/sponsors/costar_group.svg";
import logo_googleCloud from "assets/sponsors/google_cloud.svg";
import logo_mobilityWare from "assets/sponsors/mobilityware.svg";
import logo_pimco from "assets/sponsors/pimco.svg";
import logo_twilio from "assets/sponsors/twilio.svg";
import logo_wayup from "assets/sponsors/wayup.svg";

import styles from "./Sponsors.module.scss";

enum SponsorSize {
	LARGE = "large",
	MEDIUM = "medium",
	SMALL = "small",
}

interface SponsorItemProps {
	name: string;
	src: string;
	url: string;
	size: SponsorSize;
	bg?: string;
}

function SponsorItem({ name, src, url, bg, size }: SponsorItemProps) {
	let width, height;
	let cardDimensions;
	switch (size) {
		case SponsorSize.SMALL:
			width = 200;
			cardDimensions = 250;
			break;
		case SponsorSize.MEDIUM:
			width = 250;
			cardDimensions = 300;
			break;
		default:
			width = 300;
			cardDimensions = 350;
			break;
	}
	return (
		<Card
			className={styles.card + " p-0 m-0"}
			style={{ minWidth: cardDimensions, minHeight: cardDimensions }}
		>
			<a href={url}>
				<Image
					src={src}
					alt={name}
					className={styles.tierImage}
					style={{ backgroundColor: bg }}
					width={width}
					height={height}
				/>
			</a>
		</Card>
	);
}

function Sponsors() {
	const largeTiers = [logo_costar];
	const mediumTiers = [logo_pimco, logo_cockroach];
	const smallTiers = [
		logo_twilio,
		logo_mobilityWare,
		logo_wayup,
		logo_googleCloud,
		logo_stickerMule,
	];

	return (
		<section id="sponsors" className="container">
			<h2>Sponsors</h2>
			<p className="text-center mb-5 px-5">
				Interested in sponsoring HackUCI 2023? Check out our information above
				to learn more about our event! For additional inquiries, please email us
				at&nbsp;
				<a href="mailto:hack@uci.edu" className={styles.sponsorLink}>
					hack@uci.edu
				</a>
				.
			</p>

			<Row className="my-5 align-items-center">
				{sponsors["largeTier"].map((sponsor, index) => (
					<Col key={`large-tier-${index}`} className={styles.column + " my-3"}>
						<SponsorItem
							key={`large-tier-${index}`}
							{...sponsor}
							src={largeTiers[index]}
							size={SponsorSize.LARGE}
						/>
					</Col>
				))}
			</Row>

			<Row
				className="my-5 align-items-center gx-0 p-0 mx-auto"
				style={{ width: "60%" }}
			>
				{sponsors["mediumTier"].map((sponsor, index) => (
					<Col key={`medium-tier-${index}`} className={styles.column + " my-3"}>
						<SponsorItem
							key={`medium-tier-${index}`}
							{...sponsor}
							src={mediumTiers[index]}
							size={SponsorSize.MEDIUM}
						/>
					</Col>
				))}
			</Row>

			<Row className="my-5 align-items-center gx-0">
				{sponsors["smallTier"].map((sponsor, index) => (
					<Col key={`small-tier-${index}`} className={styles.column + " my-3"}>
						<SponsorItem
							key={`small-tier-${index}`}
							{...sponsor}
							src={smallTiers[index]}
							size={SponsorSize.SMALL}
						/>
					</Col>
				))}
			</Row>
		</section>
	);
}

export default Sponsors;
