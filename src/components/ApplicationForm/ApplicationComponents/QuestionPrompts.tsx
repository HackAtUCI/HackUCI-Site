import { Field, FormikErrors, FormikTouched } from "formik";
import { Col, Form } from 'react-bootstrap';
import styles from '../applicationForm.module.scss';

interface valueTypes {
    stressReliefQuestion: string;
    companySpecializeQuestion: string;
}

interface propTypes {
    errors: FormikErrors<valueTypes>;
    touched: FormikTouched<valueTypes>;
}

interface TextAreaProps {
    name: string;
    isValid?: boolean;
    isInvalid?: boolean;
}

const FormikTextArea = (props: TextAreaProps) => {
    return (
        <Form.Control as="textarea" rows={3} {...props} />
    )
}

function QuestionPrompts({ errors, touched }: propTypes) {
    return (
        <div>
            <h3>Question Prompts</h3>
            <Form.Group as={Col} className={styles.formGroup} controlId="formPrompt1">
                <Form.Label>
                    If you're running into trouble with a programming project,
                    what would you do to relieve your stress? [Optional]
                </Form.Label>
                <Field
                    name="stressReliefQuestion"
                    as={FormikTextArea}
                    isValid={touched.stressReliefQuestion}
                />
            </Form.Group>
            <Form.Group as={Col} className={styles.formGroup} controlId="formPrompt2">
                <Form.Label>
                    Suppose you're starting a tech company. What would your company specialize in?
                    (Try to come up with a unique product or service) [Recommended 150 words. No word limit]
                </Form.Label>
                <Field
                    name="companySpecializeQuestion"
                    as={FormikTextArea}
                    isValid={touched.companySpecializeQuestion && !errors.companySpecializeQuestion}
                    isInvalid={touched.companySpecializeQuestion && errors.companySpecializeQuestion}
                />
                <Form.Control.Feedback type="invalid">{errors.companySpecializeQuestion}</Form.Control.Feedback>
            </Form.Group>
        </div>
    )
}

export default QuestionPrompts;
