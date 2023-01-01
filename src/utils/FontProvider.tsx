import { Merriweather, Open_Sans } from "@next/font/google";

const merriweather = Merriweather({
	weight: ["700"],
	subsets: ["latin"],
	display: "swap",
});

const open_sans = Open_Sans({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

function FontProvider() {
	return (
		<style jsx global>
			{`
				:root {
					--next-font-open-sans: ${open_sans.style.fontFamily};
					--next-font-merriweather: ${merriweather.style.fontFamily};
				}
			`}
		</style>
	);
}

export default FontProvider;
