import {
	fetchItemPage,
	ItemPaths
} from "@/services/server/fetchProjectItems";
import {
	url_string
} from "@/utils/url_string";
import { Metadata, ResolvingMetadata } from 'next'

export async function generateTutorialMetadata(
	{
		params,
	}: {
		params: {
			tutorial: string[]
		}
	},
	parent: ResolvingMetadata
): Promise<Metadata> {
	const tutorial_name = url_string(params.tutorial[0]);
	const article = await fetchItemPage(
		ItemPaths.manual,
		tutorial_name
	);
	if (!article) return {
		title: "Not Found",
		description: "Not Found",
		openGraph: {
			title: "Not Found",
			description: "Not Found",
		}
	}
	return {
		title: article.article_info.Name,
		description: article.article_info.Description,
		openGraph: {
			title: article.article_info.Name,
			description: article.article_info.Description,
			type: "article",
		}
	}
}