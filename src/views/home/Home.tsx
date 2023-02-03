import Clubs from "./sections/Clubs/Clubs";
import Faq from "./sections/Faq/Faq";
import Landing from "./sections/Landing";
import Sponsors from "./sections/Sponsors/Sponsors";
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
			<Sponsors />
			<div className={styles.clubsBackground}>
				<Clubs />
			</div>
		</div>
	);
}

export default Home;
