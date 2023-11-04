import {
	NotionDatabaseTool
} from "@edvinas1122/notion-database-tool";

export default class BlogService {
	constructor(
		private readonly databaseTool: NotionDatabaseTool
	) {}

	async getProjects() {
		const projects = await this.databaseTool
			.getTable("Projects")
			.getEntries(undefined, undefined, 3)
			.all()
			.then((entries: any) => entries.all());
		const tables_with_images = await Promise
			.all(projects
				.map(async (project: any) => {
					return await this.getProjectDetails(project);
		}));
		return tables_with_images;
	}


	/*
		Notion formater service should handle this
		wrong responsibility place
	*/
	private coverImage(structure: any): string {
		if (!structure) return 'https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F23185bc3-4231-41dc-8e86-8a4ca374fa80%252F1681923508963.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75';
		if (structure.type === "external") return structure.external.url;
		if (structure.type === "file") return structure.file.url;
		return structure;
	}

	private async getProjectDetails(table: any) {
		const page = await table.retrievePageInfo();
		if (!page) throw new Error("Page not found");
		const constructed_item = table;
		constructed_item.cover = this.coverImage(page.cover);
		constructed_item.icon = page.icon;
		constructed_item.external = await this.getRelations(table["External Deps"])
			.then((relations) => relations.map((relation) => this.external(relation)));
		return (constructed_item);
	}

	private async getRelations(fun: (()=>Promise<any>)[]) {
		return await Promise.all(fun.map(async (f) => await f()));
	}

	private getIcon(item: any) {
		if (item.icon.type === "external") {
			return item.icon.external.url;
		} else if (item.icon.type === "file") {
			return item.icon.file.url;
		} else if (item.icon.type === "emoji") {
			return item.icon.emoji;
		} else {
			return item.icon;
		}
	}
	
	/*
		get skills of project covered by external deps
		like hey intra api, 42 api, etc
	*/
	private external(item: any) {
		return {
			title: item.Name,
			description: item.Description,
			url: item.URL,
			image: this.getIcon(item),
		}
	}
}