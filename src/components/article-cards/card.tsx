"use client";
import { EnRichedText } from '../text/text';
import { ArticleCard, ImageArticleCardProps } from './image-card-2';
import { ArticleCardImage } from './image-card';
import { ImageCard } from './image-card-3';
import { ArticleCardVertical } from './vertical-card';
import { type } from 'os';

export interface ArticleCardProps {
	title: string;
	description: string;
	button: string;
	image: string;
	height: string;
	radius: "xs" | "sm" | "md" | "lg" | "xl" | "full";
};


export {ArticleCard, ArticleCardImage, ImageCard, ArticleCardVertical};
export type	{ImageArticleCardProps};
