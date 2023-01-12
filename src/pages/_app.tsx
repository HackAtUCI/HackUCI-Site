import { useEffect, useState } from "react";

import axios from "axios";
import type { AppProps } from "next/app";
// import App from "next/app";
import Head from "next/head";

import { Footer, Navigation } from "components";
import FontProvider from "utils/FontProvider";
import Loading from "utils/Loading";
import UserContext, { Identity } from "utils/userContext";

import "styles/bootstrap.scss";
import "styles/globals.css";
import "styles/hackuci.scss";

// const BASE_PATH =
// 	process.env.NODE_ENV === "development"
// 		? "http://localhost:8443"
// 		: process.env.NEXT_PUBLIC_DEPLOYMENT === "STAGING"
// 		? "http://staging.hackuci.com"
// 		: "https://hackuci.com";

// interface AppPropsWithIdentity extends AppProps {
// 	identity: Identity;
// }

export default function MyApp({
	Component,
	pageProps,
}: // identity,
AppProps) {
	const [identity, setIdentity] = useState<Identity>();
	useEffect(() => {
		const getIdentity = async () => {
			const res = await axios.get(`/api/user/me`);
			const identity = res.data;
			setIdentity(identity);
		};

		getIdentity();
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<FontProvider />
			{!identity && <Loading />}
			{identity && (
				<UserContext.Provider value={identity}>
					<Navigation />
					<main>
						<Component {...pageProps} />
					</main>
					<Footer />
				</UserContext.Provider>
			)}
		</>
	);
}

// MyApp.getInitialProps = async (context: AppContext) => {
// 	const ctx = await App.getInitialProps(context);

// 	const req = context.ctx.req;
// 	// if (!req?.headers.cookie) {
// 	// 	return { ...ctx, identity: { uid: null, role: null, status: null } };
// 	// }

// 	const res = await axios.get(`${BASE_PATH}/api/user/me`, {
// 		headers: { cookie: req?.headers.cookie || "" },
// 	});
// 	console.log(res.data);
// 	const identity = res.data;

// 	return {
// 		...ctx,
// 		identity,
// 	};
// };
