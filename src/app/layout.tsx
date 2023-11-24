import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import Script from 'next/script';
import "@mantine/core/styles.css";
import '@mantine/code-highlight/styles.css';
// import 
// 	GlobalHeaderLayout
// from "@/components/header/global"
import dynamic from 'next/dynamic'
import "./globals.css";

const inter = Inter({ subsets: ['latin'] })

const GlobalHeaderLayout = dynamic(
	() => import("@/components/header/global")
);

export const metadata: Metadata = {
	title: 'Personal-Portal',
	description: 'an app for personal project bloging, documentation, and more',
}

export default function RootLayout({
	children,
	header,
}: {
	children: React.ReactNode
	header: React.ReactNode
}) {
	return (
		<html lang="en">
			<Script 
				strategy='lazyOnload'
				id="color_scheme_script"
			>
				<ColorSchemeScript />
			</Script>
			<body className={inter.className}>
				<MantineProvider
					theme={theme}
				>
				<GlobalHeaderLayout>
					{header}
				</GlobalHeaderLayout>
				{children}
				<div 
					style={{
						height: "500px",
					}}
				>
				</div>
				</MantineProvider>
			</body>
		</html>
	)
}
