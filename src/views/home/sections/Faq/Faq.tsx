import questions from "assets/data/faq.json";
import Accordion from "react-bootstrap/Accordion";
import styles from "./Faq.module.scss";

function Faq() {
	return (
		<section id="faq" className="container faq-block">
			<h2 className="text-center">FAQ</h2>
			<Accordion className={styles["accordion"]} alwaysOpen>
				{questions.map((q, index) => (
					<Accordion.Item
						key={index}
						className={styles["accordion-border"]}
						eventKey={`${index}`}
					>
						<Accordion.Header>{q["question"]}</Accordion.Header>
						<Accordion.Body>{q["answer"]}</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
		</section>
	);
}

export default Faq;
