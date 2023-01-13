import Image from "next/image";

import pond_anteater from "assets/artwork/ai_anteater_pond.jpg";
import scream_anteater from "assets/artwork/anteater_scream.jpg";
import ant_lilies from "assets/artwork/ant_lilies.jpg";
import haring_anteaters from "assets/artwork/haring_anteaters.png";
import mona_petr from "assets/artwork/mona_petr.jpg";
import starry_eh from "assets/artwork/starry_EH.jpg";

import styles from "./CarouselGallery.module.scss";

interface CarouselGalleryProps {
	rotating: boolean;
}

const PAINTINGS = [
	{ image: mona_petr, aspectRatio: "4/5" },
	{ image: pond_anteater, aspectRatio: "1/1" },
	{ image: scream_anteater, aspectRatio: "5/6" },
	{ image: starry_eh, aspectRatio: "16/9" },
	{ image: haring_anteaters, aspectRatio: "4/5" },
	{ image: ant_lilies, aspectRatio: "4/3" },
];

// reuse half of painting cycle
const PAINTINGS_CYCLE = PAINTINGS.concat(PAINTINGS);

const CAROUSEL_DESCRIPTION = `
A rotating carousel of paintings showing imitations of popular artworks but with UCI-themed variations.
The paintings include Mona Petr, Anteater in a Pond, Anteater Scream, A Starry Engineering Hall Night,
Keith Haring\u2013esque Anteaters, and Ants on Water Lilies.
`;

function CarouselGallery({ rotating }: CarouselGalleryProps) {
	return (
		<div className={styles.carouselGallery} aria-label={CAROUSEL_DESCRIPTION}>
			<div
				className={[styles.paintings, rotating && styles.rotating].join(" ")}
			>
				{PAINTINGS_CYCLE.map(({ image }, i) => (
					<div key={i} className={styles.painting}>
						<Image
							src={image}
							alt=""
							fill
							priority
							placeholder="blur"
							sizes={i % 2 ? "45vh" : "24vh"}
							style={{ objectFit: "cover" }}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default CarouselGallery;
