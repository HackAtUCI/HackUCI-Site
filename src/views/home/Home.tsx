import MuseumRoom from "layouts/MuseumRoom";
import styles from "./Home.module.scss";
import Faq from "./sections/Faq/Faq";
import Landing from "./sections/Landing";
import Sponsors from './sections/Sponsors/Sponsors';
import Support from "./sections/Support";
import WallPanel from "./sections/WallPanel/WallPanel";

function Home() {
	return (
		<div className={styles.home}>
			<MuseumRoom rotating>
				<Landing />
				<WallPanel />
				<Support />
				<div className={styles.faqBackground}>
					<Faq />
				</div>
				<Sponsors />
			</MuseumRoom>
		</div>
	);
}

export default Home;
