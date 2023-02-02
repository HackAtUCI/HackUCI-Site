import schedule from "assets/data/schedule.json";
import { TitleBanner } from "components";
import Container from "react-bootstrap/Container";
import Announcement from "views/schedule/components/Announcement";
import Event from "views/schedule/components/Event";
import Countdown from "./components/Countdown";
import './Schedule.module.scss';

function Schedule() {
	const hackingBegins = "3 Feb 2023 21:00:00 PDT";
	const devpostSubmission = "5 Feb 2023 9:00:00 PDT";

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
		<Container>
			<TitleBanner>
				{generateCountdown()}
			</TitleBanner>
			{schedule.friday.map((event) =>
				event.category === "Announcement" ? (
					<Announcement
						key={event.title}
						title={event.title}
						start={new Date(event.time.start).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						description={event.description}
					/>
				) : (
					<Event
						key={event.title}
						title={event.title}
						start={new Date(event.time.start).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						end={new Date(event.time.end).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						category={event.category}
						host={event.host}
						description={event.description}
					/>
				)
			)}
			{schedule.saturday.map((event) =>
				event.category === "Announcement" ? (
					<Announcement
						key={event.title}
						title={event.title}
						start={new Date(event.time.start).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						description={event.description}
					/>
				) : (
					<Event
						key={event.title}
						title={event.title}
						start={new Date(event.time.start).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						end={new Date(event.time.end).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						category={event.category}
						host={event.host}
						description={event.description}
					/>
				)
			)}
			{schedule.sunday.map((event) =>
				event.category === "Announcement" ? (
					<Announcement
						key={event.title}
						title={event.title}
						start={new Date(event.time.start).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						description={event.description}
					/>
				) : (
					<Event
						key={event.title}
						title={event.title}
						start={new Date(event.time.start).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						end={new Date(event.time.end).toLocaleTimeString([], {
							hour: "2-digit",
							minute: "2-digit",
						})}
						category={event.category}
						host={event.host}
						description={event.description}
					/>
				)
			)}
		</Container>
	);
}

export default Schedule;
