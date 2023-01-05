import MuseumRoom from "layouts/MuseumRoom";

import Faq from "./sections/Faq/Faq";
import Landing from "./sections/Landing";
import Support from "./sections/Support";

import styles from "./Home.module.scss";

function Home() {
	return (
		<div className={styles.home}>
			<MuseumRoom rotating>
				<Landing />
				<Support />
				<div className={styles.faqBackground}>
					<Faq />
				</div>
			</MuseumRoom>
		</div>
	);
}

export default Home;
