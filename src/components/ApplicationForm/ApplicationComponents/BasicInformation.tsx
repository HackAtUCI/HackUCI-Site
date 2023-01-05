import { Row } from "react-bootstrap";
import {
	BasicInformationTypes,
	FormSectionProps,
} from "../ApplicationInterfaces";
import {
	FieldChecklistGroup,
	FieldInputGroup,
	FieldSelectGroup,
	FieldYesNoRadioGroup,
} from "./InputComponents";

const genderList = [
	"Male",
	"Female",
	"Non-Binary",
	"Prefer not to answer",
	"Other",
];
const pronounList = [
	"He/him/his",
	"She/her/hers",
	"They/them/theirs",
	"Ze/zir/zirs",
	"Other",
];
const ethnicityList = [
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
					name="firstName"
					label="First Name"
					controlId="formFirstName"
					isTouched={touched.firstName}
					errorMsg={errors.firstName}
					className="col-12 col-sm-12 col-md-6"
				/>
				<FieldInputGroup
					name="lastName"
					label="Last Name"
					controlId="formLastName"
					isTouched={touched.lastName}
					errorMsg={errors.lastName}
					className="col-12 col-sm-12 col-md-6"
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
					optionList={genderList}
					className={
						values.pronouns.includes("Other")
							? "col-12 col-sm-12 col-md-4"
							: "col-12 col-sm-12 col-md-6"
					}
				/>
				<FieldChecklistGroup
					name="pronouns"
					label="Pronouns"
					controlId="formPronouns"
					isTouched={touched.pronouns}
					errorMsg={errors.pronouns}
					optionList={pronounList}
					className={
						values.pronouns.includes("Other")
							? "col-12 col-sm-6 col-md-4"
							: "col-12 col-sm-12 col-md-6"
					}
				/>
				{values.pronouns.includes("Other") && (
					<FieldInputGroup
						name="otherPronouns"
						label="If Other was selected, what are your pronouns?"
						placeholder="Pronouns"
						controlId="formOtherPronouns"
						isTouched={touched.otherPronouns}
						errorMsg={errors.otherPronouns}
						className="col-12 col-sm-6 col-md-4"
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
					optionList={ethnicityList}
					className={
						values.ethnicity === "Other"
							? "col-12 col-sm-6 col-md-4"
							: "col-12 col-sm-12 col-md-6"
					}
				/>
				{values.ethnicity === "Other" && (
					<FieldInputGroup
						name="otherEthnicity"
						label="If Other was selected, what is your ethnicity?"
						placeholder="Ethnicity"
						controlId="formOtherEthnicity"
						isTouched={touched.otherEthnicity}
						errorMsg={errors.otherEthnicity}
						className="col-12 col-sm-6 col-md-4"
					/>
				)}
				<FieldYesNoRadioGroup
					name="ageValid"
					label="Will you be 18 years or older by February 3rd, 2023?"
					controlId="formAge"
					isTouched={touched.ageValid}
					errorMsg={errors.ageValid}
					className={
						values.ethnicity === "Other"
							? "col-12 col-sm-12 col-md-4"
							: "col-12 col-sm-12 col-md-6"
					}
				/>
			</Row>
		</div>
	);
}

export default BasicInformation;
