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
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	pronouns: string[];
	other_pronouns: string;
	ethnicity: string;
	other_ethnicity: string;
	is_18_older: string;
}

export interface SchoolInformationTypes {
	is_18_older: string;
	education_level: string;
	university: string;
	other_school_name: string;
	major: string;
	is_first_hackathon: string;
}

export interface SocialInformationTypes {
	portfolio_link?: string;
	linkedin_link?: string;
	resume?: File;
}

export interface QuestionPromptsTypes {
	stress_relief_question: string;
	company_specialize_question: string;
}
export interface FormValuesType
	extends BasicInformationTypes,
		SchoolInformationTypes,
		SocialInformationTypes,
		QuestionPromptsTypes {}
