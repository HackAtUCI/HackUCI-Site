import axios from "axios";
import { Formik, FormikHelpers } from "formik";
import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import {
	BasicInformation,
	QuestionPrompts,
	SchoolInformation,
	SocialInformation,
} from "./ApplySections";
import { FormValuesType } from "./utils/ApplicationInterfaces";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const APPLY_PATH = "/api/user/apply";

const initialValues: FormValuesType = {
	first_name: "",
	last_name: "",
	email: "",
	gender: "",
	pronouns: [] as string[],
	other_pronouns: "",
	ethnicity: "",
	other_ethnicity: "",
	is_18_older: "",
	education_level: "",
	university: "",
	other_school_name: "",
	major: "",
	is_first_hackathon: "",
	portfolio_link: "",
	linkedin_link: "",
	resume: undefined,
	stress_relief_question: "",
	company_specialize_question: "",
};

const validationSchema = yup.object({
	first_name: yup.string().required("Please enter your first name"),
	last_name: yup.string().required("Please enter your last name"),
	email: yup
		.string()
		.required("Please enter your email")
		.matches(EMAIL_REGEX, "Sorry, the email address is not valid."),
	gender: yup
		.string()
		.required("Please select your gender from the given options"),
	pronouns: yup
		.array()
		.min(1, "Please select at least one of the following pronouns"),
	other_pronouns: yup.string().when("pronouns", {
		is: (pronouns: Array<string>) => pronouns.includes("Other"),
		then: yup
			.string()
			.required("Please enter your other pronouns since you put 'Other'."),
		otherwise: yup.string().notRequired(),
	}),
	ethnicity: yup
		.string()
		.required("Please select one of the following options for your ethnicity"),
	other_ethnicity: yup.string().when("ethnicity", {
		is: (ethnicity: string) => ethnicity === "Other",
		then: yup
			.string()
			.required("Please enter your ethnicity since you put 'Other'."),
		otherwise: yup.string().notRequired(),
	}),
	is_18_older: yup
		.string()
		.required("Please answer the age validity question."),
	education_level: yup.string().required("Please choose an education level"),
	university: yup
		.string()
		.required(
			"Please choose one of the following schools you are currently attending"
		),
	other_school_name: yup.string().when("university", {
		is: (university: string) => university === "Other",
		then: yup
			.string()
			.required("Please enter your university name since you put 'Other'."),
		otherwise: yup.string().notRequired(),
	}),
	major: yup.string().required("Please enter your current major"),
	is_first_hackathon: yup
		.string()
		.required("Please let us know if this is your first hackathon."),
	portfolio_link: yup.string().url("Please enter a valid URL."),
	linkedin_link: yup.string().url("Please enter a valid URL."),
	resume: yup
		.mixed()
		.test(
			"file-size",
			"The file is too large. Please choose a smaller file.",
			(value) => !value || (value && value.size <= 500000)
		),
	company_specialize_question: yup
		.string()
		.required("Please answer this prompt."),
});

function ApplicationForm() {
	const formRef = useRef<HTMLFormElement>(null);

	const handleSubmit = (
		values: FormValuesType,
		{ setSubmitting }: FormikHelpers<FormValuesType>
	): void => {
		formRef.current?.focus();
		const form = formRef.current !== null ? formRef.current : undefined;
		const formData = new FormData(form);

		if (values.pronouns.includes("Other")) {
			formData.delete("pronouns");
			formData.delete("other_pronouns");
			const pronounsChosen = values.pronouns
				.filter((p) => p !== "Other")
				.concat([values.other_pronouns]);
			for (const pronoun of pronounsChosen) {
				formData.append("pronouns", pronoun);
			}
		}
		if (values.ethnicity === "Other") {
			formData.set("ethnicity", values.other_ethnicity);
			formData.delete("other_ethnicity");
		}
		if (values.university === "Other") {
			formData.set("university", values.other_school_name);
			formData.delete("other_school_name");
		}

		axios
			.postForm(APPLY_PATH, formData)
			.then((res) => {
				if (res.status === 201) {
					console.log("Switched to new view");
				}
			})
			.catch(() => {
				toast.error("Application failed to submit. Please try again.", {
					position: toast.POSITION.BOTTOM_RIGHT,
				});
				setSubmitting(false);
			});
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({
				values,
				touched,
				errors,
				setFieldValue,
				handleSubmit,
				isSubmitting,
				submitCount,
			}) => (
				<Form id="applicationForm" onSubmit={handleSubmit} ref={formRef}>
					<h2
						className={(Object.keys(errors).length !== 0 && "is-invalid") || ""}
					>
						HackUCI 2023 Application
					</h2>
					<BasicInformation values={values} errors={errors} touched={touched} />
					<SchoolInformation
						values={values}
						errors={errors}
						touched={touched}
					/>
					<SocialInformation
						values={values}
						errors={errors}
						touched={touched}
						setFieldValue={setFieldValue}
					/>
					<QuestionPrompts errors={errors} touched={touched} />
					<Button
						variant="primary"
						type="submit"
						className="button"
						disabled={isSubmitting}
					>
						Submit
					</Button>
					<Form.Control.Feedback type="invalid" hidden={submitCount === 0}>
						Please fill in the required fields.
					</Form.Control.Feedback>
					<ToastContainer />
				</Form>
			)}
		</Formik>
	);
}

export default ApplicationForm;
