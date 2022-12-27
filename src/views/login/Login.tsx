import { useRouter } from 'next/router';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Login() {
    const [emailInput, setEmailInput] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    

    // useEffect(() => {
    //     // Update the document title using the browser API
    //     console.log("test effect")
    //   });

    const onSubmit = (): void => {
        const email = emailInput.trim();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError(false);
            // router.push();

            if (email.slice(email.length - 8) === "@uci.edu"){
                console.log("uci email");
            } else {
                console.log("non-uci email");
            }
        } else {
            setError(true);
            console.log("invalid email");
        }
    }

	return (
        <Form>
            <Form.Group>
                <Form.Control placeholder="Enter email" isInvalid={error} onChange={(e: any) => {
                  setEmailInput(e.target.value);
                }}/>
            </Form.Group>
            <Button onClick={onSubmit}>
                Submit
            </Button>
        </Form>
    )
}

export default Login;
