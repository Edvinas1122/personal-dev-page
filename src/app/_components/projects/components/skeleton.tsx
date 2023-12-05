"use client";
import {
	Group,
	SimpleGrid,
	Skeleton,
	Grid,
	rem
} from "@mantine/core"

export default function GridSkeleton() {

	const primaryHeight = rem(280);

	return (
		<Group
			my="lg"
		>
		<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
			<Skeleton height={primaryHeight} radius="md" animate={true} />
			<Grid gutter="lg">
			<Grid.Col span={6}>
				<Skeleton height={primaryHeight} radius="md" animate={true} />
			</Grid.Col>
			<Grid.Col span={6}>
				<Skeleton height={primaryHeight} radius="md" animate={true} />
			</Grid.Col>
			</Grid>
		</SimpleGrid>
		</Group>
	)
}