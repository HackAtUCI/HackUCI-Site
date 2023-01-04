import { Field, FormikErrors, FormikTouched } from "formik";
import { Col, Form, Row } from 'react-bootstrap';
import styles from '../applicationForm.module.scss';

const educationLevelList = ["First Year Undergraduate", "Second Year Undergraduate",
    "Third Year Undergraduate", "Fourth Year Undergraduate",
    "Fifth+ Year Undergraduate", "Graduate"]
const schoolList = ["UC Irvine", "UC San Diego", "UCLA", "UC Berkeley", "Cal State Long Beach", "Cal State Fullerton",
    "Cal Poly Pomona", "UC Riverside", "UC Santa Barbara", "Other"]

interface valueTypes {
    educationLevel: string;
    schoolName: string;
    major: string;
    firstHack: string;
}

interface propTypes {
    errors: FormikErrors<valueTypes>;
    touched: FormikTouched<valueTypes>;
}

function SchoolInformation({ errors, touched }: propTypes) {
    return (
        <div>
            <h3>School Information</h3>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formEducation">
                    <Form.Label>Current Education Level</Form.Label>
                    <Field
                        name="educationLevel"
                        as={Form.Select}
                        isValid={touched.educationLevel && !errors.educationLevel}
                        isInvalid={touched.educationLevel && errors.educationLevel}
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            educationLevelList.map((level, index) => {
                                return <option key={index} value={level}>{level}</option>
                            })
                        }
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.educationLevel}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formUniveristy">
                    <Form.Label>University</Form.Label>
                    <Field
                        name="schoolName"
                        as={Form.Select}
                        isValid={touched.schoolName && !errors.schoolName}
                        isInvalid={touched.schoolName && errors.schoolName}
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            schoolList.map((school, index) => {
                                return <option key={index} value={school}>{school}</option>
                            })
                        }
                    </Field>
                    <Form.Control.Feedback type="invalid">{errors.schoolName}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formMajor">
                    <Form.Label>Major</Form.Label>
                    <Field
                        placeholder="Major"
                        name="major"
                        as={Form.Control}
                        isValid={touched.major && !errors.major}
                        isInvalid={touched.major && errors.major}
                    />
                    <Form.Control.Feedback type="invalid">{errors.major}</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formFirstHack">
                    <Form.Label>Is this your first hackathon?</Form.Label>
                    <div>
                        <Field
                            as={Form.Check}
                            name="firstHack"
                            type="radio"
                            label="Yes"
                            value="yes"
                            id="yes_first_hack"
                            isValid={touched.firstHack && !errors.firstHack}
                            isInvalid={touched.firstHack && errors.firstHack}
                        />
                        <Field
                            as={Form.Check}
                            name="firstHack"
                            type="radio"
                            label="No"
                            value="no"
                            id="no_first_hack"
                            isValid={touched.firstHack && !errors.firstHack}
                            isInvalid={touched.firstHack && errors.firstHack}
                        />
                    </div>
                </Form.Group>
            </Row>
        </div>
    )
}

export default SchoolInformation;
