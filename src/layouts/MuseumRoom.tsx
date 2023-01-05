import { PropsWithChildren } from "react";

import { CarouselGallery } from "components";

interface MuseumRoomProps extends PropsWithChildren {
	rotating?: boolean;
}

function MuseumRoom({ rotating, children }: MuseumRoomProps) {
	return (
		<>
			<CarouselGallery rotating={rotating || false} />
			<div style={{ position: "relative" }}>{children}</div>
		</>
	);
}

export default MuseumRoom;
