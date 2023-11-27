import dynamic from 'next/dynamic'

const ProjectNavTabs = dynamic(
	() => import('../components/navTabs'),
	{
		loading: () => <p>Loading...</p>
	}
)

export default function ProjectRootPage({
	params,
	children,
	select,
}: {
	params: {
		project: string[]
	},
	children: React.ReactNode
	select: React.ReactNode
}) {

	const currentPath = `/projects/${params.project[0]}`;

	return (
		<>
			<ProjectNavTabs/>
			<section
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					gap: "1em",
				}}
			>
				<>
				{select}
				</>
				{children}
			</section>
		</>
	);
}