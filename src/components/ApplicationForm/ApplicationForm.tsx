import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from 'react-bootstrap';
import styles from './applicationForm.module.scss';
// import { ValidatingForm } from "components";

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function ApplicationForm() {
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

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [pronouns, setPronouns] = useState<Map<string, boolean>>(new Map<string, boolean>(pronounList.map(x => [x, false])));
    const [otherPronouns, setOtherPronouns] = useState<string>("");
    const [ethnicity, setEthnicity] = useState<string>("");
    const [otherEthnicity, setOtherEthnicity] = useState<string>("");
    const [ageValid, setAgeValid] = useState<boolean>(false);
    const [educationLevel, setEducationLevel] = useState<string>("");
    const [schoolName, setSchoolName] = useState<string>("");
    const [major, setMajor] = useState<string>("");
    const [firstHack, setFirstHack] = useState<boolean>(false);
    const [portfolioLink, setPortfolioLink] = useState<string>("");
    const [linkedInLink, setLinkedInLink] = useState<string>("");
    const [prompt1, setPrompt1] = useState<string>("");
    const [prompt2, setPrompt2] = useState<string>("");

    // Temporary code until ValidationForm component is added
    const [validated, setValidated] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        const form = event.currentTarget;
        if (!form.checkValidity()) {
            event.preventDefault();
        }
        setValidated(true);
    };

    return (
        <Form onSubmit={handleSubmit} noValidate validated={validated} className={styles.container} id="form">
            <h2>Basic Information</h2>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formFirstName">
                    <Form.Label className='formLabel'>First Name</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="name"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                        name="first-name"
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLastName">
                    <Form.Label className='formLabel'>Last Name</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                        name="last-name"
                        required
                    />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formEmail">
                    <Form.Label className='formLabel'>Email</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="email"
                        pattern={EMAIL_REGEX.source}
                        placeholder="Email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        name="email"
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formGender">
                    <Form.Label className='formLabel'>Gender</Form.Label>
                    <Form.Select
                        value={gender}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                        name="gender"
                        required
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            genderList.map(gender => {
                                return <option value={gender}>{gender}</option>
                            })
                        }
                    </Form.Select>
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
                                        value={p}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setPronouns(new Map<string, boolean>(pronouns.set(e.target.value, e.target.checked)))}
                                        name="pronouns"
                                    />
                                )
                            })
                        }
                    </div>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formOtherPronouns">
                    <Form.Label className='formLabel'>If Other was selected, what are your pronouns?</Form.Label>
                    <Form.Control
                        className="formControl"
                        placeholder="Other Pronouns"
                        value={otherPronouns}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherPronouns(e.target.value)}
                        name="pronouns"
                        required={pronouns.get("Other")}
                        disabled={!pronouns.get("Other")}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formEthnicity">
                    <Form.Label className='formLabel'>Ethnicity</Form.Label>
                    <Form.Select
                        value={ethnicity}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEthnicity(e.target.value)}
                        name="ethnicity"
                        required
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            ethnicityList.map(ethnicity => {
                                return <option value={ethnicity}>{ethnicity}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formOtherEthnicity">
                    <Form.Label className='formLabel'>If Other was selected, what is your ethnicity</Form.Label>
                    <Form.Control
                        className="formControl"
                        placeholder="Other Ethnicity"
                        value={otherEthnicity}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtherEthnicity(e.target.value)}
                        name="ethnicity"
                        required={ethnicity === "Other"}
                        disabled={ethnicity !== "Other"}
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formAge">
                    <Form.Label className='formLabel'>Will you be 18 years or older by February 3rd, 2023?</Form.Label>
                    <div>
                        <Form.Check
                            name="is_18_older"
                            type="radio"
                            label="Yes"
                            id="yes"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgeValid(e.target.checked)}
                        />
                        <Form.Check
                            name="is_18_older"
                            type="radio"
                            label="No"
                            id="no"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAgeValid(!e.target.checked)}
                        />
                    </div>
                </Form.Group>
            </Row>
            <h2>School Information</h2>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formEducation">
                    <Form.Label className='formLabel'>Current Education Level</Form.Label>
                    <Form.Select
                        value={educationLevel}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setEducationLevel(e.target.value)}
                        name="curr_education"
                        required
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            educationLevelList.map(level => {
                                return <option value={level}>{level}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formUniveristy">
                    <Form.Label className='formLabel'>University</Form.Label>
                    <Form.Select
                        value={schoolName}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSchoolName(e.target.value)}
                        name="school_name"
                        required
                    >
                        <option value="" hidden>- Select -</option>
                        {
                            schoolList.map(school => {
                                return <option value={school}>{school}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formMajor">
                    <Form.Label className='formLabel'>Major</Form.Label>
                    <Form.Control
                        className="formControl"
                        placeholder="Major"
                        value={major}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMajor(e.target.value)}
                        name="major"
                        required
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className={styles.formGroup} controlId="formFirstHack">
                    <Form.Label className='formLabel'>Is this your first hackathon?</Form.Label>
                    <div>
                        <Form.Check
                            name="is_first_hackathon"
                            type="radio"
                            label="Yes"
                            id="yes"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstHack(e.target.checked)}
                        />
                        <Form.Check
                            name="is_first_hackathon"
                            type="radio"
                            label="No"
                            id="no"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstHack(!e.target.checked)}
                        />
                    </div>
                </Form.Group>
            </Row>
            <h2>Social Information (Optional)</h2>
            <Row className="mb-3">
                <Form.Group as={Col} className={styles.formGroup} controlId="formPortfolio">
                    <Form.Label className='formLabel'>Github/Portfolio Link</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="link"
                        placeholder="Github/Portfolio Link"
                        value={portfolioLink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPortfolioLink(e.target.value)}
                        name="portfolio_link"
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formLinkedIn">
                    <Form.Label className='formLabel'>LinkedIn</Form.Label>
                    <Form.Control
                        className="formControl"
                        type="link"
                        placeholder="LinkedIn Link"
                        value={linkedInLink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLinkedInLink(e.target.value)}
                        name="linkedin_link"
                    />
                </Form.Group>
                <Form.Group as={Col} className={styles.formGroup} controlId="formResume">
                    <Form.Label className='formLabel'>Resume</Form.Label>
                    <Form.Control
                        type="file"
                    />
                </Form.Group>
            </Row>
            <h2>Question Prompts</h2>
            <Form.Group as={Col} className={styles.formGroup} controlId="formPrompt1">
                <Form.Label className='formLabel'>
                    If you're running into trouble with a programming project,
                    what would you do to relieve your stress? [Optional]
                </Form.Label>
                <Form.Control
                    className="formControl"
                    as="textarea"
                    rows={3}
                    value={prompt1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt1(e.target.value)}
                    name="stress_relief_question"
                />
            </Form.Group>
            <Form.Group as={Col} className={styles.formGroup} controlId="formPrompt2">
                <Form.Label className='formLabel'>
                    Suppose you're starting a tech company. What would your company specialize in?
                    (Try to come up with a unique product or service) [Recommended 150 words. No word limit]
                </Form.Label>
                <Form.Control
                    className="formControl"
                    as="textarea"
                    rows={3}
                    value={prompt2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrompt2(e.target.value)}
                    name="company_specialize_question"
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit" className='button'>
                Submit
            </Button>
        </Form>
    );
}

export default ApplicationForm;