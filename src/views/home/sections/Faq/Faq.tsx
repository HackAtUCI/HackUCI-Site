import questions from 'assets/data/faq.json';
import Accordion from 'react-bootstrap/Accordion';
import styles from './Faq.module.scss';

function Faq() {
    return (
        <section className="container faq-block">
            <h2 className="text-center">FAQ</h2>
            <Accordion defaultActiveKey="0">
                {questions.map((q, index) => (
                    <Accordion.Item key={index} eventKey={`${index}`}>
                        <Accordion.Header className={styles['accordion-border']}>{q["question"]}</Accordion.Header>
                        <Accordion.Body className={styles['accordion-border']}>
                            {q["answer"]}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </section>
    )
}

export default Faq;
