import Container from "react-bootstrap/Container";

import Announcement from "views/schedule/components/Announcement";
import EventCard from "views/schedule/components/EventCard";
import EventSpacerCard from "views/schedule/components/EventSpacerCard";

import schedule from "assets/data/schedule.json";

export const formatTime = (time: Date) =>
	time.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
	});

interface Event {
	title: string;
	time: {
		start: string;
		end: string;
	};
	category: string;
	host: string;
	description: string;
}

interface ScheduleListProps {
	now: Date;
}

function ScheduleList({ now }: ScheduleListProps) {
	const scheduleItem = (event: Event) => {
		if (event.category === "announcement")
			return (
				<Announcement
					key={event.title}
					now={now}
					{...event}
					start={new Date(event.time.start)}
				/>
			);
		if (event.category === "spacer")
			return (
				<EventSpacerCard
					key={event.title}
					now={now}
					{...event}
					start={new Date(event.time.start)}
					end={new Date(event.time.end)}
				/>
			);
		return (
			<EventCard
				key={event.title}
				now={now}
				{...event}
				start={new Date(event.time.start)}
				end={new Date(event.time.end)}
			/>
		);
	};

	return (
		<Container className="museum-container-medium">
			{Object.entries(schedule).map(([day, events]) => (
				<section key={day} className="py-5">
					<h3 className="text-white">{day.toUpperCase()}</h3>
					{events.map(scheduleItem)}
				</section>
			))}
		</Container>
	);
}

export default ScheduleList;
