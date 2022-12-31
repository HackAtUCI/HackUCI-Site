import { FormEvent, useState } from "react";

import Form, { FormProps } from "react-bootstrap/Form";

function ValidatingForm(props: FormProps) {
	const [validated, setValidated] = useState<boolean>(false);

	const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
		const form = event.currentTarget;
		if (!form.checkValidity()) {
			// prevent submission to display validation feedback
			event.preventDefault();
		}
		setValidated(true);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			noValidate // use custom validation feedback
			validated={validated}
			{...props}
		/>
	);
}

export default ValidatingForm;
