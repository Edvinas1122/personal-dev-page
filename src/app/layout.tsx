import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import Script from 'next/script';
import "@mantine/core/styles.css";
import '@mantine/code-highlight/styles.css';
// import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Personal-Portal',
	description: 'an app for personal project bloging, documentation, and more',
}

export default function RootLayout({
	children,
	navbar,
}: {
	children: React.ReactNode
	navbar: React.ReactNode
}) {
return (
	<html lang="en">
		<Script id="color_scheme_script">
			<ColorSchemeScript />
		</Script>
		<body className={inter.className}>
			<MantineProvider
				theme={theme}
			>
				{navbar}
				{children}
			</MantineProvider>
		</body>
	</html>
)
}
