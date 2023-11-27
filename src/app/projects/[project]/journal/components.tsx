import {
	Group,
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
			<Group
				my="md"
				align="baseline"
				display="flex"
				style={{
					width: "-webkit-fill-available",
					flexDirection: "column",
				}}
			>
				{children}
			</Group>
			<Group
				my="md"
				ml="xs"
				align="start"
				visibleFrom="lg"
			>
				{contents}
			</Group>
		</>
	);
}