import {
	TableProps
} from "@edvinas1122/notion-database-tool";

export const blogTables: TableProps[] = [
	{
		name: "Projects",
		database_id: process.env.PROJECTS as string,
		properties: {
			key: {
				property: "Name",
				property_type: "title",
			},
			properties: [{
				property: "Name",
				property_type: "title",
			},{
				property: "Description",
				property_type: "rich_text",
			}]
		}
	}
]
