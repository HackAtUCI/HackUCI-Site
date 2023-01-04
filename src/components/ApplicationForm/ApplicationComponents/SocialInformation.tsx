import { Field, FormikTouched } from "formik";
import React from "react";
import { Col, Form, Row } from 'react-bootstrap';
import styles from '../applicationForm.module.scss';

interface valueTypes {
    portfolioLink: string;
    linkedInLink: string;
}

interface propTypes {
    touched: FormikTouched<valueTypes>
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

function SocialInformation({ touched, setFieldValue }: propTypes) {
    return (
        <div>
            <h3>Social Information (Optional)</h3>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formPortfolio">
                    <Form.Label>Github/Portfolio Link</Form.Label>
                    <Field
                        placeholder="Github/Portfolio Link"
                        name="portfolioLink"
                        type="link"
                        as={Form.Control}
                        isValid={touched.portfolioLink}
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLinkedIn">
                    <Form.Label>LinkedIn</Form.Label>
                    <Field
                        placeholder="LinkedIn Link"
                        name="linkedInLink"
                        type="link"
                        as={Form.Control}
                        isValid={touched.linkedInLink}
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formResume">
                    <Form.Label>Resume</Form.Label>
                    <Form.Control
                        type="file"
                        name="resume"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setFieldValue("resume", e.target.files instanceof FileList ? e.target.files[0] : null)
                        }}
                    />
                </Form.Group>
            </Row>
        </div>
    )
}

export default SocialInformation;
