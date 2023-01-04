import { Field, FormikErrors, FormikTouched } from "formik";
import { Col, Form, Row } from 'react-bootstrap';
import styles from '../applicationForm.module.scss';

const genderList = ["Male", "Female", "Non-Binary", "Prefer not to answer", "Other"]
const pronounList = ["He/him/his", "She/her/hers", "They/them/theirs", "Ze/zir/zirs", "Other"]
const ethnicityList = ["American Indian or Alaskan", "Asian or Pacific Islander",
    "Black or African American", "Hispanic", "White or Caucasian", "Two or more races",
    "Prefer not to answer", "Other"]

interface valueTypes {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    pronouns: string[];
    otherPronouns: string;
    ethnicity: string;
    otherEthnicity: string;
    ageValid: string;
}

interface propTypes {
    values: valueTypes;
    errors: FormikErrors<valueTypes>;
    touched: FormikTouched<valueTypes>;
}

function BasicInformation({ values, errors, touched }: propTypes) {
    return (
        <div>
            <h3>Basic Information</h3>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Field
                        placeholder="First Name"
                        name="firstName"
                        as={Form.Control}
                        isValid={touched.firstName && !errors.firstName}
                        isInvalid={touched.firstName && errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Field
                        placeholder="Last Name"
                        name="lastName"
                        as={Form.Control}
                        isValid={touched.lastName && !errors.lastName}
                        isInvalid={touched.lastName && errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Field
                        placeholder="Email"
                        name="email"
                        as={Form.Control}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Field
                        name="gender"
                        as={Form.Select}
                        isValid={touched.gender && !errors.gender}
                        isInvalid={touched.gender && errors.gender}
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            genderList.map((gender, index) => {
                                return <option key={index} value={gender}>{gender}</option>
                            })
                        }
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formPronouns">
                    <Form.Label>Pronouns [Please select at least one]</Form.Label>
                    <div>
                        {
                            pronounList.map((p, index) => {
                                return (
                                    <Field
                                        name="pronouns"
                                        as={Form.Check}
                                        label={p}
                                        key={index}
                                        value={p}
                                        isValid={touched.pronouns && !errors.pronouns}
                                        isInvalid={touched.pronouns && errors.pronouns}
                                    />
                                )
                            })
                        }
                    </div>
                    <Form.Control.Feedback type="invalid">{errors.pronouns}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formOtherPronouns">
                    <Form.Label>If Other was selected, what are your pronouns?</Form.Label>
                    <Field
                        placeholder="Other Pronouns"
                        name="otherPronouns"
                        as={Form.Control}
                        isValid={touched.otherPronouns && !errors.otherPronouns}
                        isInvalid={touched.otherPronouns && errors.otherPronouns}
                        disabled={!values.pronouns.includes('Other')}
                    />
                    <Form.Control.Feedback type="invalid">{errors.otherPronouns}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formEthnicity">
                    <Form.Label>Ethnicity</Form.Label>
                    <Field
                        name="ethnicity"
                        as={Form.Select}
                        isValid={touched.ethnicity && !errors.ethnicity}
                        isInvalid={touched.ethnicity && errors.ethnicity}
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            ethnicityList.map((ethnicity, index) => {
                                return <option key={index} value={ethnicity}>{ethnicity}</option>
                            })
                        }
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.ethnicity}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formOtherEthnicity">
                    <Form.Label>If Other was selected, what is your ethnicity</Form.Label>
                    <Field
                        placeholder="Other Ethnicity"
                        name="otherEthnicity"
                        as={Form.Control}
                        isValid={touched.otherEthnicity && !errors.otherEthnicity}
                        isInvalid={touched.otherEthnicity && errors.otherEthnicity}
                        disabled={!(values.ethnicity === "Other")}
                    />
                    <Form.Control.Feedback type="invalid">{errors.otherEthnicity}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formAge">
                    <Form.Label>Will you be 18 years or older by February 3rd, 2023?</Form.Label>
                    <div>
                        <Field
                            as={Form.Check}
                            name="ageValid"
                            type="radio"
                            label="Yes"
                            value="yes"
                            id="yes_age"
                            isValid={touched.ageValid && !errors.ageValid}
                            isInvalid={touched.ageValid && errors.ageValid}
                        />
                        <Field
                            as={Form.Check}
                            name="ageValid"
                            type="radio"
                            label="No"
                            value="no"
                            id="no_age"
                            isValid={touched.ageValid && !errors.ageValid}
                            isInvalid={touched.ageValid && errors.ageValid}
                        />
                    </div>
                </Form.Group>
            </Row>
        </div>
    );
}

export default BasicInformation;
