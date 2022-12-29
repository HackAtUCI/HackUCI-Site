import Image from "next/image";
import styles from "./HackLogo.module.scss";

function HackLogo() {
	return (
		<div className={styles.hackLogo}>
			<Image
				src="/hackuci-anteater.svg"
				alt="HackUCI Logo Anteater"
				width="50"
				height="50"
			/>
			<Image
				className={styles.spinning}
				src="/hackuci-gear.svg"
				alt="HackUCI Logo Gear"
				width="50"
				height="50"
			/>
		</div>
	);
}

export default HackLogo;
