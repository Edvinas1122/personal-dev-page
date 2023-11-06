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
			},{
				property: "Modules",
				property_type: "relation",
			},{
				property: "External Deps",
				property_type: "relation",
			}]
		}
	},
	// {
	// 	name: "External Deps",
	// 	database_id: ,
	// 	properties: {
	// 		key: {
	// 			property: "Name",
	// 			property_type: "title",
	// 		},
	// 		properties: [{
	// 			property: "Name",
	// 			property_type: "title",
	// 		},{
	// 			property: "Description",
	// 			property_type: "rich_text",
	// 		},{
	// 			property: "URL",
	// 			property_type: "url",
	// 		},{
	// 			property: "category",
	// 			property_type: "select",
	// 		},{
	// 			property: "Type",
	// 			property_type: "select",
	// 		}]
	// 	}
	// },
]
