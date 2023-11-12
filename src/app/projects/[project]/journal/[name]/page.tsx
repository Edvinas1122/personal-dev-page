import {
	constructBlogService,
	DevJournal
} from "@/services/blog/blog.module";
import {
	url_string
} from "@/utils/url_string";


async function fetchArticle(name: string) {
	const service = constructBlogService({
		cache: "no-store"
	});
	const article = await service.getJournalArticle({
		name: url_string(name),
	});
	return article;
}

import
	NotionList
from "@/services/notion-views/List";
import OnPage from "@/services/notion-views/OnPage";
import {
	Text,
	Paper,
	Container,
	GridCol,
	Grid,
	SimpleGrid
} from '@mantine/core';
import { TableOfContentsFloating } from "@/components/contents-table/contents-table";

async function ArticlePage({
	params: {
		project,
		name,
	}
}:{
	params: {
		project: string,
		name: string,
	}
}) {
	const article = await fetchArticle(name);
	return (
		<div>
			<div
				style={{
					// backgroundColor: "black",
					// height: "100vh",
					display: "flex",
					flexDirection: "row",
				}}
			>
			<Container
				my="md"
				size="md"
				>
			<h1>{article.article_info.Name}</h1>
			<h2>{article.article_info.Description}</h2>

			<NotionList
				page={article}
			/>
			</Container>
			<Container
				my="md"
				size="xs"
				ml="xs"
			>
			<TableOfContentsFloating
				links={article.contents}
			/>
				</Container>
			</div>
		</div>
	);
}

export default ArticlePage;