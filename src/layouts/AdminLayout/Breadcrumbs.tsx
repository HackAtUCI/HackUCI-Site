import { useRouter } from "next/router";

import BreadcrumbGroup, {
	BreadcrumbGroupProps,
} from "@cloudscape-design/components/breadcrumb-group";

import { BASE_PATH, followWithNextLink } from "./common";

interface PathTitles {
	[key: string]: string;
}

const pathTitles: PathTitles = {
	"/admin/applicants": "Applicants",
};

function Breadcrumbs() {
	const router = useRouter();

	const currentPath = router.pathname;

	const breadcrumbItems: BreadcrumbGroupProps.Item[] = [
		{ text: "HackUCI 2023", href: BASE_PATH },
	];

	if (currentPath !== BASE_PATH) {
		breadcrumbItems.push({ text: pathTitles[currentPath], href: "" });
	}

	return (
		<BreadcrumbGroup
			items={breadcrumbItems}
			ariaLabel="Breadcrumbs"
			onFollow={followWithNextLink}
		/>
	);
}

export default Breadcrumbs;
