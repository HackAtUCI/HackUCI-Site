import Container from "react-bootstrap/Container";

import Announcement from "views/schedule/components/Announcement";
import EventCard from "views/schedule/components/EventCard";

import schedule from "assets/data/schedule.json";

export const formatTime = (time: string) =>
	new Date(time).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

function ScheduleList() {
	const now = new Date();

	return (
		<Container className="museum-container-wide">
			{Object.entries(schedule).map(([day, events]) => (
				<section key={day}>
					<h3>{day.toUpperCase()}</h3>
					{events.map((event) =>
						event.category === "announcement" ? (
							<Announcement
								key={event.title}
								title={event.title}
								start={formatTime(event.time.start)}
								description={event.description}
							/>
						) : (
							<EventCard
								key={event.title}
								title={event.title}
								now={now}
								start={event.time.start}
								end={event.time.end}
								category={event.category}
								host={event.host}
								description={event.description}
							/>
						)
					)}
				</section>
			))}
		</Container>
	);
}

export default ScheduleList;
