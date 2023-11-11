"use client";
import {
	Container,
	Grid,
	SimpleGrid,
	Skeleton,
	Title,
	TextInput,
	rem
} from '@mantine/core';
import {
	ArticleCardProps,
	GeneralArticleCard
} from '../../article-cards/card';
import { m, motion } from "framer-motion";
const item = {
	hidden: { y: 20, opacity: 0, filter: "blur(1px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)"
	}
};
const container = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		}
	}
};
import { IconSearch } from '@tabler/icons-react';
import React from 'react';
import {
	useIntersection,
	useWindowScroll,
	useMediaQuery
} from "@mantine/hooks";

export function ArchitecturePreviewGrid({
	articles,
}: {
	articles?: ArticleCardProps[];
}) {
	const { ref, entry } = useIntersection({
		// root: window.
		threshold: 1,
	});
	const matches = useMediaQuery('(max-width: 1000px)');
	const [scroll, scrollTo] = useWindowScroll();
	const [visible, setVisible] = React.useState(false);
	React.useEffect(() => {
		if (matches) {
			setVisible(true);
			return;
		}
		if (entry?.isIntersecting && !visible) {
			console.log("intersecting");
			// scrollToProjects();
			setVisible(true);
		} else if (!entry?.isIntersecting && visible && scroll.y < 200) {
			console.log("not intersecting");
			setVisible(false);
		}
	}, [entry, matches]);
	const PRIMARY_COL_HEIGHT = rem(280);
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
	
	function scrollToProjects() {
		const element = document.getElementById('Projects');
		if (!element) return;
		const offsetTop = element.offsetTop - 100;
		if (!matches) {
			scrollTo({x: 0, y: offsetTop});
		}
	}

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
		<Title 
			my="md"
			ref={ref}
		>
			Projects
		</Title>
		<TextInput
				placeholder="Search"
				size="xs"
				leftSection={
					<IconSearch
						style={{
							width: rem(12),
							height: rem(12)
						}}
						stroke={1.5}
						/>
				}
				rightSectionWidth={70}
				styles={{ section: { pointerEvents: 'none' } }}
				mb="sm"
			/>
		<motion.ul
			variants={container}
			initial="hidden"
			animate={visible ? "visible" : "hidden"}
			style={{ 
				listStyle: "none",
				padding: 0,
			 }}
		>
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