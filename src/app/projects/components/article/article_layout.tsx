import {
	Group,
	Container
} from '@mantine/core';

export function ArticleLayout({
	children,
	contents,
}: {
	children: React.ReactNode
	contents: React.ReactNode
}) {
	return (
		<>
			<article
				style={{
					display: "flex",
					flexDirection: "row",
					width: "-webkit-fill-available",
				}}
			>
				<Container
					my="md"
					// align="baseline"
					size="md"
					display="flex"
					style={{
						width: "-webkit-fill-available",
						flexDirection: "column",
					}}
				>
					{children}
				</Container>
				<Group
					my="md"
					ml="xs"
					align="start"
					visibleFrom="lg"
				>
					{contents}
				</Group>
			</article>
		</>
	);
}