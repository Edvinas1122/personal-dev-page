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

async function ArticleDisplay({
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
						component={"header"}
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
						component={"main"}
						p="md"
						shadow="sm"
						w="100%"
					>
						<NotionList
							page={article}
							fetchBlocks={article.getBlockChildren}
							/>
					</Paper>
				</>
			</ArticleLayout>
			</>
	);
}

export default ArticleDisplay;
import Loading from './article_loading';
import { notFound } from "next/navigation";
export {
	Loading
};