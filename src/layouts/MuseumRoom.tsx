import { PropsWithChildren } from "react";

import { CarouselGallery } from "components";

import styles from "./MuseumRoom.module.scss";

interface MuseumRoomProps extends PropsWithChildren {
	rotating?: boolean;
}

function MuseumRoom({ rotating, children }: MuseumRoomProps) {
	return (
		<>
			<div className={styles.museumRoom}>
				<div className={styles.interstice}>
					<div className={styles.ceilingTrim} />
					<div className={styles.ceilingMain} />
					<div className={styles.ceilingHoleTrim} />
					<div className={styles.ceilingHole} />
					<div className={styles.floor} />
				</div>
				<CarouselGallery rotating={rotating || false} />
			</div>
			<div style={{ position: "relative" }}>{children}</div>
		</>
	);
}

export default MuseumRoom;
