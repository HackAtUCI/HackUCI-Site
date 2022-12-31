import styles from "./CarouselGallery.module.scss";

function CarouselGallery() {
	return (
		<div className={styles.galleryBackground}>
			<div className={styles.paintings}>
				{Array(8)
					.fill(0)
					.map((_, i) => (
						<div key={i} className={styles.painting}>
							painting {i + 1}
						</div>
					))}
			</div>
		</div>
	);
}

export default CarouselGallery;
