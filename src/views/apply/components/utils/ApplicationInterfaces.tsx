import { FormikErrors, FormikTouched } from "formik";
export interface FormSectionProps<ValueTypes> {
	values: ValueTypes;
	errors: FormikErrors<ValueTypes>;
	touched: FormikTouched<ValueTypes>;
	setFieldValue: (
		field: string,
		value?: File,
		shouldValidate?: boolean | undefined
	) => void;
}

export interface BasicInformationTypes {
	firstName: string;
	lastName: string;
	email: string;
	gender: string;
	pronouns: string[];
	otherPronouns: string;
	ethnicity: string;
	otherEthnicity: string;
	ageValid: string;
}

export interface SchoolInformationTypes {
	ageValid: string;
	educationLevel: string;
	schoolName: string;
	otherSchoolName: string;
	major: string;
	firstHack: string;
}

export interface SocialInformationTypes {
	portfolioLink?: string;
	linkedInLink?: string;
	resume?: File;
}

export interface QuestionPromptsTypes {
	stressReliefQuestion: string;
	companySpecializeQuestion: string;
}
export interface FormValuesType
	extends BasicInformationTypes,
		SchoolInformationTypes,
		SocialInformationTypes,
		QuestionPromptsTypes {}
