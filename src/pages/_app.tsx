import { Footer, Navigation } from "components";
import type { AppProps } from "next/app";
import "styles/bootstrap.scss";
import "styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Navigation />
			<main>
				<Component {...pageProps} />
			</main>
			<Footer />
		</>
	);
}
