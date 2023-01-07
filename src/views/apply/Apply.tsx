import { Container } from "react-bootstrap";
import styles from "./Apply.module.scss";
import ApplicationForm from "./components/ApplicationForm";

function Apply() {
	return (
		<div className={styles.main}>
			<Container className={styles.apply}>
				<ApplicationForm />
			</Container>
		</div>
	);
}

export default Apply;
