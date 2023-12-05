import 
	constructNotionDatabase
from "@edvinas1122/notion-database-tool";

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

import {
	blogTables,
	DevJournal,
	Project,
	ExternalDeps,
	Goal,
	Manual,
	AquisitionMethod,
	Paged
} from "./blog.orm";

export type {
	DevJournal,
	Project,
	ExternalDeps,
	Goal,
	Manual,
	AquisitionMethod,
	Paged
};

import {
	describeManual
} from "./blog.utils"

export {
	describeManual
};