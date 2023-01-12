import { Row } from "react-bootstrap";
import {
	BasicInformationTypes,
	FormSectionProps,
} from "../utils/ApplicationInterfaces";
import {
	FieldChecklistGroup,
	FieldInputGroup,
	FieldSelectGroup,
	FieldYesNoRadioGroup,
} from "../utils/InputComponents";

const genderOptions = [
	"Male",
	"Female",
	"Non-Binary",
	"Prefer not to answer",
	"Other",
];
const pronounOptions = [
	"He/him/his",
	"She/her/hers",
	"They/them/theirs",
	"Ze/zir/zirs",
	"Other",
];
const ethnicityOptions = [
	"American Indian or Alaskan",
	"Asian or Pacific Islander",
	"Black or African American",
	"Hispanic",
	"White or Caucasian",
	"Two or more races",
	"Prefer not to answer",
	"Other",
];

function BasicInformation({
	values,
	errors,
	touched,
}: Pick<
	FormSectionProps<BasicInformationTypes>,
	"values" | "errors" | "touched"
>) {
	return (
		<div>
			<h3>Basic Information</h3>
			<Row>
				<FieldInputGroup
					name="first_name"
					label="First Name"
					controlId="formFirstName"
					isTouched={touched.first_name}
					errorMsg={errors.first_name}
					sm={12}
					md={6}
				/>
				<FieldInputGroup
					name="last_name"
					label="Last Name"
					controlId="formLastName"
					isTouched={touched.last_name}
					errorMsg={errors.last_name}
					sm={12}
					md={6}
				/>
			</Row>
			<Row>
				<FieldInputGroup
					name="email"
					label="Email"
					controlId="formEmail"
					isTouched={touched.email}
					errorMsg={errors.email}
				/>
			</Row>
			<Row>
				<FieldSelectGroup
					name="gender"
					label="Gender"
					controlId="formGender"
					isTouched={touched.gender}
					errorMsg={errors.gender}
					optionList={genderOptions}
					sm={12}
					md={values.pronouns.includes("Other") ? 4 : 6}
				/>
				<FieldChecklistGroup
					name="pronouns"
					label="Pronouns"
					controlId="formPronouns"
					isTouched={touched.pronouns}
					errorMsg={errors.pronouns}
					optionList={pronounOptions}
					sm={values.pronouns.includes("Other") ? 6 : 12}
					md={values.pronouns.includes("Other") ? 4 : 6}
				/>
				{values.pronouns.includes("Other") && (
					<FieldInputGroup
						name="other_pronouns"
						label="If Other was selected, what are your pronouns?"
						placeholder="Pronouns"
						controlId="formOtherPronouns"
						isTouched={touched.other_pronouns}
						errorMsg={errors.other_pronouns}
						sm={6}
						md={4}
					/>
				)}
			</Row>
			<Row>
				<FieldSelectGroup
					name="ethnicity"
					label="Ethnicity"
					controlId="formEthnicity"
					isTouched={touched.ethnicity}
					errorMsg={errors.ethnicity}
					optionList={ethnicityOptions}
					sm={values.ethnicity === "Other" ? 6 : 12}
					md={values.ethnicity === "Other" ? 4 : 6}
				/>
				{values.ethnicity === "Other" && (
					<FieldInputGroup
						name="other_ethnicity"
						label="If Other was selected, what is your ethnicity?"
						placeholder="Ethnicity"
						controlId="formOtherEthnicity"
						isTouched={touched.other_ethnicity}
						errorMsg={errors.other_ethnicity}
						sm={6}
						md={4}
					/>
				)}
				<FieldYesNoRadioGroup
					name="is_18_older"
					label="Will you be 18 years or older by February 3rd, 2023?"
					controlId="formAge"
					isTouched={touched.is_18_older}
					errorMsg={errors.is_18_older}
					sm={12}
					md={values.ethnicity === "Other" ? 4 : 6}
				/>
			</Row>
		</div>
	);
}

export default BasicInformation;
