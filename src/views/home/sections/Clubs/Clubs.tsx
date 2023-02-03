import Image, { StaticImageData } from "next/image";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import acm from "assets/clubs/acm_at_uci.png";
import ai from "assets/clubs/ai_uci.png";
import asuci from "assets/clubs/asuci.png";
import blockchain from "assets/clubs/blockchain_at_uci.png";
import design from "assets/clubs/design_at_uci.png";
import icssc from "assets/clubs/icssc.png";

import clubs from "assets/data/clubs.json";

import styles from "./Clubs.module.scss";

interface ClubInfo {
	name: string;
	clubWebsite: string;
}

interface Club {
	png: StaticImageData;
	info: ClubInfo;
}

const CLUBS: Club[][] = [
	[
		{ png: acm, info: clubs[0] },
		{ png: ai, info: clubs[1] },
		{ png: asuci, info: clubs[2] },
	],
	[
		{ png: blockchain, info: clubs[3] },
		{ png: design, info: clubs[4] },
		{ png: icssc, info: clubs[5] },
	],
];

function Clubs() {
	return (
		<Container className="p-5">
			<h2>Partners</h2>
			<p className="text-center">
				Thank you to our partners for hosting workshops at our events!
			</p>

			{CLUBS.map((row, index) => (
				<Row
					key={index}
					className="my-3 justify-content-center align-items-center"
				>
					{row.map((club, imgIndex) => (
						<Col key={imgIndex} className="px-5 my-3">
							<a href={club.info.clubWebsite}>
								<Image
									key={imgIndex}
									src={club.png}
									className={"px-5 w-100 h-auto " + styles["hover-enlarge"]}
									alt={`${club.info.name} club logo`}
								/>
							</a>
						</Col>
					))}
				</Row>
			))}
		</Container>
	);
}

export default Clubs;
