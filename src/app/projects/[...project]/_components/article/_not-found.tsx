import Link from 'next/link'
import {
	Container,
	Title,
	Text,
	Paper,
} from "@mantine/core"

export default function NotFound({
}: {
}) {
	return (
		<Container
			size="xl"
		>
			<Paper
				withBorder
				p="xl"
				m="md"
				radius="lg"
				shadow='md'
				w="100%"
			>
			<Title
				order={2}
				>Journal not found</Title>
			<Text
				size="xs"
				>
				Please check the URL and try again
			</Text>
			<Link
				href={`/projects`}
				>Return to Project Page
			</Link>
			</Paper>
		</Container>
	)
}