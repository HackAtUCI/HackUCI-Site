import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import {
	ApplicationData,
	ApplicationQuestion,
} from "admin/utils/useApplicants";

interface ApplicationResponseProps {
	value: string | boolean | string[] | null;
}

function ApplicationResponse({ value }: ApplicationResponseProps) {
	if (value === null) {
		return <p>Not provided</p>;
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
					{value.map((v) => (
						<li key={v}>{v}</li>
					))}
				</ul>
			);
		default:
			return <p />;
	}
}

interface ApplicationSectionProps {
	title: string;
	data: ApplicationData;
	propsToShow: ApplicationQuestion[];
}

function ApplicationSection({
	title,
	data,
	propsToShow,
}: ApplicationSectionProps) {
	return (
		<div className="mb-5">
			<Card.Subtitle as="h3">{title}</Card.Subtitle>
			<Card.Text as={Row}>
				{propsToShow.map((prop, index) => {
					return (
						<Col key={index} sm="6" md={propsToShow.length < 3 ? "6" : "4"}>
							<h4>
								{prop
									.split("_")
									.map((str) => str.charAt(0).toUpperCase() + str.substring(1))
									.join(" ")}
							</h4>
							<ApplicationResponse value={data[prop]} />
						</Col>
					);
				})}
			</Card.Text>
		</div>
	);
}

export default ApplicationSection;
