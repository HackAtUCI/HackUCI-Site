import { useEffect, useState } from "react";

import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";

import { AdminLayout } from "layouts";
import MainLayout from "layouts/MainLayout";
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

export default function MyApp({ Component, pageProps }: AppProps) {
	const [identity, setIdentity] = useState<Identity>();

	const router = useRouter();

	useEffect(() => {
		const getIdentity = async () => {
			const res = await axios.get(`/api/user/me`);
			const identity = res.data;
			setIdentity(identity);
		};

		getIdentity();
	}, []);

	const Layout = router.pathname.startsWith("/admin/")
		? AdminLayout
		: MainLayout;

	return (
		<>
			<Head>
				<title>Hack at UCI 2023</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="description"
					content="Create. Connect. Inspire. Join us as Hack at UCI gathers the tech community from all over in a spectacular display of ideas, ambition, and talent."
				/>
				<meta property="og:title" content="Hack at UCI 2023" />
				<meta
					property="og:description"
					content="The largest collegiate hackathon in Orange County"
				/>
				<meta
					property="og:image"
					content="https://hackuci.com/hackuci_2023_banner.png"
				/>
			</Head>
			<FontProvider />
			{!identity && <Loading />}
			{identity && (
				<UserContext.Provider value={identity}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
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
