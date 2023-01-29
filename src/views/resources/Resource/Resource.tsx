import { useRef } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "./Resource.module.scss";

interface ResourceProps {
	resourceIndex: number;
	name: string;
	link: string;
	tooltip: string;
}

function Resource({ resourceIndex, name, link, tooltip }: ResourceProps) {
	const target = useRef(null);

	return (
		<>
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip id={"resource-description"}>{tooltip}</Tooltip>}
			>
				<a href={link} style={{ textDecoration: "none" }}>
					<div
						className={
							(resourceIndex % 2 === 0
								? styles["badge-gold"]
								: styles["badge-dark"]) + " d-block my-3 p-3 rounded-pill badge"
						}
						ref={target}
					>
						{name}
					</div>
				</a>
			</OverlayTrigger>
		</>
	);
}

export default Resource;
