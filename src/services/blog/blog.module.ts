import 
	constructNotionDatabase
from "@edvinas1122/notion-database-tool";

import {
	blogTables,
	DevJournal
} from "./blog.orm";
import
	BlogService
from "./blog.service";

export function constructBlogService(cache?: { [key: string]: any }) {
	const notion_integration_token = process.env.NOTION_INTEGRATION_TOKEN;
	if (!notion_integration_token) throw new Error("No integration token provided");
	const notionDatabaseTool = constructNotionDatabase(
		notion_integration_token,
		blogTables,
		cache
	);
	const blogService = new BlogService(
		notionDatabaseTool
	);
	return blogService;
}

export type {
	DevJournal
};