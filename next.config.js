/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
}

module.exports = nextConfig

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	// enabled: process.env.ANALYZE === 'true',
// 	enabled: true,
// });

// const config = {
// 	...withBundleAnalyzer({
// 		reactStrictMode: true,
// 		swcMinify: true,
// 	}),

// }

// module.exports = config;