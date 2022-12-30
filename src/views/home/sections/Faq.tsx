import questions from 'assets/data/faq.json';
import Accordion from 'react-bootstrap/Accordion';

function Faq() {
    return (
        <section className="faq-block">
            <h2>FAQ</h2>
            <Accordion>
                {questions.map((q, index) => (
                    <Accordion.Item key={index} eventKey={`${index}`}>
                        <Accordion.Header>{q["question"]}</Accordion.Header>
                        <Accordion.Body>
                            {q["answer"]}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </section>
    )
}

export default Faq;
