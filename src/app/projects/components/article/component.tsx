import
	NotionList
from "@/services/notion-views/List";
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
} from "./article_layout";
import {
	fetchProjectItemPage,
	ItemPaths
} from "@/services/server/fetchProjectItems";

async function ArticlePage({
	params: {
		project,
		relation,
		name,
	}
}:{
	params: {
		project: string,
		relation: ItemPaths,
		name: string,
	}
}) {
	const article = await fetchProjectItemPage(
		relation,
		name
	);
	if (!article) {
		return notFound();
	}
	console.log("fetched", article);
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
import Loading from './article_loading';
import { notFound } from "next/navigation";
export {
	Loading
};