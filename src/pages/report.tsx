import { TitleBanner } from "components";
import Router from "next/router";

export default function Report() {
	Router.push("https://forms.gle/yM8Revi2NLHGNKs17");
	return (
		<TitleBanner>
			<h1>Loading...</h1>
		</TitleBanner>
	);
}
