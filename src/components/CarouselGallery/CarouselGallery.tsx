import styles from "./CarouselGallery.module.scss";

function CarouselGallery() {
	return (
		<div className={styles.carouselGallery}>
			<div className={styles.paintings}>
				{Array(12)
					.fill(0)
					.map((_, i) => (
						<div
							key={i}
							className={[styles.painting, styles.paintingNumber].join(" ")}
						>
							{i + 1}
						</div>
					))}
			</div>
		</div>
	);
}

export default CarouselGallery;
