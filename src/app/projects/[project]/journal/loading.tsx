import {
	ArticleLayout
} from "./components";
import {
	Skeleton,
	Button
} from '@mantine/core';

function LoadingSkeleton() {
	return (
		<div>
			Loading...
		</div>
	)
}

export default function Loading() {
	return (
		<ArticleLayout
			contents={
				<LoadingSkeleton />
			}
		>
			<>
			{[...Array(10)].map((_, i) => (
				<Skeleton
					key={i}
					height={100}
					width="100%"
					radius="md"
					/>
				))}
			</>
		</ArticleLayout>
	)
  }