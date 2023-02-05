import Head from "next/head";
import { useEffect, useState } from "react";

import { TitleBanner } from "components";

import Countdown from "./components/Countdown";
import ScheduleList from "./sections/ScheduleList";

import styles from "./Schedule.module.scss";

const T_REFRESH = 15_000;

function Schedule() {
	const [now, setNow] = useState<Date>(new Date());

	useEffect(() => {
		const refreshNow = setInterval(() => {
			setNow(new Date());
		}, T_REFRESH);

		return () => {
			clearInterval(refreshNow);
		};
	}, []);

	const hackingBegins = "3 Feb 2023 21:00:00 PST";
	const devpostSubmission = "5 Feb 2023 9:00:00 PST";

	function generateCountdown() {
		if (Date.parse(hackingBegins) > Date.now()) {
			return (
				<section id="schedule-block">
					<div className={styles.scheduleCountdown}>
						<Countdown date={hackingBegins} />
					</div>
					<div className="lead my-2">
						<span> Until Hacking Begins</span>
					</div>
				</section>
			);
		} else {
			return (
				<section id="schedule-block">
					<div className={styles.scheduleCountdown}>
						<Countdown date={devpostSubmission} />
					</div>
					<div className="lead my-2">
						<span>
							{" "}
							Until{" "}
							<a
								href="https://hack-at-uci-2023.devpost.com/"
								className={styles.link}
							>
								Devpost
							</a>{" "}
							Submission Closes
						</span>
					</div>
				</section>
			);
		}
	}

	return (
		<>
			<Head>
				<title>Schedule | Hack at UCI 2023</title>
			</Head>
			<div className={styles.scheduleLanding}>
				<TitleBanner className={styles.titleBanner}>
					{generateCountdown()}
				</TitleBanner>
			</div>
			<h2 className="visually-hidden">Events Schedule</h2>
			<ScheduleList now={now} />
		</>
	);
}

export default Schedule;
