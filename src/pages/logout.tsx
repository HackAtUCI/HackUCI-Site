// import { GetServerSideProps } from "next";
import Router from "next/router";

export default function Logout() {
	Router.push("/api/user/logout");
}

// export const getServerSideProps: GetServerSideProps = async ({ res }) => {
// 	res.setHeader("Set-Cookie", "hackuci_auth=; Max-Age=0");
// 	res.writeHead(303, { Location: "/" });
// 	res.end();
// 	return { props: {} };
// 	// return {
// 	// 	redirect: { permanent: false, destination: "/" },
// 	// };
// };
