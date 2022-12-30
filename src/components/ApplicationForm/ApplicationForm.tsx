import { useState } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import styles from './applicationForm.module.scss';

function ApplicationForm() {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pronouns, setPronouns] = useState<string>("");
    const [ethnicity, setEthnicity] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [portfolioLink, setPortfolioLink] = useState<string>("");
    const [linkedInLink, setLinkedInLink] = useState<string>("");
    const [prompt1, setPrompt1] = useState<string>("");
    const [prompt2, setPrompt2] = useState<string>("");

    const genderList = ["Male", "Female", "Non-Binary", "Prefer not to answer", "Other"]
    const pronounList = ["He/him/his", "She/her/hers", "They/them/theirs", "Ze/zir/zirs", "Other"]
    const ethnicityList = ["American Indian or Alaskan", "Asian or Pacific Islander",
        "Black or African American", "Hispanic", "White or Caucasian", "Two or more races",
        "Prefer not to answer", "Other"]
    const educationLevelList = ["First Year Undergraduate", "Second Year Undergraduate",
        "Third Year Undergraduate", "Fourth Year Undergraduate",
        "Fifth+ Year Undergraduate", "Graduate"]
    const schoolList = ["UC Irvine", "UC San Diego", "UCLA", "UC Berkeley", "Cal State Long Beach", "Cal State Fullerton",
        "Cal Poly Pomona", "UC Riverside", "UC Santa Barbara", "Other"]

    return (
        <Form className={styles.container}>
            <h2>Basic Information</h2>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formFirstName">
                    <Form.Label className='formLabel'>First Name</Form.Label>
                    <Form.Control
                        className="formControl" type="name"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        required
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Last Name</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                        required
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formEmail">
                    <Form.Label className='formLabel'>Email</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        required
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Gender</Form.Label>
                    <Form.Select>
                        <option>- Select -</option>
                        {
                            genderList.map(gender => {
                                return <option value={gender}>{gender}</option>
                            })
                        }
                    </Form.Select>
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formPronouns">
                    <Form.Label className='formLabel'>Pronouns</Form.Label>
                    <div>
                        {
                            pronounList.map(p => {
                                return (
                                    <Form.Check
                                        type="checkbox"
                                        label={p}
                                        id={p}
                                    />
                                )
                            })
                        }
                    </div>
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>If Other was selected, what are your pronouns</Form.Label>
                    <Form.Control
                        className="formControl"
                        placeholder="Other Pronouns"
                        value={pronouns}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPronouns(e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Ethnicity</Form.Label>
                    <Form.Select>
                        <option>- Select -</option>
                        {
                            ethnicityList.map(ethnicity => {
                                return <option value={ethnicity}>{ethnicity}</option>
                            })
                        }
                    </Form.Select>
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>If Other was selected, what is your ethnicity</Form.Label>
                    <Form.Control
                        className="formControl"
                        placeholder="Other Ethnicity"
                        value={ethnicity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEthnicity(e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Will you be 18 years or older by February 3rd, 2023?</Form.Label>
                    <div>
                        <Form.Check
                            name="age-eligible"
                            type="radio"
                            label="Yes"
                            id="yes"
                        />
                        <Form.Check
                            name="age-eligible"
                            type="radio"
                            label="No"
                            id="no"
                        />
                    </div>
                </Form.Group>
            </Row>
            <h2>School Information</h2>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Current Education Level</Form.Label>
                    <Form.Select>
                        <option>- Select -</option>
                        {
                            educationLevelList.map(level => {
                                return <option value={level}>{level}</option>
                            })
                        }
                    </Form.Select>
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>University</Form.Label>
                    <Form.Select>
                        <option>- Select -</option>
                        {
                            schoolList.map(school => {
                                return <option value={school}>{school}</option>
                            })
                        }
                    </Form.Select>
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Major</Form.Label>
                    <Form.Control
                        className="formControl" type="name"
                        placeholder="Major"
                        value={major}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)}
                        required
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Is this your first hackathon?</Form.Label>
                    <div>
                        <Form.Check
                            name="first-hack"
                            type="radio"
                            label="Yes"
                            id="yes"
                        />
                        <Form.Check
                            name="first-hack"
                            type="radio"
                            label="No"
                            id="no"
                        />
                    </div>
                </Form.Group>
            </Row>
            <h2>Social Information</h2>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formFirstName">
                    <Form.Label className='formLabel'>Github/Portfolio Link</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="link"
                        placeholder="Github/Portfolio Link"
                        value={portfolioLink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPortfolioLink(e.target.value)}
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>LinkedIn</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="link"
                        placeholder="Last Name"
                        value={linkedInLink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkedInLink(e.target.value)}
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Resume</Form.Label>
                    <Form.Control
                        type="file"
                    />
                    {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
                </Form.Group>
            </Row>
            <h2>Question Prompts</h2>
            <Form.Group as={Col} className={styles.formGroup} controlId="formFirstName">
                <Form.Label className='formLabel'>If you're running into trouble with a programming project, what would you do to relieve your stress? (Optional)</Form.Label>
                <Form.Control
                    className="formControl"
                    as="textarea"
                    rows={3}
                    value={prompt1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt1(e.target.value)}
                />
                {/*<Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>*/}
            </Form.Group>
            <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                <Form.Label className='formLabel'>Suppose you’re starting a tech company. What would your company specialize in? (Try to come up with a unique product or service)</Form.Label>
                <Form.Control
                    className="formControl"
                    as="textarea"
                    rows={3}
                    value={prompt2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt2(e.target.value)}
                    required
                />
                {/*<Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>*/}
            </Form.Group>
            <Button variant="primary" type="submit" className='button'>
                Submit
            </Button>
        </Form>
    );
}

export default ApplicationForm;