import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import Head from "next/head";

import { Footer, Navigation } from "components";
import FontProvider from "utils/FontProvider";
import UserContext, { Identity } from "utils/userContext";

import "styles/bootstrap.scss";
import "styles/globals.css";
import "styles/hackuci.scss";

const BASE_PATH =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: process.env.NEXT_PUBLIC_DEPLOYMENT === "STAGING"
		? "https://staging.hackuci.com"
		: "https://hackuci.com";

interface AppPropsWithIdentity extends AppProps {
	identity: Identity;
}

export default function MyApp({
	Component,
	pageProps,
	identity,
}: AppPropsWithIdentity) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<FontProvider />
			<UserContext.Provider value={identity}>
				<Navigation />
				<main>
					<Component {...pageProps} />
				</main>
			</UserContext.Provider>
			<Footer />
		</>
	);
}

MyApp.getInitialProps = async (context: AppContext) => {
	const ctx = await App.getInitialProps(context);

	const req = context.ctx.req;
	const res = await fetch(`${BASE_PATH}/api/user/me`, {
		headers: { Cookie: req?.headers.cookie || "" },
	});
	const identity = await res.json();

	return {
		...ctx,
		identity,
	};
};
