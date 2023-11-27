import { Container } from '@mantine/core';


export default function ProjectRootPage({
	params,
	children,
	journal,
}: {
	params: {
		project: string
	},
	children: React.ReactNode
	journal: React.ReactNode
}) {

	return (
		<>
			<section
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					gap: "1em",
				}}
			>
				{journal}
				{children}
			</section>
		</>
	);
}