import Head from "next/head";
import { useEffect, useState } from "react";

import { TitleBanner } from "components";

import Countdown from "./components/Countdown";
import ScheduleList from "./sections/ScheduleList";

import "./Schedule.module.scss";

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
					<div className="schedule-countdown text-center">
						<Countdown date={hackingBegins} />
					</div>
					<div className="schedule-countdown-text">
						<span> Until Hacking Begins</span>
					</div>
				</section>
			);
		} else {
			return (
				<section id="schedule-block">
					<div className="schedule-countdown text-center">
						<Countdown date={devpostSubmission} />
					</div>
					<div className="schedule-countdown-text">
						<span> Until Devpost Submission Closes</span>
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
			<TitleBanner>{generateCountdown()}</TitleBanner>
			<h2 className="visually-hidden">Events Schedule</h2>
			<ScheduleList now={now} />
		</>
	);
}

export default Schedule;
