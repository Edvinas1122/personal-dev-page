"use client";
import {
	Container,
	Grid,
	SimpleGrid,
	Skeleton,
	Title,
	TextInput,
	rem,
	Group
} from '@mantine/core';
import {
	ArticleCardProps,
	GeneralArticleCard
} from '../../article-cards/card';
import { AnimatePresence, m, motion } from "framer-motion";
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
import { usePathname } from 'next/navigation';
import { url_string } from '@/utils/url_string';
// import {
// 	useIntersection,
// 	useWindowScroll,
// 	useMediaQuery
// } from "@mantine/hooks";

export function ArchitecturePreviewGrid({
	articles,
}: {
	articles?: ArticleCardProps[];
}) {
	// const path = usePathname();
	const visible = true;
	const PRIMARY_COL_HEIGHT = rem(280);
	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

	// console.log("articles", path);

	function mathPathToArticleName(path: string) {
		const pathArray = path.split("/");
		const articleName = pathArray[pathArray.length - 1];
		if (!articleName) {
			return "projects";
		}
		return url_string(articleName);
	}

	function findPathInArticles(path: string, articles: ArticleCardProps[]): string | null {
		const paths = path.split("/").map((segment) => url_string(segment));
		const article = articles.find((article) => {
			return paths.includes(url_string(article.title));
		});
		if (!article) {
			return null;
		}
		return article.title;
	}

	function getArticleIndexFromPath(
		path: string,
		articles: ArticleCardProps[]
	) {
		const articleName = mathPathToArticleName(path);
		const articleIndex = articles.findIndex(
			(article) => article.title === articleName
		);
		return articleIndex;
	}

	if (!articles) {
		return (
			<ArticleGridSkeleton
				primaryHeight={PRIMARY_COL_HEIGHT}
				secondaryHeight={SECONDARY_COL_HEIGHT}
			/>
		);
	}

	// const articleIndex = getArticleIndexFromPath(path, articles);



	const Element = ({
		props
	}:{
		props: ArticleCardProps & { 
			height: string,
			index: number,
			selected: string | null,
		};
	}) => {
		const [visible, setVisible] = React.useState(true);

		React.useEffect(() => {
			setVisible(!props.selected || props.selected === props.title);
		}, [
			props.selected,
		]);

 		return 	(visible && <motion.li key={props.index} variants={item}
					exit={{ opacity: 0, transition: { duration: 1, dely: 1 } }}
					style={{
						transition: "width 0.7s ease-in-out 0.5s",
					}}
				>
					<GeneralArticleCard
						hide_read_more={props.selected !== null}
					{...props} height={PRIMARY_COL_HEIGHT}
					/>
				</motion.li>);

	};

	const MotionSimpleGrid = motion(SimpleGrid);

	const InnerContents = () => {
		const path = usePathname();

		const isSelected = path.split("/").length > 2;
		const singleSelected = (isSelected) ? isSelected : null;
		
		if (!articles) {
			return (
				<ArticleGridSkeleton
				primaryHeight={PRIMARY_COL_HEIGHT}
				secondaryHeight={SECONDARY_COL_HEIGHT}
				size={singleSelected ? "md" : "lg"}
				/>
				);
			}
		const selected = findPathInArticles(path, articles);
		const cols = selected ? 1 : { base: 1, sm: 2, md: 2, lg: 3 };

		return (
			<MotionSimpleGrid
				cols={cols}
				spacing="md"
				variants={container}
				initial="hidden"
				animate={visible ? "visible" : "hidden"}
				style={{
					listStyle: "none",
					padding: 0,
				}}
			>
				{articles.map((article, index) => (
					<Element
						key={index}
						props={{ ...article, index, selected: selected }}
					/>
				))}
			</MotionSimpleGrid>
		);
	}
	return (
		<InnerContents />
	);
}

				// <Container
				// 	my="lg"
				// 	size={"lg"}
				// 	style={{ 
				// 		paddingTop: rem(64),
				// 	}}
				// 	id={"projects"}
				// >
				// <motion.ul
				// 	variants={container}
				// 	initial="hidden"
				// 	animate={visible ? "visible" : "hidden"}
				// 	style={{ 
				// 		listStyle: "none",
				// 		padding: 0,
				// 	}}
				// >
				// <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
				// 	<motion.li variants={item}>
				// 	<GeneralArticleCard
				// 		{...articles[0]}
				// 		height={PRIMARY_COL_HEIGHT}
				// 		/>
				// 	</motion.li>
				// 	<motion.li variants={item}>
				// 	<GeneralArticleCard
				// 		{...articles[1]}
				// 		height={PRIMARY_COL_HEIGHT}
				// 	/>
				// 	</motion.li>
				// 	<motion.li variants={item}>
				// 	<GeneralArticleCard 
				// 		{...articles[2]}
				// 		height={PRIMARY_COL_HEIGHT}
				// 	/>
				// 	</motion.li>
				// 		<SimpleGrid
				// 			cols={{ base: 1, sm: 1, md: 1, lg: 2 }}
				// 			// grow={true}
				// 		>
				// 		{/* <Grid.Col 
				// 			span={6}
				// 		> */}
				// 		<motion.li variants={item}>
				// 			<GeneralArticleCard 
				// 				{...articles[3]}
				// 				height={PRIMARY_COL_HEIGHT}
				// 				/>
				// 		</motion.li>
				// 		{/* </Grid.Col> */}
				// 		{/* <Grid.Col span={6}> */}
				// 		<motion.li variants={item}>
				// 			<GeneralArticleCard 
				// 				{...articles[4]}
				// 				height={PRIMARY_COL_HEIGHT}
				// 				/>
				// 		</motion.li>
				// 		{/* </Grid.Col> */}
				// 	</SimpleGrid>
				// </SimpleGrid>
				// </motion.ul>
				// </Container>

export function ArticleGridSkeleton({
	primaryHeight,
	secondaryHeight,
	size
}: {
	primaryHeight: string;
	secondaryHeight: string;
	size?: string;
}) {
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

export type {ArticleCardProps};