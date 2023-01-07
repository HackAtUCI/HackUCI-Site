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
			<h3>Question Prompts</h3>
			<FieldInputGroup
				name="stressReliefQuestion"
				label="If you're running into trouble with a programming project, what would you do to relieve your stress? [Optional]"
				controlId="formPrompt1"
				placeholder=""
				isTouched={touched.stressReliefQuestion}
				errorMsg={errors.stressReliefQuestion}
				isTextArea={true}
			/>
			<FieldInputGroup
				name="companySpecializeQuestion"
				label="Suppose you're starting a tech company. What would your company
				specialize in? (Try to come up with a unique product or service)
				[Recommended 150 words. No word limit]"
				controlId="formPrompt2"
				placeholder=""
				isTouched={touched.companySpecializeQuestion}
				errorMsg={errors.companySpecializeQuestion}
				isTextArea={true}
			/>
		</div>
	);
}

export default QuestionPrompts;
