/** @type {import('next').NextConfig} */
const baseConfig = {
	reactStrictMode: true,
	transpilePackages: ["@cloudscape-design/components"],
};

const REWRITES = [
	{
		source: "/mentor",
		destination: "https://forms.gle/tcnikpj5gHnGPNvx7",
	},
	{
		source: "/volunteer",
		destination: "https://forms.gle/bLw9nHffqoz4kAGR7",
	},
	{
		source: "/report",
		destination: "https://forms.gle/yM8Revi2NLHGNKs17",
	},
	{
		source: "/feedback",
		destination: "https://forms.gle/eo7gaNCQVH3PRJep7",
	},
	{
		source: "/googlecloud",
		destination: "https://goo.gle/googlecloudcredits",
	},
];

const REDIRECTS = [
	{
		source: "/devpost",
		destination: "https://hack-at-uci-2023.devpost.com",
		permanent: true,
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	...baseConfig,
	swcMinify: false,
	async rewrites() {
		return REWRITES;
	},
	async redirects() {
		return REDIRECTS;
	},
};

/** @type {import('next').NextConfig} */
const devConfig = {
	...baseConfig,
	async rewrites() {
		return REWRITES.concat([
			{
				source: "/api/:path*",
				destination: "http://127.0.0.1:8000/:path*",
			},
		]);
	},
	async redirects() {
		return REDIRECTS;
	},
};

const developmentEnv = process.env.NODE_ENV === "development";
module.exports = developmentEnv ? devConfig : nextConfig;
