import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import styles from "./Resource.module.scss";

interface ResourceProps {
	resourceIndex: string;
	name: string;
	link: string;
	tooltip: string;
}

function Resource({ resourceIndex, name, link, tooltip }: ResourceProps) {
	return (
		<>
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip id={"resource-description"}>{tooltip}</Tooltip>}
			>
				<a
					className={
						(resourceIndex === "gold"
							? styles["badge-gold"]
							: styles["badge-dark"]) + " d-block my-3 p-3 rounded-pill badge"
					}
					href={link}
					style={{ textDecoration: "none" }}
				>
					{name}
				</a>
			</OverlayTrigger>
		</>
	);
}

export default Resource;
