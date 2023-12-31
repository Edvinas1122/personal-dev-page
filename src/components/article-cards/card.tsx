"use client";
import { EnRichedText } from '../text/text';
import { ArticleCard, ImageArticleCardProps } from './image-card-2';
import { ArticleCardImage } from './image-card';
import { ImageCard } from './image-card-3';
import { ArticleCardVertical } from './vertical-card';
import { RelatedItems } from './related-items';
import { Group, MantineTheme, useMantineTheme } from '@mantine/core';
import { SimpleCard } from './simple-card';
import { CategoryBadge, LinkBadge } from './badges';
import { Card } from '@mantine/core';

export interface ArticleCardProps {
	title: string;
	description: string;
	image?: string;
	height: string;
	radius: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	category: string;
	external_deps: {
		title: string;
		image_type: "emoji" | "image";
		image: string;
		description: string;
		url: string;
	}[],
	github: string | null;
	repo_languages?: {[language: string]: number};
	created_at: string;
	dist: string;
	hide_read_more?: boolean;
};

export function GeneralArticleCard(
	props: ArticleCardProps & {link: string}
) {
	const theme = useMantineTheme();
	const color = props.image ? "antiquewhite" : "gray";
	return (
		<SimpleCard
			{...props}
			badges={
				<ArticleBadges
					{...props}
				/>
			}
			// link={link}
			theme={theme}
		>
			<>
			<RelatedItems
				theme={theme}
				skills={props.external_deps}
				textColor={color}
				/>
				{props.repo_languages && (
					<Card.Section
						w="100%"
						style={{
							bottom: "0",
							padding: "var(--mantine-spacing-md)",
							position: "absolute",
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Group>
						<Languages
							color={color}
							languages={props.repo_languages}
						/>
						</Group>
					</Card.Section>
				)}
			</>
		</SimpleCard>
	);
}

import { useHover } from '@mantine/hooks';

export function HoverExample() {
	const {hovered, ref} = useHover();

	return (
		<div
			ref={ref}
		>
			{hovered ? "hover" : "null"}
		</div>
	);
}

type ArticleCardSelectProps = ArticleCardProps;

import { 
	IconBrandGithub,
	IconBrandNpm,
} from '@tabler/icons-react';
import { Languages } from './languages';

function ArticleBadges(props: ArticleCardSelectProps) {

	const Badges = (
		<>
			<CategoryBadge
				gradient={{
					from: "red",
					to: "pink",
				}}
			>
				{props.category}
			</CategoryBadge>
			{props.github && (
			<LinkBadge
				gradient={{
					from: "blue",
					to: "cyan",
				}}
				url={props.github}
				icon={
				<IconBrandGithub 
					size="1rem"
				/>}
			>
				Github
			</LinkBadge>)}
			{props.dist && (
			<LinkBadge
				gradient={{
					from: "red",
					to: "pink",	
				}}
				url={props.dist}
				icon={
				<IconBrandNpm 
					size="1rem"
				/>}
			>
				NPM
			</LinkBadge>
			)}
		</>
	)

	return (
	<>
		{Badges}
	</>
	)
}


export {ArticleCard, ArticleCardImage, ImageCard, ArticleCardVertical};
export type	{ImageArticleCardProps};
