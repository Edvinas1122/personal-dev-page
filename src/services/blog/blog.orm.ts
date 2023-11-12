import {
	TableProps,
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
			},{
				property: "Modules",
				property_type: "relation",
			},{
				property: "External Deps",
				property_type: "relation",
			}]
		}
	},
	{
		name: "External Deps",
		database_id: process.env.EXTERNAL_MODULES as string,
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
			},{
				property: "URL",
				property_type: "url",
			},{
				property: "category",
				property_type: "select",
			},{
				property: "Type",
				property_type: "select",
			}]
		}
	},
	{
		name: "Dev Journal",
		database_id: process.env.JOURNAL as string,
		properties: {
			key: {
				property: "Name",
				property_type: "title",
			},
			properties: [{
				property: "Name",
				property_type: "title",
			},{
				property: "Type",
				property_type: "select",
			},{
				property: "Description",
				property_type: "rich_text",
			},{
				property: "Projects",
				property_type: "relation",
			},]
		}
	}
]


export type DevJournal = {
	Name: string,
	Type: string,
	Description: string,
	Projects: string[],
	Date: string,
	Appearant: "minor" | "major",
	"💼 Projects": any[],
	"🧰 Features": any[],
	URL: string,
}


