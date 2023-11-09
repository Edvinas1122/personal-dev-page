import {
	NotionDatabaseTool,
} from "@edvinas1122/notion-database-tool";

export default class BlogService {
	constructor(
		private readonly databaseTool: NotionDatabaseTool
	) {}

	async getProjects() {
		const projects = await this.databaseTool
			.getTable("Projects")
			.query()
			.filter("Category", "select", "equals", "Application")
			.sort("Created", "ascending")
			.limit(3)
			// .cursor()
			.get()
			.then((entries: any) => entries.all());
		// console.log(projects);
		const tablesWithImagesPromises = projects.map((project: any) => this.getProjectDetails(project));
		const tablesWithImages = await Promise.all(tablesWithImagesPromises); /// parallel issues
		return tablesWithImages;
	}

	async getCompleteArchitercute() {
		const architecture = (await this.getArchitectures())[0];
		console.log(architecture);
		const architercureModules = await Promise.all(architecture.Modules
			.map(async (project_fetch: any) => await project_fetch())
		);
		/*
			retrieve for each architecture project
			- projects libraries - [[async fetch], [async fetch]]
		*/
		const module_libs = (await Promise
			.all(architercureModules
				.flatMap(async (module: any) => await Promise
					.all(module.Modules
						.map(async (project_fetch: any) => await project_fetch())
					))
		)).flat();
		console.log(module_libs);
		const architecture_with_images_promise = this.getProjectDetails(architecture);
		const architecture_modules_with_images_promises = architercureModules.map((module: any) => this.getProjectDetails(module));
		const module_libs_with_images_promises = module_libs.map((module: any) => this.getProjectDetails(module));
		const items = await Promise.all([architecture_with_images_promise, ...architecture_modules_with_images_promises, ...module_libs_with_images_promises]);
		// console.log(items);
		return items;
	}

	async searchProjects(query: string) {
		const projects = await this.databaseTool
			.search(query, "Projects");
		return projects;
	}
		

	async getArchitectures() {
		const architectures = await this.databaseTool
			.getTable("Projects")
			.query()
			.filter("Category", "select", "equals", "Architecture")
			.sort("Created", "ascending")
			.limit(3)
			.get()
			.then((entries: any) => entries.all());
		return architectures;
	}

	async getProject(key: string) {
		try {
			const project = await this.databaseTool
				.getTable("Projects")
				.getEntry("equals")
				.byKey(key)
				.then((entry: any) => entry.all());
			if (!project) {
				console.error("no project found");
				throw new Error("no project found");
			}
			const constructed_item = await this.getProjectDetails(project[0]);
			return constructed_item;
		} catch	(err: any) {
			this.exceptionHandler(err);
		}
	}

	/*
		Notion formater service should handle this
		wrong responsibility place
	*/
	private coverImage(structure: any): string {
		if (!structure) return structure;
		if (structure.type === "external") return structure.external.url;
		if (structure.type === "file") return structure.file.url;
		return structure;
	}

	private async getProjectDetails(table: any) {
		const page = await table.retrievePageInfo();
		if (!page?.object || page?.object !== "page") 
		{
			console.error("mistakes", page);
		}
		const constructed_item = table;
		if (page) {
			constructed_item.cover = this.coverImage(page.cover);
			constructed_item.icon = page.icon;
		} else {
			constructed_item.cover = "";
			constructed_item.icon = "";
		}
		constructed_item.external = await this.getRelations(table["External Deps"])
			.then((relations) => relations.map((relation) => this.external(relation)));
		return (constructed_item);
	}

	private async getRelations(fun: (()=>Promise<any>)[]) {
		const relations = await this.executePromises(fun);
		return relations;
	}

	private async executePromises(promises: (()=>Promise<any>)[]) {
		const results = await Promise.all(promises.map((promise) => promise()));
		return results;
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
		// console.log(item);
		return {
			title: item.Name,
			description: item.Description,
			url: item.URL,
			image_type: item?.icon?.type,
			image: item?.icon ? this.getIcon(item) : "",
		}
	}

	private exceptionHandler(err: any) {
		console.log(err);
		if (err?.message)
		{
			console.log(err);
			// const message = JSON.parse(err.message.split("\n")[1]);
			// console.log(message.message);
			console.log(err.message);
		}
	}
}