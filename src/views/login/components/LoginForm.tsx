import { ChangeEvent, useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { ValidatingForm } from "components";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const EDU_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.edu)+$/;
const LOGIN_PATH = "/api/user/login";

function LoginForm() {
	const [emailInput, setEmailInput] = useState<string>("");

	return (
		<ValidatingForm method="post" action={LOGIN_PATH}>
			<Form.Group controlId="email-input" className="mb-3">
				<Form.Label>Email address</Form.Label>
				<Form.Control
					as="input"
					type="email"
					pattern={EDU_REGEX.source}
					required
					name="email"
					placeholder="Enter email"
					value={emailInput}
					onChange={(e: ChangeEvent<HTMLInputElement>) => {
						setEmailInput(e.target.value);
					}}
					aria-describedby="email-description"
				/>
				<Form.Control.Feedback type="invalid">
					{EMAIL_REGEX.exec(emailInput) !== null
						? 'Sorry, only emails that end in ".edu" are allowed to log in.'
						: "Sorry, that email address is invalid."}
				</Form.Control.Feedback>
				<Form.Text id="email-description" muted>
					UCI students will log in with UCI SSO.
				</Form.Text>
			</Form.Group>
			<Button type="submit">Continue</Button>
		</ValidatingForm>
	);
}

export default LoginForm;
