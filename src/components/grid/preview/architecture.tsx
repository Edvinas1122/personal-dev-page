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
	ArticleCardProps,
	GeneralArticleCard
} from '../../article-cards/card';
import { motion } from "framer-motion";
const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1
	}
};
const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		}
	}
};
import React from 'react';
import { useIntersection } from "@mantine/hooks";

export function ArchitecturePreviewGrid({
	articles,
}: {
	articles?: ArticleCardProps[];
}) {
	const { ref, entry } = useIntersection({
		// root: window.
		threshold: 1,
	});
	const [visible, setVisible] = React.useState(false);
	React.useEffect(() => {
		if (entry?.isIntersecting) {
			console.log("intersecting");
			setVisible(true);
		}
	}, [entry]);
	const PRIMARY_COL_HEIGHT = rem(280);
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
		<Container
			my="lg"
			size={"lg"}
			style={{ 
				paddingTop: rem(64),
			}}
		>
		<motion.ul
			variants={container}
			initial="hidden"
			animate={visible ? "visible" : "hidden"}
			style={{ 
				listStyle: "none",
				padding: 0,
			 }}
		>
		<Title 
			my="md"
			ref={ref}
		>
			Projects
		</Title>
		<SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
			<motion.li variants={item}>
			<GeneralArticleCard
				{...articles[0]}
				height={PRIMARY_COL_HEIGHT}
				/>
			</motion.li>
			<motion.li variants={item}>
			<GeneralArticleCard
				{...articles[1]}
				height={PRIMARY_COL_HEIGHT}
			/>
			</motion.li>
			<motion.li variants={item}>
			<GeneralArticleCard 
				{...articles[2]}
				height={PRIMARY_COL_HEIGHT}
			/>
			</motion.li>
			<Grid>
				<Grid.Col span={6}>
				<motion.li variants={item}>
					<GeneralArticleCard 
						{...articles[3]}
						height={PRIMARY_COL_HEIGHT}
						/>
				</motion.li>
				</Grid.Col>
				<Grid.Col span={6}>
				<motion.li variants={item}>
					<GeneralArticleCard 
						{...articles[4]}
						height={PRIMARY_COL_HEIGHT}
						/>
				</motion.li>
				</Grid.Col>
			</Grid>
		</SimpleGrid>
		</motion.ul>
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

export type {ArticleCardProps};