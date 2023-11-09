// "use client";
// import {
// 	Badge,
// 	Group,
// 	Title,
// 	Text,
// 	Card,
// 	SimpleGrid,
// 	Container,
// 	Paper,
// 	rem,
// 	useMantineTheme,
// } from '@mantine/core';
// import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
// import classes from './features.module.css';

// const mockdata = [
// 	{
// 	title: 'Extreme performance',
// 	description:
// 		'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
// 	icon: IconGauge,
// 	},
// 	{
// 	title: 'Privacy focused',
// 	description:
// 		'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
// 	icon: IconUser,
// 	},
// 	{
// 	title: 'No third parties',
// 	description:
// 		'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
// 	icon: IconCookie,
// 	},
// ];

// import {
// 	ArticleCard,
// 	ImageArticleCardProps,
// } from '../article-cards/card';


// export type ArticleProps = {
// 	title: string;
// 	description: string;
// 	link: string;
// 	image: string;
// 	type: string;
// 	created_date: string;
// 	external_deps: {
// 		title: string,
// 		image: string,
// 		image_type: "emoji" | "image",
// 		description: string,
// 		url: string,
// 	}[];
// };

// export function FeaturesCards({
// 	projects
// }: {
// 	projects: ArticleProps[]
// }) {

// 	const PRIMARY_COL_HEIGHT = rem(380);
// 	const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;


// 	function articleProps(
// 		index: number,
// 		height: string,
// 	) {
// 		if (!projects) throw new Error("Articles is undefined");
// 		return {
// 			title: "Application",
// 			description: "An imerserive application that allows you to explore the world of pokemon",
// 			image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
// 			height: height,
// 			radius: 'md',
// 			button: 'Read More',
// 			badge: {
// 				title: "application",
// 			},
// 			external_deps: [{
// 				title: "React",
// 				image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
// 			}],
// 		};
// 		return {
// 			title: projects[index].title,
// 			description: projects[index].description,
// 			image: projects[index].image,
// 			height: height,
// 			radius: 'md',
// 			button: 'Read More',
// 			badge: {
// 				title: projects[index].type,
// 			},
// 			external_deps: projects[index].external_deps,
// 		};
// 	}

// 	const theme = useMantineTheme();
// 	const features = mockdata.map((feature, index) => (
// 			<ArticleCard
// 				key={feature.title}
// 				{...articleProps(index, PRIMARY_COL_HEIGHT)}
// 			/>
		
// 	// <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
// 	// 	<feature.icon
// 	// 		style={{ width: rem(50), height: rem(50) }}
// 	// 		stroke={2}
// 	// 		color={theme.colors.blue[6]}
// 	// 	/>
// 	// 	<Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
// 	// 	{feature.title}
// 	// 	</Text>
// 	// 	<Text fz="sm" c="dimmed" mt="sm">
// 	// 	{feature.description}
// 	// 	</Text>
// 	// </Card>

// 	));

// 	return (
// 		<Container size="lg" py="lg">
// 			<Title order={2} className={classes.title} ta="center">
// 				Projects
// 			</Title>
// 			<Paper shadow='md' p="md">
// 				<Group justify="start">
// 					<Badge variant="filled" size="lg">
// 						Architecture
// 					</Badge>
// 				</Group>

// 				<Title order={3} className={classes.title} ta="start" mt="sm">
// 					Bicycle Share V2
// 				</Title>

// 				<Text c="dimmed" className={classes.description} ta="start" mt="md">
// 				Every once in a while, you’ll see a Golbat that’s missing some fangs. This happens when
// 				hunger drives it to try biting a Steel-type Pokémon.
// 				</Text>

// 				<SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
// 				{features}
// 				</SimpleGrid>
// 			</Paper>
// 		</Container>
// 	);
// }