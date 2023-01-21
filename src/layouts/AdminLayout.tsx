import { useRouter } from "next/router";
import { PropsWithChildren, useContext, useEffect } from "react";

import { AdminSidebar } from "admin/components";
import UserContext from "utils/userContext";

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
		<>
			<AdminSidebar />
			<main>{children}</main>
		</>
	);
}

export default AdminLayout;
