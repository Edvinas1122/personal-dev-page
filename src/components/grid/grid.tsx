"use client";
import {
	Container,
	Grid,
	SimpleGrid,
	Skeleton,
	Title,
	rem
} from '@mantine/core';
import {
	ArticleCardImage,
	ArticleCard,
	ImageCard,
	ArticleCardVertical,
	ImageArticleCardProps
} from '../article-cards/card';

export type ArticleProps = {
	title: string;
	description: string;
	link: string;
	image: string;
	type: string;
	created_date: string;
	external_deps: {
		title: string,
		image: string,
		description: string,
		url: string,
	}[];
};

export function ArticleGrid({
	articles,
}: {
	articles?: ArticleProps[];
}) {

	const PRIMARY_COL_HEIGHT = rem(380);
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

	if (!articles) {
		return (
			<ArticleGridSkeleton
				primaryHeight={PRIMARY_COL_HEIGHT}
				secondaryHeight={SECONDARY_COL_HEIGHT}
			/>
		);
	}

	return (
		<Container my="lg" size={"lg"}>
		<Title my="md">
			Projects
		</Title>
		<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
				<ArticleCard 
					height={PRIMARY_COL_HEIGHT}
					badge={{
						title: articles[0].type,
					}}
					image={articles[0].image}
					radius='md'
					title={articles[0].title}
					description={articles[0].description}
					external_deps={articles[0].external_deps}
				/>
			<Grid gutter="lg">
			<Grid.Col span={6}>
				<ArticleCard 
					height={PRIMARY_COL_HEIGHT}
					badge={{
						title: articles[1].type,
					}}
					image={articles[1].image}
					radius='md'
					title={articles[1].title}
					description={articles[1].description}
					external_deps={articles[1].external_deps}
				/>
			</Grid.Col>
			<Grid.Col span={6}>
				<ArticleCard 
					height={PRIMARY_COL_HEIGHT}
					badge={{
						title: articles[2].type,
					}}
					image={articles[2].image}
					radius='md'
					title={articles[2].title}
					description={articles[2].description}
					external_deps={articles[2].external_deps}
				/>
			</Grid.Col>
			</Grid>
		</SimpleGrid>
		</Container>
	);
}

export function ArticleGridSkeleton({
	primaryHeight,
	secondaryHeight,
}: {
	primaryHeight: string;
	secondaryHeight: string;
}) {
	return (
		<Container my="lg" size={"lg"}>
		<Title my="md">
			Projects
		</Title>
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
		</Container>
	)
}

export type {ImageArticleCardProps};