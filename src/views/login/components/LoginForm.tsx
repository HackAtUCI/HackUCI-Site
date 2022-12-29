import { ChangeEvent, FormEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const LOGIN_PATH = "/api/user/login";

function LoginForm() {
	const [emailInput, setEmailInput] = useState<string>("");
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
			method="post"
			action={LOGIN_PATH}
			noValidate // use custom validation feedback
			validated={validated}
		>
			<Form.Group controlId="email-input" className="mb-3">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					as="input"
					type="email"
					pattern={EMAIL_REGEX.source}
					required
					name="email"
					placeholder="Enter email"
					value={emailInput}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setEmailInput(e.target.value);
					}}
				/>
				<Form.Control.Feedback type="invalid">
					Sorry, that email address is invalid.
				</Form.Control.Feedback>
			</Form.Group>
			<Button type="submit">Continue</Button>
		</Form>
	);
}

export default LoginForm;
