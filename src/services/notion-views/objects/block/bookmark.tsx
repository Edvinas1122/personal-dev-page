import {
	BlockSpecifics,
} from "../../render/blocksRender"
import React, { Suspense } from "react";

import {
	Anchor,
	Text,
} from "@mantine/core"

function handleBookmark(content: BlockSpecifics) {
	const { bookmark } = content;
	console.log(bookmark);
	return (
		<Suspense>
			<Bookmark url={bookmark.url}>
				<Anchor
					className="notion-bookmark-link"
					href={bookmark.url}
				>
					<Text 
						size="xs"
					>{bookmark.url}</Text>
				</Anchor>
			</Bookmark>
		</Suspense>
	);
}

import {
	Group,
	Title,
	Image,
	Paper
} from "@mantine/core"

async function Bookmark({
	children,
	url
}: {
	children: React.ReactNode,
	url: string
}) {
	const site_data = await fetchSiteData(url);
	return (
		<>
			<Paper className="notion-bookmark"
				component="a"
				withBorder
				py="md"
				px="xl"
				style={{
					display: "flex",
					flexDirection: "row-reverse",
					textDecoration: "inherit",
					justifyContent: "space-between",
					color: "inherit",
				}}
				href={url}
			>
					<div
						style={{
							width: "180px",
						}}
					>
					<Image src={site_data.image} 
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							borderRadius: "5px",
						}}
					/>
					</div>
				<Group className="notion-bookmark-title"
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<Title
						order={3}
						size="1.3rem"
						className="notion-bookmark-title">
						{site_data.title}
					</Title>
					<Text
						lineClamp={2}
						size="sm"
					className="notion-bookmark-description">
						{site_data.description}
					</Text>
					{children}
				</Group>
			</Paper>
		</>
	)
}

import { JSDOM } from "jsdom";

async function fetchSiteData(
	url: string
): Promise<{ title: string, description: string, image: string }> {
	const res = await fetch(url, {
		next: { 
			revalidate: 3600
		}
	});
	const html = await res.text();
	const dom = new JSDOM(html);
	const doc = dom.window.document;
	const title = doc.querySelector("title")?.textContent;
	const description = doc.querySelector("meta[name='description']")?.getAttribute("content");
	const image = doc.querySelector("meta[property='og:image']")?.getAttribute("content");
	if (title && description && image) {
		return {
			title,
			description,
			image
		}
	}
	return {
		title: "",
		description: "",
		image: ""
	}
}

export default handleBookmark;