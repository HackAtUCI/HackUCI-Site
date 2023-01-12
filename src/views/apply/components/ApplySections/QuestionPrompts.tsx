import {
	FormSectionProps,
	QuestionPromptsTypes,
} from "../utils/ApplicationInterfaces";
import { FieldInputGroup } from "../utils/InputComponents";

function QuestionPrompts({
	errors,
	touched,
}: Pick<FormSectionProps<QuestionPromptsTypes>, "errors" | "touched">) {
	return (
		<div>
			<h3>Short Answer Questions</h3>
			<FieldInputGroup
				name="stress_relief_question"
				label="If you're running into trouble with a programming project, what would you do to relieve your stress? [Optional]"
				controlId="formPrompt1"
				placeholder=""
				isTouched={touched.stress_relief_question}
				errorMsg={errors.stress_relief_question}
				isTextArea={true}
			/>
			<FieldInputGroup
				name="company_specialize_question"
				label="Suppose you're starting a tech company. What would your company
				specialize in? (Try to come up with a unique product or service)
				[Recommended 150 words. No word limit]"
				controlId="formPrompt2"
				placeholder=""
				isTouched={touched.company_specialize_question}
				errorMsg={errors.company_specialize_question}
				isTextArea={true}
			/>
		</div>
	);
}

export default QuestionPrompts;
