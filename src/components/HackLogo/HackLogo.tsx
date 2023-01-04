import hackAnteater from "assets/logos/hackuci-anteater.svg";
import hackGear from "assets/logos/hackuci-gear.svg";
import Image from "next/image";
import styles from "./HackLogo.module.scss";

function HackLogo() {
	return (
		<div className={styles.hackLogo}>
			<Image src={hackAnteater} alt="HackUCI Logo Anteater" />
			<Image
				className={styles.spinning}
				src={hackGear}
				alt="HackUCI Logo Gear"
			/>
		</div>
	);
}

export default HackLogo;
