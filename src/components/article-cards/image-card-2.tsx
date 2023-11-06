"use client";
import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
	Card,
	Image,
	Text,
	ActionIcon,
	Badge,
	Group,
	Center,
	Avatar,
	useMantineTheme,
	rem,
	MantineGradient,
	MantineTheme,
	HoverCard,
	UnstyledButton,
	Paper,
} from '@mantine/core';
import classes from './image-card.module.css';
import { ArticleCardProps } from './card';
import Link from 'next/link'

export interface ImageArticleCardProps extends ArticleCardProps {
	badge: {
		title: string;
		gradient?: MantineGradient;
	},
	external_deps: {
		title: string;
		image_type: "emoji" | "image";
		image: string;
		description: string;
		url: string;
	}[]

}

import {
	to_url_string,
} from '@/utils/url_string';

export function ArticleCard(
	props: ImageArticleCardProps
) {
	const linkProps = { 
		href: to_url_string(props.title),
	};
	const theme = useMantineTheme();

	console.log("header card render", props.title);
	return (
		<Card
			withBorder
			radius="md"
			className={classes.card_2}
			style={{ height: props.height }}
		>
		<Card.Section>
			<a {...linkProps}>
				<Image
					alt={`${props.title} cover image`}
					src={props.image ? props.image : ""}
					height={180}
				/>
			</a>
		</Card.Section>

		<Badge className={classes.rating} variant="gradient" gradient={props.badge?.gradient}>
			{props.badge.title}
		</Badge>

		<Text className={classes.title_2} fw={500} component="a" {...linkProps}>
			{props.title}
		</Text>

		<Text fz="sm" c="dimmed" lineClamp={4}>
			{props.description}
		</Text>

		<Footer theme={theme} skills={props.external_deps} />
		</Card>
	);
}

const Footer = ({
	theme,
	skills
}: {
	theme: MantineTheme,
	skills: {
		title: string;
		image: string,
		image_type: "emoji" | "image";
		description: string,
		url: string
	}[]

}) => {

	return (
		<Group justify="end" className={classes.footer}>
			<Group justify="end" >
			{skills.filter((skill) => (skill.title)).map((skill) => (
				<SkillItem
					key={skill.title}
					title={skill.title}
					image_type={skill.image_type}
					image={skill.image}
					url={skill.url}
					description={skill.description}	
				/>
				))}
			</Group>			
		</Group>
	);
};

const SkillItem = (props: { 
	title: string; 
	image: string;
	image_type: "emoji" | "image";
	url: string;
	description: string;
}) => {

	console.log("skill item render", props.image, props.image_type);
	return (
		<HoverCard shadow="md" position="top" withinPortal>
			<HoverCard.Target>		
				<div style={{
					display: 'flex',
					flexDirection: 'column',
				}}>
				{props.image_type === "emoji" ? (
					<Text
						size='xs'
						c="dimmed"
						>
						{props.image}
					</Text>
				) : (
					<Avatar
						src={props.image}
						size={22}
						radius="sm"
						mr="xs"
						/>
				)}
				<Text
					size='xs'
					c="dimmed"
					>
					{props.title}
				</Text>
				</div>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<UserButton
					title={props.title}
					description={props.description}
					image={props.image}
					image_type={props.image_type}
					url={props.url}
				/>
			</HoverCard.Dropdown>
		</HoverCard>
	);
}

export function UserButton({
	title,
	description,
	image,
	image_type,
	url
}:{
	title: string;
	description: string;
	image: string;
	image_type: "emoji" | "image";
	url: string;
}) {

	console.log("user button render", image_type, image);

	return (
		<Paper
			className={classes.user}
		>
			<Group>
			{image_type === "emoji" ? (
					<Text
						size='xs'
						c="dimmed"
						style={{ size: "22px" }}
						>
						{image}
					</Text>
				) : (
					<Avatar
						src={image}
						size={22}
						radius="sm"
						mr="xs"
					/>
				)}
		
				<div style={{ flex: 1 }}>
					<Text size="sm" fw={500}>
					{title}
					</Text>
		
					<Text c="dimmed" size="xs">
					{description}
					</Text>
				</div>

			{/* <IconChevronRight style={{ width: rem(14), height: rem(14) }} stroke={1.5} /> */}
			</Group>
		</Paper>
	);
  }