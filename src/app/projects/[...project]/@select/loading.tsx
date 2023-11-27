import {
	RouteReactiveGrid,
	ActiveSegmentLayout
} from "./components";
import {
	Skeleton
} from '@mantine/core';

export default function Loading() {
	return (
		<>
			<RouteReactiveGrid
				heading={
					<>
						<Skeleton
							width="80px"
							height={10}
							radius="md"
							m={5}
						/>
					</>
				}
			>
				<>
				{[...Array(8)].map((_, i) => (
					<ActiveSegmentLayout
						key={i}
						states={{
							activeSegment: false,
						}}
						title={
							<>
								<Skeleton
									width="100%"
									height={20}
									radius="md"
								/>
							</>
						}
					>
						<Skeleton
							key={i}
							height="-webkit-fill-available"
							width="-webkit-fill-available"
							radius="md"
						/>
					</ActiveSegmentLayout>
					))}
				</>
			</RouteReactiveGrid>
		</>
	);
}