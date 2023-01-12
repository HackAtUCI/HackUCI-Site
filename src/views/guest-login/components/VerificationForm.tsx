import { useRouter } from "next/router";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { ValidatingForm } from "components";

const VERIFICATION_PATH = "/api/guest/verify";
const PASSPHRASE_REGEX = /\w+-\w+-\w+-\w+/;

function VerificationForm() {
	const router = useRouter();
	const { email } = router.query;

	return (
		<ValidatingForm method="post" action={VERIFICATION_PATH}>
			<input type="email" name="email" value={email} hidden />
			<Form.Group controlId="email-input" className="mb-3">
				<Form.Label>Passphrase</Form.Label>
				<Form.Control
					as="input"
					type="text"
					pattern={PASSPHRASE_REGEX.source}
					required
					name="passphrase"
					placeholder="Enter passphrase"
				/>
				<Form.Control.Feedback type="invalid">
					Sorry, that passphrase is invalid.
				</Form.Control.Feedback>
			</Form.Group>
			<Button type="submit">Continue</Button>
		</ValidatingForm>
	);
}

export default VerificationForm;
