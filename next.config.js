/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
};

/** @type {import('next').NextConfig} */
const devConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "http://127.0.0.1:8000/:path*",
			},
		];
	},
};

const developmentEnv = process.env.NODE_ENV === "development";
module.exports = developmentEnv ? devConfig : nextConfig;
