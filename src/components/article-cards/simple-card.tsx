import {
	Group,
	Text,
	Title,
	Card,
	MantineTheme,
	Button,
	Image,
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
	hide_read_more?: boolean;
}

import {
	useHover,
} from '@mantine/hooks';

export function SimpleCard(props: SimpleCardProps) {

	const { hovered, ref } = useHover();
	const title_font_color = props.image ? "white" : undefined;
	const description_font_color = props.image ? "#FFFAF0" : props.theme.colors.gray[8];
	const linkProps = { 
		href: "/projects/"+ to_url_string(props.title),
	};
	return (
		<Card
			radius="md"
			className={classes.card_2}
			style={{ 
				height: props.height,
				textShadow: props.image ? "0px 0px 4px black" : "",
			}}
			withBorder
			shadow='md'
			component={Link}
			href={linkProps.href}
			>
			<Card.Section
				ref={ref}
				p="md"
				style={{
					zIndex: 2,
					position: "relative",
				}}
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
					lineClamp={3}
					ta="start"
					mt="md"
					>
					{props.description}
				</Text>

				{props.children}
			{props.hide_read_more || !hovered ? null : (
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
			)}
			</Card.Section>
			<Card.Section
				style={{
				}}
			>
				{
					!props.image ? null : (
						<Image
							src={props.image}
							alt={props.title + "_image"}
							style={{
								top: 0,
								width: "100%",
								height: "100%",
								objectFit: "cover",
								objectPosition: "center",
								position: "absolute",
								zIndex: 1,
								transition: "transform 0.35s ease-in-out",
								transform: `${hovered ? "scale(1.03)" : "scale(1)"}`
							}}
						/>
					)
				}
			</Card.Section>
		</Card>
	);
}