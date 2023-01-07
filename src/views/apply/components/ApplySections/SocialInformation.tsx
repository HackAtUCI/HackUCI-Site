import { Row } from "react-bootstrap";
import {
	FormSectionProps,
	SocialInformationTypes,
} from "../utils/ApplicationInterfaces";
import {
	FieldFileUploadGroup,
	FieldInputGroup,
} from "../utils/InputComponents";

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
					sm={6}
					lg={4}
				/>
				<FieldInputGroup
					name="linkedInLink"
					label="LinkedIn Link"
					controlId="formLinkedIn"
					isTouched={touched.linkedInLink}
					errorMsg={errors.linkedInLink}
					sm={6}
					lg={4}
				/>
				<FieldFileUploadGroup
					name="resume"
					label="Resume (*.pdf)"
					controlId="formResume"
					isTouched={values.resume !== undefined}
					errorMsg={errors.resume}
					setFieldValue={setFieldValue}
					accept=".pdf"
					sm={12}
					lg={4}
				/>
			</Row>
		</div>
	);
}

export default SocialInformation;
