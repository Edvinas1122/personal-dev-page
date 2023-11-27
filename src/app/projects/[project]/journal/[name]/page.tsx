import {
	constructBlogService,
	DevJournal
} from "@/services/blog/blog.module";
import {
	url_string
} from "@/utils/url_string";
import { notFound } from "next/navigation";


async function fetchArticle(name: string) {
	const service = constructBlogService({
		cache: "no-store"
	});
	const article = await service.getJournalArticle({
		name: url_string(name),
	});
	if (!article) {
		notFound();
	}
	return article;
}

import
	NotionList
from "@/services/notion-views/List";
import OnPage from "@/services/notion-views/OnPage";
import {
	Text,
	Paper,
	Title,
} from '@mantine/core';
import {
	TableOfContentsFloating
} from "@/components/contents-table/contents-table";
import {
	ArticleLayout
} from "../components";

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
		<>
			<ArticleLayout
				contents={
					<TableOfContentsFloating
						links={article.contents}
					/>
				}
			>
				<>
					<Paper
						p="md"
						shadow="sm"
						my="md"
						w="100%"
					>
					<Title
						order={1}
						size={"2.5rem"}
						>{article.article_info.Name}
					</Title>
					<Text
						size="lg"
						style={{
							italic: true,
						}}
						>{article.article_info.Description}</Text>
					</Paper>
					<Paper
						p="md"
						shadow="sm"
						w="100%"
					>
					<NotionList
						page={article}
						/>
					</Paper>
				</>
			</ArticleLayout>
			</>
	);
}

export default ArticlePage;