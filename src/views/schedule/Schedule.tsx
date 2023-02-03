import Head from "next/head";

import { TitleBanner } from "components";

import Countdown from "./components/Countdown";
import ScheduleList from "./sections/ScheduleList";

import "./Schedule.module.scss";

function Schedule() {
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
			<ScheduleList />
		</>
	);
}

export default Schedule;
