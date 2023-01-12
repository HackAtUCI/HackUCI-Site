import styles from "./CarouselGallery.module.scss";

interface CarouselGalleryProps {
	rotating: boolean;
}

function CarouselGallery({ rotating }: CarouselGalleryProps) {
	return (
		<div className={styles.carouselGallery}>
			<div
				className={[styles.paintings, rotating && styles.rotating].join(" ")}
			>
				{Array(12)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className={[styles.painting, styles.paintingNumber].join(" ")}
						/>
					))}
			</div>
		</div>
	);
}

export default CarouselGallery;
