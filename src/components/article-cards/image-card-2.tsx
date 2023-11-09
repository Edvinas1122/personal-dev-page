"use client";
import {
	Card,
	Image,
	Text,
	MantineTheme,
} from '@mantine/core';
import classes from './image-card.module.css';
import { ArticleCardProps } from './card';
import Link from 'next/link'

export interface ImageArticleCardProps extends ArticleCardProps {
	theme: MantineTheme;
	badge: React.ReactNode;
	children: React.ReactNode;
}

import {
	to_url_string,
} from '@/utils/url_string';
import React from 'react';

export function ArticleCard(
	props: ImageArticleCardProps
) {
	const linkProps = { 
		href: to_url_string(props.title),
	};

	return (
		<Card
			withBorder
			radius="md"
			className={classes.card_2}
			style={{ height: props.height }}
			shadow="xs"
		>
		<Card.Section>
			<Link {...linkProps}>
				<Image
					alt={`${props.title} cover image`}
					src={props.image ? props.image : ""}
					height={180}
				/>
			</Link>
		</Card.Section>

		<Card.Section
			style={{
				position: 'absolute',
				paddingLeft: "1rem",
			}}
		>
		{props.badge}
		</Card.Section>
		<Text className={classes.title_2} fw={500} component="a" {...linkProps}>
			{props.title}
		</Text>

		<Text fz="sm" c="dimmed" lineClamp={4}>
			{props.description}
		</Text>
		{props.children}
		</Card>
	);
}