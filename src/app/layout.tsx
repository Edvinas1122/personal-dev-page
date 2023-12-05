import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {
	MantineProvider,
	ColorSchemeScript,
} from "@mantine/core";
import { theme } from "../theme";
import Script from 'next/script';
import "@mantine/core/styles.css";
import '@mantine/code-highlight/styles.css';
import 
	GlobalHeaderLayout
from "@/app/_components/body/global"
// import dynamic from 'next/dynamic'
import "./globals.css";
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] })

// const GlobalHeaderLayout = dynamic(
// 	() => import("@/components/header/global")
// );

export const metadata: Metadata = {
	title: 'Edvinas Momkus',
	description: 'a full stack developer, a portfolio page',
}


export default function RootLayout({
	children,
}: {
	children: React.ReactNode
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
					{children}
				</GlobalHeaderLayout>
				</MantineProvider>
			</body>
		</html>
	)
}
