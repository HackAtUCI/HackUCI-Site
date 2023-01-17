import Image from "next/image";
import Col from "react-bootstrap/Col";

import styles from "./StatuePedestal.module.scss";

interface StatuePedestalProps {
	statueTitle: string;
	statueImage: string;
	statueAlt: string;
	children: React.ReactNode;
}

export default function StatuePedestal(props: StatuePedestalProps) {
	return (
		<Col>
			<div className={styles.statueContainer}>
				<Image src={props.statueImage} alt={props.statueAlt} />
				<h3 className={styles.statueTitle}>{props.statueTitle}</h3>
				<div className={styles.statueCube}>
					<div className={`${styles.cubeSide} ${styles.cubeTop}`} />
					<div className={`${styles.cubeSide} ${styles.cubeLeft}`} />
					<div
						className={`${styles.cubeSide} ${styles.cubeFront} ${styles.statueDescription}`}
					>
						{props.children}
					</div>
				</div>
			</div>
		</Col>
	);
}
