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
	},
	{
		name: "Manual",
		database_id: process.env.MANUAL as string,
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
				property: "Part",
				property_type: "select",
			},{
				property: "Expands",
				property_type: "relation",
			},{
				property: "Expansions",
				property_type: "relation",
			},{
				property: "Does Document",
				property_type: "relation",
			}]
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


type Manual = {
	Part: "Fragment" | "Full";
	Expands: AquisitionMethod<Manual>[];
	Expansions: AquisitionMethod<Manual>[];
	Type: "Documentation" | "Tutorial";
	DoesDocument: AquisitionMethod<Project>[];
	Name: string;
}

type Goal = {
	[key: string]: string;
}

type ExternalDeps = {
	title: string;
	description: string;
	url: string;
	image: string;
	image_type: string;
}

type AquisitionMethod<T> = () => Promise<T>;
type Paged<T> = T & {
	Created: string;
	cover: string;
	icon: string;
}

interface Project {
	Manual: AquisitionMethod<Manual>[];
	Dist: string;
	Status: string; // Private, Public
	Goals: AquisitionMethod<Goal>[];
	'Dev Journal': AquisitionMethod<DevJournal>[];
	Demand: string;
	Modules: AquisitionMethod<Project>[];
	'External Deps': AquisitionMethod<ExternalDeps>[];
	Name: string;
	Description: string;
	Category: string;
	external: ExternalDeps[];
	"GitHub Page": string,
}

export type {
	Paged,
	Project,
	ExternalDeps,
	Goal,
	Manual,
	AquisitionMethod,
}