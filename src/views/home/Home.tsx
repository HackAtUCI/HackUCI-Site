import Faq from "./sections/Faq/Faq";
import Landing from "./sections/Landing";
import Support from "./sections/Support";
import WallPanel from "./sections/WallPanel/WallPanel";

import styles from "./Home.module.scss";

function Home() {
	return (
		<div className={styles.home}>
			<Landing />
			<WallPanel />
			<Support />
			<div className={styles.faqBackground}>
				<Faq />
			</div>
		</div>
	);
}

export default Home;
