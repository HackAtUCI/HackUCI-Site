import Container from "react-bootstrap/Container";
import Announcement from "views/schedule/components/Announcement";
import Event from "views/schedule/components/Event";

import schedule from "assets/data/schedule.json";

const formatTime = (time: string) =>
	new Date(time).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

function ScheduleList() {
	return (
		<Container className="museum-container-wide">
			{Object.entries(schedule).map(([day, events]) => (
				<section key={day}>
					<h3>{day.toUpperCase()}</h3>
					{events.map((event) =>
						event.category === "Announcement" ? (
							<Announcement
								key={event.title}
								title={event.title}
								start={formatTime(event.time.start)}
								description={event.description}
							/>
						) : (
							<Event
								key={event.title}
								title={event.title}
								start={formatTime(event.time.start)}
								end={formatTime(event.time.end)}
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
