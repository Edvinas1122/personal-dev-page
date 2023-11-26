import { Container } from '@mantine/core';


export default function ProjectRootPage({
	params,
	children,
}: {
	params: {
		project: string
	},
	children: React.ReactNode
}) {

	return (
		<>
			<Container
				// p="xl"
				size="md"
			>
			{children}
			</Container>
		</>
	);
}