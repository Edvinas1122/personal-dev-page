"use client";
import { EnRichedText } from '../text/text';
import { ArticleCard, ImageArticleCardProps } from './image-card-2';
import { ArticleCardImage } from './image-card';
import { ImageCard } from './image-card-3';
import { ArticleCardVertical } from './vertical-card';
import { RelatedItems } from './related-items';
import { MantineTheme, useMantineTheme } from '@mantine/core';
import { SimpleCard } from './simple-card';
import { CategoryBadge, LinkBadge } from './badges';

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
	created_at: string;
	dist: string;
};

export function GeneralArticleCard(
	props: ArticleCardProps
) {
	const theme = useMantineTheme();
	const color = props.image ? "antiquewhite" : "dimmed";
	return (
		<ArticleCardSelect
			{...props}
			theme={theme}
		>
			<RelatedItems
				theme={theme}
				skills={props.external_deps}
				textColor={color}
			/>
		</ArticleCardSelect>
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

type ArticleCardSelectProps = ArticleCardProps & {
	theme: MantineTheme;
	children?: React.ReactNode;
};

import { 
	IconBrandGithub,
	IconBrandNpm,
} from '@tabler/icons-react';

function ArticleCardSelect(props: ArticleCardSelectProps) {

	const badge = (
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

	if (props.image) {
		return (
			<SimpleCard
				{...props}
				badges={badge}
				theme={props.theme}
				// image={"https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"}
			>
				<>
				{props.children}
				</>
			</SimpleCard>
		);
	}
	else {
		return (
			<SimpleCard
				{...props}
				badges={badge}
				theme={props.theme}
			>
				{props.children}
			</SimpleCard>
		)
	}
}


export {ArticleCard, ArticleCardImage, ImageCard, ArticleCardVertical};
export type	{ImageArticleCardProps};
