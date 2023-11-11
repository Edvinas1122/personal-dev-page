"use client";
import {
	Text,
	Title,
	Group,
	Avatar,
	MantineTheme,
	HoverCard,
	Anchor,
	Center,
	Paper,
	Button,
} from '@mantine/core';
import classes from './image-card.module.css';
import { ReactNode } from 'react';

export const RelatedItems = ({
	theme,
	skills,
	textColor,
}: {
	theme: MantineTheme,
	textColor: string,
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
					textColor={textColor}
				/>
				))}
			</Group>			
		</Group>
	);
};

function SkillTag(props: {
	title: string;
	image: string;
	image_type: "emoji" | "image";
	textColor: string;
	hideUndertitle?: boolean;
	bordered?: boolean;
}) {
	const image = props.image_type === "emoji" ? (
		<Text
			size='md'
			c={props.textColor}
			style={{
				textShadow: "none",
			}}
			>
			{props.image}
		</Text>
	) : (
		<Avatar
			src={props.image}
			size="sm"
			radius="xs"
		/>
	);

	return (
		<div style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			borderRadius: 5,
		}}>
			<Paper
				style={{
					backgroundColor: "white",
					borderRadius: 500,
					borderColor: props.textColor,
					width: 25,
					height: 25,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: 13,
				}}
			>
			{image}
			</Paper>
			{!props.hideUndertitle && (

				<Text
					size='xs'
					c={props.textColor}
					>
					{props.title}
				</Text>
			)}
		</div>
	);
}

export const SkillItem = (props: { 
	title: string; 
	image: string;
	image_type: "emoji" | "image";
	url: string;
	description: string;
	textColor: string;
	hideUndertitle?: boolean;
	bordered?: boolean;
}) => {

	function adjustTitle(title: string) {
		if (title.length > 8) {
			return title.slice(0, 8) + "...";
		}
		return title;
	}

	return (
		<HoverCard
			shadow="md"
			position="top"
			openDelay={200}
			withinPortal
		>
			<HoverCard.Target>		
				<Group>
					<SkillTag
						title={adjustTitle(props.title)}
						image={props.image}
						image_type={props.image_type}
						textColor={props.textColor}
						hideUndertitle={props.hideUndertitle}
						bordered={props.bordered}
						/>
				</Group>
			</HoverCard.Target>
			<HoverCard.Dropdown>
				<TitleIcon
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


export function TitleIcon({
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


	return (
			<Group
				className={classes.pop_card}
			>
				<Group

				>

			{image_type === "emoji" ? (
				<Text
				size='xl'
				c="dimmed"
				style={{ size: "22px" }}
				>
						{image}
					</Text>
				) : (
					<Avatar
						src={image}
						size="md"
						radius="xs"
						mr="xs"
						/>
						)}
				<Title
					size="sm"
					>
				{title}
				</Title>
				</Group>
		
				<Center style={{
					flex: 1,
					gap: 5,
					flexDirection: 'column',
					justifyContent: 'start',
				}}>
		
					<Text
						c="dimmed"
						size="xs"
						lineClamp={6}
					>
					{description}
					</Text>
				<Anchor
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className={classes.link}
				>
					<Text
						size="sm"
						c="dimmed"
						>
						Visit Site
					</Text>
				</Anchor>
				</Center>
			</Group>
	);
  }