import Image from "next/image";

import ceiling_lamp from "assets/images/ceiling_lamp.svg";

import styles from "./TitleBanner.module.scss";

function TitleBanner({
	children,
	className,
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={"title-banner " + styles.titleBanner}>
			<div className={styles.panelStart} />
			<Image
				src={ceiling_lamp}
				alt="Ceiling lamp"
				className={styles.lamp}
				style={{ width: "100%", height: "auto" }}
			/>
			<div
				className={
					(className || styles.bannerTitle) + " " + styles.bannerContent
				}
			>
				{children}
			</div>
			<div className={styles.panelEnd} />
		</div>
	);
}

export default TitleBanner;
