import schedule from "assets/data/schedule.json";
import { TitleBanner } from "components";
import Container from "react-bootstrap/Container";
import Announcement from "views/schedule/components/Announcement";
import Event from "views/schedule/components/Event";

function Schedule() {
	return (
		<Container>
			<TitleBanner>
				<h1>Schedule</h1>
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
