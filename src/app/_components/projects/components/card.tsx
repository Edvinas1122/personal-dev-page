"use client";
import React from "react";
import { Variants, motion } from "framer-motion";
import {
	rem
} from "@mantine/core"
import { useSelectedLayoutSegments } from 'next/navigation'
import {
	url_string
} from "@/utils/url_string"

function useIsSelectedPath(
	title: string,
) {
	const selected = useSelectedLayoutSegments();
	const [
		visible,
		setVisible
	] = React.useState(isVisible(title));

	function isVisible(title: string) {
		if (!selected.length) return true;
		const beginSegment = selected[0].split("/")[0]
		return url_string(beginSegment) === title
	}

	React.useEffect(() => {
		setVisible(isVisible(title));
	}, [
		selected,
		title,
		isVisible
	]);

	return visible;
}

import {
	GeneralArticleCard
} from "@/components/article-cards/card"

const HeaderCard = (
	props
: ArticleCardProps & { 
	variants: Variants
	link: string
}) => {
	const visible = useIsSelectedPath(props.title);
	const height = rem(280);

	return (visible && <motion.li 
				variants={props.variants}
				exit={{ opacity: 0, transition: { duration: 1, dely: 1 } }}
				style={{
					transition: "width 0.7s ease-in-out 0.5s",
				}}
			>
				<GeneralArticleCard
					hide_read_more={visible}
					{...props} height={height}
				/>
			</motion.li>);

};

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


export {
	HeaderCard
}