import Image from "next/image";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import styles from "./StatuePedastal.module.scss";

interface StatuePedastalProps {
	statueTitle: string;
	statueImage: string;
	statueAlt: string;
	href: string;
	buttonName: string;
	children: string;
}

export default function StatuePedastal(props: StatuePedastalProps) {
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
						<p>{props.children}</p>
						<Button
							variant="museum"
							href={props.href}
							role=""
							target="_blank"
							rel="noreferrer noopener"
						>
							{props.buttonName}
						</Button>
					</div>
				</div>
			</div>
		</Col>
	);
}
