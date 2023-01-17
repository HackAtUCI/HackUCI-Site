import checkCircleFill from "assets/icons/check-circle-fill.svg";
import questionCircleFill from "assets/icons/question-circle-fill.svg";
import xCircleFill from "assets/icons/x-circle-fill.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Button from "react-bootstrap/Button";
import styles from "./SearchResults.module.scss";

import { SidebarDisplay, Status } from "admin/views/applications/Applications";

interface SearchResultsProps {
	data: SidebarDisplay[];
	results: number[];
	setUser: Dispatch<SetStateAction<number>>;
}

function SearchResults({ data, results, setUser }: SearchResultsProps) {
	return (
		<>
			{results.map((index) => {
				let statusIcon;
				switch (data[index].status) {
					case Status.accepted:
						statusIcon = checkCircleFill;
						break;
					case Status.rejected:
						statusIcon = xCircleFill;
						break;
					default:
						statusIcon = questionCircleFill;
				}
				return (
					<Button
						key={index}
						onClick={() => setUser(index)}
						variant="none"
						className={styles["user-button"]}
					>
						<span className="me-3">{data[index].name}</span>
						<Image src={statusIcon} alt="status icon" />
					</Button>
				);
			})}
		</>
	);
}

export default SearchResults;
