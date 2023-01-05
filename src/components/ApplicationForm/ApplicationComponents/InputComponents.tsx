import { Field } from "formik";
import { Col, Form } from "react-bootstrap";

interface TextAreaProps {
	name: string;
	isValid?: boolean;
	isInvalid?: boolean;
}

const FormikTextArea = (props: TextAreaProps) => {
	return <Form.Control as="textarea" rows={3} {...props} />;
};

interface FieldInputGroupProps {
	name: string;
	label: string;
	controlId: string;
	className?: string;
	placeholder?: string;
	isTouched?: boolean;
	errorMsg?: string | string[];
	disabled?: boolean;
	isTextArea?: boolean;
}

export const FieldInputGroup = ({
	name,
	label,
	controlId,
	className,
	placeholder,
	isTouched,
	errorMsg,
	disabled,
	isTextArea,
}: FieldInputGroupProps) => {
	return (
		<Form.Group as={Col} className={className} controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			<Field
				name={name}
				placeholder={placeholder !== undefined ? placeholder : label}
				as={isTextArea ? FormikTextArea : Form.Control}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg}
				disabled={disabled}
			/>
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};

interface FieldSelectGroupProps extends FieldInputGroupProps {
	optionList: string[];
}

export const FieldSelectGroup = ({
	name,
	label,
	controlId,
	className,
	isTouched,
	errorMsg,
	optionList,
}: FieldSelectGroupProps) => {
	return (
		<Form.Group as={Col} className={className} controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			<Field
				name={name}
				as={Form.Select}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg}
			>
				<option value="" hidden>
					- Select -
				</option>
				{optionList.map((option, index) => {
					return (
						<option key={index} id={`${name}-${option}`} value={option}>
							{option}
						</option>
					);
				})}
			</Field>
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};

export const FieldChecklistGroup = ({
	name,
	label,
	controlId,
	className,
	isTouched,
	errorMsg,
	optionList,
}: FieldSelectGroupProps) => {
	return (
		<Form.Group as={Col} className={className} controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			{optionList.map((option, index) => {
				return (
					<Field
						name={name}
						as={Form.Check}
						label={option}
						key={index}
						id={`${name}-${option}`}
						value={option}
						isValid={isTouched && !errorMsg}
						isInvalid={isTouched && errorMsg}
					/>
				);
			})}
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};

export const FieldYesNoRadioGroup = ({
	name,
	label,
	controlId,
	className,
	isTouched,
	errorMsg,
}: FieldInputGroupProps) => {
	return (
		<Form.Group as={Col} className={className} controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			<Field
				as={Form.Check}
				name={name}
				type="radio"
				label="Yes"
				value="yes"
				id={`${name}-yes`}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg}
			/>
			<Field
				as={Form.Check}
				name={name}
				type="radio"
				label="No"
				value="no"
				id={`${name}-no`}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg}
			/>
		</Form.Group>
	);
};

interface FieldFileUploadGroupProps extends FieldInputGroupProps {
	setFieldValue: (
		field: string,
		value: any,
		shouldValidate?: boolean | undefined
	) => void;
	accept: string;
}

export const FieldFileUploadGroup = ({
	name,
	label,
	controlId,
	isTouched,
	className,
	errorMsg,
	setFieldValue,
	accept,
}: FieldFileUploadGroupProps) => {
	return (
		<Form.Group as={Col} className={className} controlId={controlId}>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type="file"
				name={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setFieldValue(
						name,
						e.target.files instanceof FileList ? e.target.files[0] : null
					);
				}}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg !== undefined}
				accept={accept}
			/>
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};
