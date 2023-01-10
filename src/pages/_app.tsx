import type { AppProps } from "next/app";
import Head from "next/head";

import { Footer, Navigation } from "components";
import FontProvider from "utils/FontProvider";

import "styles/bootstrap.scss";
import "styles/globals.css";
import "styles/hackuci.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<FontProvider />
			<Navigation />
			<main>
				<Component {...pageProps} />
			</main>
			<Footer />
		</>
	);
}
