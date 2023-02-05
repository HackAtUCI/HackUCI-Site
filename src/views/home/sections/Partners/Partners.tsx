import Image, { StaticImageData } from "next/image";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import acm from "assets/partners/acm_at_uci.png";
import ai from "assets/partners/ai_uci.png";
import asuci from "assets/partners/asuci.png";
import blockchain from "assets/partners/blockchain_at_uci.png";
import data from "assets/partners/data_at_uci.png";
import design from "assets/partners/design_at_uci.png";
import icssc from "assets/partners/icssc.png";

import partners from "assets/data/partners.json";

import styles from "./Partners.module.scss";

interface PartnerInfo {
	name: string;
	website: string;
}

interface Partner {
	png: StaticImageData;
	info: PartnerInfo;
}

const PARTNERS: Partner[][] = [
	[
		{ png: acm, info: partners[0] },
		{ png: ai, info: partners[1] },
		{ png: asuci, info: partners[2] },
	],
	[
		{ png: blockchain, info: partners[3] },
		{ png: design, info: partners[4] },
		{ png: icssc, info: partners[5] },
		{ png: data, info: partners[6] },
	],
];

function Partners() {
	return (
		<Container className="p-5">
			<h2>Partners</h2>
			<p className="text-center">
				Thank you to our partners for collaborating with Hack at UCI!
			</p>

			{PARTNERS.map((row, index) => (
				<Row
					key={index}
					className="my-3 justify-content-center align-items-center"
				>
					{row.map((club, imgIndex) => (
						<Col sm key={imgIndex} className="px-5 my-3">
							<a href={club.info.website}>
								<Image
									key={imgIndex}
									src={club.png}
									className={"w-100 h-auto " + styles["hover-enlarge"]}
									alt={`${club.info.name} logo`}
								/>
							</a>
						</Col>
					))}
				</Row>
			))}
		</Container>
	);
}

export default Partners;
