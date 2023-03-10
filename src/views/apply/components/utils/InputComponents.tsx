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
	placeholder?: string;
	isTouched?: boolean;
	errorMsg?: string | string[];
	disabled?: boolean;
	isTextArea?: boolean;
	sm?: number;
	md?: number;
	lg?: number;
}

export const FieldInputGroup = ({
	name,
	label,
	controlId,
	placeholder,
	isTouched,
	errorMsg,
	disabled,
	isTextArea,
	sm,
	md,
	lg,
}: FieldInputGroupProps) => {
	return (
		<Form.Group
			as={Col}
			xs={12}
			sm={sm}
			md={md}
			lg={lg}
			controlId={controlId}
			style={{ marginBottom: "1.25%" }}
		>
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
	isTouched,
	errorMsg,
	optionList,
	sm,
	md,
	lg,
}: FieldSelectGroupProps) => {
	return (
		<Form.Group
			as={Col}
			xs={12}
			sm={sm}
			md={md}
			lg={lg}
			controlId={controlId}
			style={{ marginBottom: "1.25%" }}
		>
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
				{optionList.map((option) => (
					<option key={option} id={`${name}-${option}`} value={option}>
						{option}
					</option>
				))}
			</Field>
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};

export const FieldChecklistGroup = ({
	name,
	label,
	controlId,
	isTouched,
	errorMsg,
	optionList,
	sm,
	md,
	lg,
}: FieldSelectGroupProps) => {
	return (
		<Form.Group
			as={Col}
			xs={12}
			sm={sm}
			md={md}
			lg={lg}
			controlId={controlId}
			style={{ marginBottom: "1.25%" }}
		>
			<Form.Label className={(isTouched && errorMsg && "is-invalid") || ""}>
				{label}
			</Form.Label>
			{optionList.map((option) => (
				<Field
					name={name}
					as={Form.Check}
					label={option}
					key={option}
					id={`${name}-${option}`}
					value={option}
					isValid={isTouched && !errorMsg}
					isInvalid={isTouched && errorMsg}
				/>
			))}
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};

export const FieldYesNoRadioGroup = ({
	name,
	label,
	controlId,
	isTouched,
	errorMsg,
	sm,
	md,
	lg,
}: FieldInputGroupProps) => {
	return (
		<Form.Group
			as={Col}
			xs={12}
			sm={sm}
			md={md}
			lg={lg}
			controlId={controlId}
			style={{ marginBottom: "1.25%" }}
		>
			<Form.Label className={(isTouched && errorMsg && "is-invalid") || ""}>
				{label}
			</Form.Label>
			<Field
				as={Form.Check}
				type="radio"
				name={name}
				label="Yes"
				value="true"
				id={`${name}-yes`}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg}
			/>
			<Field
				as={Form.Check}
				type="radio"
				name={name}
				label="No"
				value="false"
				id={`${name}-no`}
				isValid={isTouched && !errorMsg}
				isInvalid={isTouched && errorMsg}
			/>
			<Form.Control.Feedback type="invalid">{errorMsg}</Form.Control.Feedback>
		</Form.Group>
	);
};

interface FieldFileUploadGroupProps extends FieldInputGroupProps {
	setFieldValue: (
		field: string,
		value?: File,
		shouldValidate?: boolean | undefined
	) => void;
	accept: string;
}

export const FieldFileUploadGroup = ({
	name,
	label,
	controlId,
	isTouched,
	errorMsg,
	setFieldValue,
	accept,
	sm,
	md,
	lg,
}: FieldFileUploadGroupProps) => {
	return (
		<Form.Group
			as={Col}
			xs={12}
			sm={sm}
			md={md}
			lg={lg}
			controlId={controlId}
			style={{ marginBottom: "1.25%" }}
		>
			<Form.Label>{label}</Form.Label>
			<Form.Control
				type="file"
				name={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setFieldValue(
						name,
						e.target.files instanceof FileList ? e.target.files[0] : undefined
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
