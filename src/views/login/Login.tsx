import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import styles from "./login.module.scss";

function Login() {
    const [emailInput, setEmailInput] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        // check if user is already authenticated
      });

    const onSubmit = (): void => {
        const email = emailInput.trim();
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setIsEmailValid(true);
            if (email.length >= 7 && email.slice(email.length - 7) === "uci.edu"){
                // uci users
                router.push(`/api/saml/login`);
            } else {
                // non uci users
            }
        } else {
            setIsEmailValid(false);
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
                    isInvalid={!isEmailValid} 
                    as="input" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setEmailInput(e.target.value);
                        setIsEmailValid(true);
                    }}
                    onSubmit={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onSubmit();
                    }}
                />
                <Button type="submit" onClick={onSubmit}>
                    Continue
                </Button>
            </Form>
        </Container>
    )
}

export default Login;
