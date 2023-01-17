import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

import { Footer, Navigation } from "components";
import MuseumRoom from "./MuseumRoom";

function MainLayout({ children }: PropsWithChildren) {
	const router = useRouter();

	return (
		<>
			<Navigation />
			<main>
				<MuseumRoom rotating={router.pathname === "/"}>{children}</MuseumRoom>
			</main>
			<Footer />
		</>
	);
}

export default MainLayout;
