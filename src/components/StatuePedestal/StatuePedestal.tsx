import { PropsWithChildren } from "react";

import Image from "next/image";
import Col from "react-bootstrap/Col";

import styles from "./StatuePedestal.module.scss";

interface StatuePedestalProps extends PropsWithChildren {
	statueTitle: string;
	statueImage: string;
	statueAlt: string;
}

export default function StatuePedestal({
	statueTitle,
	statueImage,
	statueAlt,
	children,
}: StatuePedestalProps) {
	return (
		<Col>
			<div className={styles.statueContainer}>
				<Image src={statueImage} alt={statueAlt} />
				<h3 className={styles.statueTitle}>{statueTitle}</h3>
				<div className={styles.statueCube}>
					<div className={`${styles.cubeSide} ${styles.cubeTop}`} />
					<div className={`${styles.cubeSide} ${styles.cubeLeft}`} />
					<div
						className={`${styles.cubeSide} ${styles.cubeFront} ${styles.statueDescription}`}
					>
						{children}
					</div>
				</div>
			</div>
		</Col>
	);
}
