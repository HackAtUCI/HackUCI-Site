import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect } from "react";

import AppLayout from "@cloudscape-design/components/app-layout";

import UserContext from "utils/userContext";

import AdminSidebar from "./AdminSidebar";
import Breadcrumbs from "./Breadcrumbs";

const ADMIN_ROLES = ["director", "reviewer"];

function AdminLayout({ children }: PropsWithChildren) {
	const { uid, role } = useContext(UserContext);
	const router = useRouter();

	const loggedIn = uid !== null;
	const authorized = role && ADMIN_ROLES.includes(role);

	useEffect(() => {
		if (!loggedIn) {
			router.replace("/login");
		}
		if (!authorized) {
			router.replace("/unauthorized");
		}
	}, [router, loggedIn, authorized]);

	if (!loggedIn || !authorized) {
		return null;
	}

	return (
		<AppLayout
			content={children}
			navigation={<AdminSidebar />}
			breadcrumbs={<Breadcrumbs />}
		/>
	);
}

export default AdminLayout;
