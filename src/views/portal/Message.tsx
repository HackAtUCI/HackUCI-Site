import styles from "views/portal/Portal.module.scss";

interface MessageProps {
	status: string;
}

function Message(props: MessageProps) {
	const messages: { [key: string]: JSX.Element } = {
		submitted: (
			<p>
				Thank you for submitting your application! We are currently reviewing
				applications on a rolling basis and you will hear back from us soon!
			</p>
		),
		accepted: (
			<>
				<p>
					Congrats on your acceptance to Hack at UCI 2023! Before confirming
					your attendance, it is crucial that you read through the following
					event logistics in its entirety and complete the required tasks. We
					look forward to seeing you at Hack at UCI!
				</p>

				<h4>Waiver</h4>
				<p>
					ALL ATTENDEES, please review our{" "}
					<a href="https://docs.google.com/document/u/1/d/e/2PACX-1vRPuYBKQ2YR64FVzDKunDeVkeFGD573hSqfTmf8JwvyhlvPQPEnovxhlYbal45WI3k3Jr2iLNRzz1Hp/pub">
						Code of Conduct
					</a>{" "}
					and sign the Event Waiver prior to the event. You will receive the
					waiver via email closer to the event date.{" "}
					<strong className={styles.red_text}>
						<i>
							<u>
								You must complete the waiver in order to participate in Hack at
								UCI.
							</u>
						</i>
					</strong>
				</p>

				<h4>Communication</h4>
				<p>
					Communication during the event will primarily be done through Slack.
					You will receive an invite via email closer to the event date.
				</p>

				<h4>Team Formation</h4>
				<p>
					Still looking for teammates? Attend our two team formation events,
					Thursday (2/2) 7-8 PM in DBH 6011 and Friday (2/3) 7-8 PM in Student
					Center Pacific Ballroom. You can also create an introductory slide{" "}
					<a href="https://docs.google.com/presentation/d/1qjAzK9ocrI5Lg2D8l4VnE38CWDU2bW2v3XqAROA-vR4/edit#slide=id.g1ecf0247681_1_277">
						here
					</a>{" "}
					to connect with other hackers or use the #team-formation channel in
					Slack to find teammates! Teams are limited to groups of up to four.
				</p>

				<h4>Health and Safety Protocols</h4>
				<p>
					Please be mindful of your personal health and of those around you.
					Although not required, we strongly encourage wearing masks, and please
					stay home if you feel sick. To help us ensure your safety at the
					venue, please keep your <strong>badge</strong> (issued at check in){" "}
					<strong>visible at all times</strong>.
				</p>

				<h4>Venue Information</h4>
				<p>
					Hack at UCI 2023 will take place (not overnight) on Friday evening,
					all-day Saturday, and approximately the first half of Sunday on-campus
					at UC Irvine Student Center.{" "}
					<strong className={styles.red_text}>
						You must check in on all three event days in order to be eligible to
						win prizes, specifically attending the opening ceremony on Friday,
						project expo for judging on Sunday, and completing the Midway
						check-in form on Saturday
					</strong>
					. Hackathon events will take place in the following rooms:
				</p>
				<p>
					<strong>Pacific Ballroom Lobby:</strong> Check In
					<br />
					<strong>Pacific Ballroom ABCD:</strong> Hacking Space
					<br />
					<strong>Woods Cove B + C:</strong> Hacking Space
					<br />
					<strong>Moss Cove A + B:</strong> Workshops and Socials
				</p>
				<p>
					Map:{" "}
					<a href="https://map.uci.edu/?id=463#!m/255880">
						https://map.uci.edu/?id=463#!m/255880
					</a>
				</p>
				<p>
					Floor Map:{" "}
					<a href="https://conference.studentaffairs.uci.edu/node/24">
						https://conference.studentaffairs.uci.edu/node/24
					</a>
				</p>
				<h4>On-Campus Parking</h4>
				<p>
					<strong>Attendees will be responsible for their own parking.</strong>{" "}
					The closest parking structure to our event is the UCI Student Center
					Parking Structure. This structure provides both pay-by-space ($2 per
					hour) and permit dispensers ($1 per hour, $13 for a day). You may
					purchase a permit at any information kiosk, dispenser, or through
					UCI&#39;s ParkbyPlate signage located in select parking areas. All
					options accept major credit cards (Visa, MasterCard, American Express,
					Discover). These dispensers are available from 7AM-7PM.
				</p>
				<p>
					To enter the venue from the parking structure, cross Pereira Dr. and
					enter the building with the large arch labeled “Student Center”. Once
					you enter the building, walk straight down the hallway till the
					stairs. Continue down the steps (there&#39;s a ramp to the left for
					accessibility) and check in at the large desk in the lobby. If you
					cannot get inside the venue at any point, please let an organizer know
					via Slack, and we&#39;d be happy to help.
				</p>
				<p>
					Map:{" "}
					<a href="https://map.concept3d.com/?id=463#!ce/8403?ct/55161,27429,35849?m/367524?s/">
						https://map.concept3d.com/?id=463#!ce/8403?ct/55161,27429,35849?m/367524?s/
					</a>
				</p>

				<h4>Pre-Hack-At-UCI Checklist</h4>
				<ul>
					<li>Confirm your attendance by clicking on the button below</li>
					<li>Sign the liability waiver once it has been sent to your email</li>
					<li>Join the Slack once the invite has been sent to your email</li>
					<li>
						Bring a <strong>photo ID for check</strong> in on Day 1, and your{" "}
						<strong>badge</strong> to check in on Day 2 and 3. Other items to
						bring include a laptop + charger, refillable water bottle, and a
						positive attitude to the event!
					</li>
				</ul>

				<h4>Questions/Comments</h4>
				<p>
					If you have any questions that have not yet been answered, please
					reach out to us at <u>hack@uci.edu</u>, and we will be glad to assist
					you with your concerns.
				</p>
				<p>
					Best Regards, <br />
					The Hack at UCI 2023 Team
				</p>
			</>
		),
		denied: (
			<p>
				Thank you for applying to Hack at UCI this year. We have read through
				many applications so far, and unfortunately are unable to offer you a
				spot at our event. We highly encourage you to continue developing your
				skills and passion for technology. We would love to see you apply again
				next year!
			</p>
		),
	};

	return <div className={styles.message}>{messages[props.status]}</div>;
}

export default Message;
