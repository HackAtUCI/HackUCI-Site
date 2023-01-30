const URL_CODE_OF_CONDUCT =
	"https://docs.google.com/document/u/1/d/e/2PACX-1vRPuYBKQ2YR64FVzDKunDeVkeFGD573hSqfTmf8JwvyhlvPQPEnovxhlYbal45WI3k3Jr2iLNRzz1Hp/pub";
const URL_TEAM_FORMATION_SLIDES =
	"https://docs.google.com/presentation/d/1qjAzK9ocrI5Lg2D8l4VnE38CWDU2bW2v3XqAROA-vR4/edit";

const URL_MAP_STUDENT_CENTER = "https://map.uci.edu/?id=463#!m/255880";
const URL_PACIFIC_BALLROOM_LOBBY =
	"https://conference.studentaffairs.uci.edu/node/24";
const URL_MAP_SCPS = "https://map.concept3d.com/?id=463#!m/367524?s/";

function AcceptedMessage() {
	return (
		<>
			<h4>Waiver</h4>
			<p>
				ALL ATTENDEES, please review our{" "}
				<a href={URL_CODE_OF_CONDUCT}>Code of Conduct</a> and sign the Event
				Waiver prior to the event. You will receive the waiver via email closer
				to the event date.{" "}
				<strong className="text-danger">
					You must complete the waiver in order to participate in Hack at UCI.
				</strong>
			</p>

			<h4>Communication</h4>
			<p>
				Communication during the event will primarily be done through a Slack
				workspace. You will receive an invite via email closer to the event
				date.
			</p>

			<h4>Team Formation</h4>
			<p>Still looking for teammates? Attend our two team formation events!</p>
			<ol>
				<li>Thursday from 7&ndash;8 PM at DBH 6011</li>
				<li>Friday from 7&ndash;8 PM at Student Center Pacific Ballroom</li>
			</ol>
			<p>
				You can also create an introductory slide on our{" "}
				<a href={URL_TEAM_FORMATION_SLIDES}>team formation slides</a> to connect
				with other hackers or use the #team-formation channel in our Slack
				workspace to find teammates! Teams are limited to groups of up to four.
			</p>

			<h4>Health and Safety Protocols</h4>
			<p>
				Please be mindful of your personal health and of those around you.
				Although not required, we strongly encourage wearing masks, and please
				stay home if you feel sick. To help us ensure your safety at the venue,
				please keep your <strong>badge</strong> (issued at check-in){" "}
				<strong>visible at all times</strong>.
			</p>

			<h4>Venue Information</h4>
			<p>
				Hack at UCI 2023 will take place (not overnight) on Friday evening,
				all-day Saturday, and approximately the first half of Sunday on campus
				at UC Irvine Student Center.{" "}
				<strong className="text-danger">
					You must check in on all three event days in order to be eligible to
					win prizes, specifically attending the opening ceremony on Friday,
					project expo for judging on Sunday, and completing the Midway check-in
					form on Saturday
				</strong>
				. Hackathon events will take place in the following rooms:
			</p>
			<ul style={{ listStyleType: "none", paddingLeft: 0 }}>
				<strong>Pacific Ballroom Lobby:</strong> Check-In
				<li>
					<strong>Pacific Ballroom ABCD:</strong> Hacking Space
				</li>
				<li>
					<strong>Woods Cove B + C:</strong> Hacking Space
				</li>
				<li>
					<strong>Moss Cove A + B:</strong> Workshops and Socials
				</li>
			</ul>
			<p>
				<a href={URL_MAP_STUDENT_CENTER}>Map to UCI Student Center</a>
				<br />
				<a href={URL_PACIFIC_BALLROOM_LOBBY}>Student Center Floor Map</a>
			</p>
			<h4>On-Campus Parking</h4>
			<p>
				<strong>Attendees will be responsible for their own parking.</strong>{" "}
				The closest parking structure to our event is the UCI Student Center
				Parking Structure. This structure provides both pay-by-space ($2 per
				hour) and permit dispensers ($1 per hour or $13 per day). You may
				purchase a permit at any information kiosk, dispenser, or through
				UCI&apos;s ParkbyPlate signage located in select parking areas. All
				options accept major credit cards (Visa, MasterCard, American Express,
				Discover). These dispensers are available from 7AM&ndash;7PM.
			</p>
			<p>
				To enter the venue from the parking structure, cross Pereira Dr. and
				enter the building with the large arch labeled “Student Center”. Once
				you enter the building, walk straight down the hallway till the stairs.
				Continue down the steps (there&apos;s a ramp to the left for
				accessibility) and check in at the large desk in the lobby. If you
				cannot get inside the venue at any point, please let an organizer know
				via Slack, and we&apos;d be happy to help.
			</p>
			<p>
				<a href={URL_MAP_SCPS}>Map to UCI Student Center Parking Structure</a>
			</p>

			<h4>General Schedule</h4>
			<p>
				<u>Thursday (2/2):</u>
				<br />
				7:00 PM - Team Formation #1 (at DBH 6011)
			</p>

			<p>
				<u>Friday (2/3):</u> <br />
				5:00 PM - Venue Opens for Day 1 Check-In <br />
				6:00 PM - Dinner <br />
				7:00 PM - Team Formation #2 <br />
				8:00 PM - Opening Ceremony <br />
				<strong> 9:00 PM - Hacking Begins</strong> <br />
				12:00 AM - Venue Closes <br />
			</p>

			<p>
				<u>Saturday (2/4):</u> <br />
				8:00 AM - Venue Opens for Day 2 Check-In <br />
				12:00 AM - Venue Closes <br />
			</p>

			<p>
				<u>Sunday (2/5):</u> <br />
				7:00 AM - Venue Opens for Day 3 Check-In <br />
				<strong> 9:00 AM - Hacking Ends</strong> <br />
				9:30 AM - Project Expo / Judging <br />
				12:30 PM - Closing Ceremony <br />
			</p>

			<h4>Pre-Hack-At-UCI Checklist</h4>
			<ol>
				<li>
					Confirm your attendance by clicking on the RSVP button at the bottom
					of the page
				</li>
				<li>Sign the liability waiver once it has been sent to your email</li>
				<li>
					Join our Slack workspace once the invite has been sent to your email
				</li>
				<li>
					Bring a <strong>photo ID</strong> for check-in on Day 1, and your{" "}
					<strong>badge</strong> to check in on Day 2 and 3. Other items to
					bring include a laptop + charger, refillable water bottle, and a
					positive attitude to the event!
				</li>
			</ol>

			<h4>Questions/Comments</h4>
			<p>
				If you have any questions that have not yet been answered, please reach
				out to us at <a href="mailto:hack@uci.edu">hack@uci.edu</a>, and we will
				be glad to assist you with your concerns.
			</p>
			<p>
				Best Regards,
				<br />
				The Hack at UCI 2023 Team
			</p>
		</>
	);
}

export default AcceptedMessage;
