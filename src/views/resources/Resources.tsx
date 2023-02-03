import Head from "next/head";
import Image from "next/image";

import resources from "assets/data/resources.json";

import aiML from "assets/icons/ai-ml.svg";
import backend from "assets/icons/backend.svg";
import database from "assets/icons/database-fill.svg";
import deploy from "assets/icons/deploy.svg";
import userInterface from "assets/icons/display.svg";
import gaming from "assets/icons/gaming.svg";
import tools from "assets/icons/tools.svg";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Resource from "./Resource/Resource";

import { TitleBanner } from "components";

interface IndexMapValue {
	svg: any;
	color: string;
}

interface IndexMap {
	[key: string]: IndexMapValue;
}

const RESOURCE_INDEX_MAP: IndexMap = {
	"User Interface": { svg: userInterface, color: "gold" } as IndexMapValue,
	"Backend": { svg: backend, color: "blue" } as IndexMapValue,
	"Databases": { svg: database, color: "gold" } as IndexMapValue,
	"Deployment": { svg: deploy, color: "blue" } as IndexMapValue,
	"Gaming": { svg: gaming, color: "gold" } as IndexMapValue,
	"AI / Machine Learning": { svg: aiML, color: "blue" } as IndexMapValue,
	"General Resources": { svg: tools, color: "gold" } as IndexMapValue,
};

function Resources() {
	return (
		<Container>
			<Head>
				<title>Resources | Hack at UCI 2023</title>
			</Head>
			<TitleBanner>
				<h1>Resources</h1>
			</TitleBanner>

			{resources.map((category) => (
				<Card className="p-5 mb-5" key={category.name}>
					<Row className="align-items-center">
						<Col md={7}>
							<Image
								src={RESOURCE_INDEX_MAP[category.name].svg}
								width="75"
								height="75"
								alt="resource icon"
							/>
							<h2>{category.name}</h2>
							<p>{category.description}</p>
						</Col>
						<Col md={5}>
							{category.resources.map((resource) => (
								<Resource
									resourceIndex={RESOURCE_INDEX_MAP[category.name].color}
									key={resource.name}
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
