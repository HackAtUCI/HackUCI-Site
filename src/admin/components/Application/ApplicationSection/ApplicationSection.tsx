import { ReactElement } from "react";
import { Col, Row } from "react-bootstrap";

import { Applicant } from "admin/views/applications/Applications";

interface ApplicationSectionProps {
	title: string;
	data: Applicant;
	propsToShow: Array<string>;
}

function generateElement(data: Applicant, prop: string): ReactElement {
	const value = data[prop as keyof Applicant];
	if (!value) {
		return <p>Not Provided</p>;
	}

	switch (typeof value) {
		case "boolean":
			return <p>{value ? "Yes" : "No"}</p>;
		case "string":
			if (value.startsWith("http")) {
				return (
					<p>
						<a href={value} target="_blank" rel="noopener noreferrer">
							{value}
						</a>
					</p>
				);
			}
			return <p>{value}</p>;
		case "object":
			return (
				<ul>
					{value.map((v, i) => (
						<li key={i}>{v}</li>
					))}
				</ul>
			);
		default:
			return <p />;
	}
}

function ApplicationSection({
	title,
	data,
	propsToShow,
}: ApplicationSectionProps) {
	return (
		<div className="mb-5">
			<h2>{title}</h2>
			<Row>
				{propsToShow.map((prop, index) => {
					const element = generateElement(data, prop);
					return (
						<Col key={index} lg="6">
							<h3>
								{prop
									.split("_")
									.map((str) => str.charAt(0).toUpperCase() + str.substring(1))
									.join(" ")}
							</h3>
							{element}
						</Col>
					);
				})}
			</Row>
		</div>
	);
}

export default ApplicationSection;
