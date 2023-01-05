import { Row } from "react-bootstrap";
import {
	FormSectionProps,
	SocialInformationTypes,
} from "../ApplicationInterfaces";
import { FieldFileUploadGroup, FieldInputGroup } from "./InputComponents";

function SocialInformation({
	values,
	errors,
	touched,
	setFieldValue,
}: Pick<
	FormSectionProps<SocialInformationTypes>,
	"values" | "errors" | "touched" | "setFieldValue"
>) {
	return (
		<div>
			<h3>Social Information (Optional)</h3>
			<Row className="mb-3">
				<FieldInputGroup
					name="portfolioLink"
					label="Github/Portfolio Link"
					controlId="formPortfolio"
					isTouched={touched.portfolioLink}
					errorMsg={errors.portfolioLink}
					className="col-12 col-sm-6 col-lg-4"
				/>
				<FieldInputGroup
					name="linkedInLink"
					label="LinkedIn Link"
					controlId="formPortfolio"
					isTouched={touched.linkedInLink}
					errorMsg={errors.linkedInLink}
					className="col-12 col-sm-6 col-lg-4"
				/>
				<FieldFileUploadGroup
					name="resume"
					label="Resume (*.pdf)"
					controlId="formResume"
					isTouched={values.resume !== undefined}
					errorMsg={errors.resume}
					setFieldValue={setFieldValue}
					accept=".pdf"
					className="col-12 col-sm-12 col-lg-4"
				/>
			</Row>
		</div>
	);
}

export default SocialInformation;
