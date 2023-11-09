import {
	Group,
	Text,
	Title,
	Card,
	MantineTheme,
	Button,
} from '@mantine/core';
import classes from './image-card.module.css';
import {
	to_url_string,
} from '@/utils/url_string';
import React from 'react';
import Link from 'next/link';

type SimpleCardProps = {
	height: string;
	title: string;
	description: string;
	children: React.ReactNode;
	badges: React.ReactNode;
	theme: MantineTheme;
	image?: string;
}

export function SimpleCard(props: SimpleCardProps) {


	const title_font_color = !props.image ? "black" : "white";
	const description_font_color = !props.image ? "gray" : "#FFFAF0";
	const linkProps = { 
		href: to_url_string(props.title),
	};
	return (
		<Card
			p="md"
			radius="md"
			className={classes.card_2}
			style={{ 
				height: props.height,
				textShadow: props.image ? "0px 0px 4px black" : "",
				backgroundImage: props.image ? `url(${props.image})` : "",
				backgroundSize: "cover",
			}}

			withBorder
			shadow='md'
		>
				<Group justify="start">
					{props.badges}
				</Group>

				<Title
					order={3} 
					ta="start"
					mt="sm"
					c={title_font_color}
				>
					{props.title}
				</Title>

				<Text
					c={description_font_color}
					className={classes.description}
					lineClamp={4}
					ta="start"
					mt="md"
					>
					{props.description}
				</Text>

				{props.children}
			<Button
				component={Link}
				{...linkProps}
				style={{
					backgroundColor: "transparent",
					width: "fit-content",
					hover: {
						backgroundColor: "transparent",
					},
				}}
				variant="outline"
				color={description_font_color}
				className={classes.button}

			>
				Read more
			</Button>
		</Card>
	);
}