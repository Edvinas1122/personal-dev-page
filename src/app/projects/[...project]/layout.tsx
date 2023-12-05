import dynamic from 'next/dynamic'

const ProjectNavTabs = dynamic(
	() => import('../_components/navTabs'),
	{
		loading: () => <p>Loading...</p>
	}
)

import Selector from "./_components/display/selector"
import styles from "./reader.module.css"
import {Group} from "@mantine/core"

export default function ArticleReaderLayout({
	children,
	select,
}: {
	children: React.ReactNode
	select: React.ReactNode
}) {

	return (
		<>
			<ProjectNavTabs/>
			<main
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
					gap: "1em",
				}}
			>
				<Selector
					as={Group}
					className={styles.selector}
					comprisedFrom={4}
					comprisedStyle={{
						visibleFrom: "lg",
						// maxWidth: "240px",
					}}
					uncomprisedStyle={{
						w: "100%"
					}}
				>
					{select}
				</Selector>
				{children}
			</main>
		</>
	);
}