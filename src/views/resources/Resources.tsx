import Head from "next/head";
import resources from "assets/data/resources.json";
import aiML from "assets/icons/ai-ml.svg";
import backend from "assets/icons/backend.svg";
import database from "assets/icons/database-fill.svg";
import deploy from "assets/icons/deploy.svg";
import userInterface from "assets/icons/display.svg";
import gaming from "assets/icons/gaming.svg";
import tools from "assets/icons/tools.svg";
import { TitleBanner } from "components";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Resource from "./Resource/Resource";

const RESOURCE_INDEX_MAP = [
	userInterface,
	backend,
	database,
	deploy,
	gaming,
	aiML,
	tools,
];

function Resources() {
	return (
		<Container>
			<Head>
				<title>Resources | Hack at UCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Resources</h1>
			</TitleBanner>

			{resources.map((category, index) => (
				<Card className="p-5 mb-5" key={index}>
					<Row className="align-items-center">
						<Col md={7}>
							<Image
								src={RESOURCE_INDEX_MAP[index]}
								width="75"
								height="75"
								alt="resource icon"
							/>
							<h2>{category.name}</h2>
							<p>{category.description}</p>
						</Col>
						<Col md={5}>
							{category.resources.map((resource, rIndex) => (
								<Resource
									resourceIndex={index}
									key={rIndex}
									name={resource.name}
									link={resource.link}
									tooltip={resource.tooltip}
								/>
							))}
						</Col>
					</Row>
				</Card>
			))}
		</Container>
	);
}

export default Resources;
