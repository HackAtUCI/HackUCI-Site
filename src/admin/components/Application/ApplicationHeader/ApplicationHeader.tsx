interface ApplicationHeaderProps {
	firstName: string;
	lastName: string;
	email: string;
	submissionTime: string;
}

function ApplicationHeader({
	firstName,
	lastName,
	email,
	submissionTime,
}: ApplicationHeaderProps) {
	return (
		<div className="mb-5">
			<h1>
				{firstName} {lastName}
			</h1>
			<div className="text-center">
				<a href={`mailto:${email}`}>{email}</a>
				<p>
					<strong>Submitted at: </strong>
					{submissionTime}
				</p>
			</div>
		</div>
	);
}

export default ApplicationHeader;
