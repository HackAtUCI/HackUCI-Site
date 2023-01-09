import { Row } from "react-bootstrap";
import {
	FormSectionProps,
	SchoolInformationTypes,
} from "../utils/ApplicationInterfaces";
import {
	FieldInputGroup,
	FieldSelectGroup,
	FieldYesNoRadioGroup,
} from "../utils/InputComponents";

const educationLevelList = [
	"First Year Undergraduate",
	"Second Year Undergraduate",
	"Third Year Undergraduate",
	"Fourth Year Undergraduate",
	"Fifth+ Year Undergraduate",
	"Graduate",
];
const schoolList = [
	"UC Irvine",
	"UC San Diego",
	"UCLA",
	"UC Berkeley",
	"Cal State Long Beach",
	"Cal State Fullerton",
	"Cal Poly Pomona",
	"UC Riverside",
	"UC Santa Barbara",
	"Other",
];

function SchoolInformation({
	values,
	errors,
	touched,
}: Pick<
	FormSectionProps<SchoolInformationTypes>,
	"values" | "errors" | "touched"
>) {
	return (
		<div>
			<h3>School Information</h3>
			<Row>
				<FieldSelectGroup
					name="university"
					label="University"
					controlId="formUniversity"
					isTouched={touched.university}
					errorMsg={errors.university}
					optionList={schoolList}
					lg={values.university === "Other" ? 6 : 12}
				/>
				{values.university === "Other" && (
					<FieldInputGroup
						name="other_school_name"
						label="If Other was selected, which university did you go to?"
						placeholder="University"
						controlId="formOtherUniversity"
						isTouched={touched.other_school_name}
						errorMsg={errors.other_school_name}
						sm={12}
						lg={6}
					/>
				)}
			</Row>
			<Row>
				<FieldSelectGroup
					name="education_level"
					label="Current Education Level"
					controlId="formEducation"
					isTouched={touched.education_level}
					errorMsg={errors.education_level}
					optionList={educationLevelList}
					md={6}
					lg={4}
				/>
				<FieldInputGroup
					name="major"
					label="Major"
					controlId="formMajor"
					isTouched={touched.major}
					errorMsg={errors.major}
					md={6}
					lg={4}
				/>
				<FieldYesNoRadioGroup
					name="is_first_hackathon"
					label="Is this your first hackathon?"
					controlId="formFirstHack"
					isTouched={touched.is_first_hackathon}
					errorMsg={errors.is_first_hackathon}
					md={12}
					lg={4}
				/>
			</Row>
		</div>
	);
}

export default SchoolInformation;
