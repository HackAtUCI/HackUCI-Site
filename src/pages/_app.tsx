import type { AppProps } from "next/app";

import { Footer, Navigation } from "components";
import FontProvider from "utils/FontProvider";

import "styles/bootstrap.scss";
import "styles/globals.css";
import "styles/hackuci.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<FontProvider />
			<Navigation />
			<main>
				<Component {...pageProps} />
			</main>
			<Footer />
		</>
	);
}
