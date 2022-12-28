import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import styles from "./login.module.scss";

type input = {
    target: {
        value: string;
    }
}

function Login() {
    const [emailInput, setEmailInput] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        // check if user is already authenticated
      });

    const onSubmit = (): void => {
        const email = emailInput.trim();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setError(false);
            if (email.length >= 8 && email.slice(email.length - 8) === "@uci.edu"){
                // uci users
                router.push(`${window.location.origin}/api/saml/login`);
            } else {
                // non uci users
            }
        } else {
            setError(true);
        }
    }

	return (
        <Container className={styles.container}>
            <Form>
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    className="mb-3" 
                    type="email" 
                    placeholder="Enter email" 
                    isInvalid={error} 
                    as="input" 
                    onChange={(e: input) => {
                        setEmailInput(e.target.value);
                    }}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                />
                <Button onClick={onSubmit}>
                    Continue
                </Button>
            </Form>
        </Container>
    )
}

export default Login;
