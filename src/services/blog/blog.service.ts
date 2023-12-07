import {
	NotionDatabaseTool,
	//@ts-ignore
	Entry,
	//@ts-ignore
	NotionEntry
} from "@edvinas1122/notion-database-tool";
import {
	DevJournal,
	Project,
	ExternalDeps,
	Goal,
	Manual,
	Paged
} from "./blog.orm";

export default class BlogService {
	constructor(
		private readonly databaseTool: NotionDatabaseTool
	) {}

	async getAvailable() {
		const projects = await this.databaseTool
			.getTable("Projects")
			.query()
			// .filter("Category", "select", "equals", "Application")
			.sort("Created", "descending")
			.limit(12)
			.get()
			.then((entries: any) => entries.all());
		
		return projects as Promise<Project[]>;
	}

	async getProjects() {
		const projects = await this.databaseTool
			.getTable("Projects")
			.query()
			// .filter("Category", "select", "equals", "Application")
			.sort("Created", "descending")
			.limit(12)
			.get()
			.then((entries: any) => entries.all());
		// console.log(projects);
		const tablesWithImagesPromises = projects.map((project: any) => this.getProjectDetails(project));
		const tablesWithImages = await Promise.all(tablesWithImagesPromises); /// parallel issues
		return tablesWithImages as Paged<Project>[];
	}

	async getTutorials() {
		const manuals = await this.databaseTool
			.getTable("Manual")
			.query()
			// .sort("Created", "descending")
			.filter("Type", "select", "equals", "Tutorial")
			.limit(12)
			.get()
			.then((entries: any) => entries.all());
		const manualsWithImagePromises = manuals
			.map(this.retrievePageDetails.bind(this))
		const manuals_with_images = await Promise
			.all(manualsWithImagePromises);
		const manuals_with_external_modules_promises = manuals_with_images
			.map(this.fetchRelatedItems.bind(this, "External Modules"));
		const manuals_with_external_modules = await Promise
			.all(manuals_with_external_modules_promises);
		return manuals_with_external_modules as (Paged<Manual & {external: ExternalDeps[]}>)[];
	}

	private transformJournal(journal: DevJournal) {
		return {
			Name: journal.Name,
			Type: journal.Type,
			Date: journal.Date,
			URL: journal.URL,
			Description: journal.Description,
		}
	}

	async getJournal({
		name,
		page
	}: {
		name: string,
		page: number
	}) {
		//@ts-ignore
		const projects: NotionEntry[] = await this.databaseTool
			.getTable("Projects")
			.getEntry("equals")
			.byKey(name)
			//@ts-ignore
			.then((entry: Entry) => entry.all());
		if (!projects || !projects[0]) {
			console.error("no journal found");
			return null;
		}
		const journal: DevJournal[] = await Promise
			.all(projects[0]["Dev Journal"]
				.map(async (journal_fetch_method: any) => {
					const article = await journal_fetch_method();
					return this.transformJournal(article as DevJournal);
				}));
		return journal;
	}

	async getJournalArticle({
		name,
	}: {
		name: string,
	}) {
		//@ts-ignore
		const journal: NotionEntry[] = await this.databaseTool
			.getTable("Dev Journal")
			.query()
			.filter("Name", "title", "equals", name)
			.limit(1)
			.get()
			//@ts-ignore
			.then((entries: Entry) => entries.all());
		if (!journal || !journal[0]) {
			console.error("no journal article found");
			return null;
		}
		const article_info: NotionEntry = journal[0];
		const article_blocks = await article_info.retrievePage();

		return {
			page: article_blocks.page,
			article_info: this.transformJournal(article_info),
			contents: this.transpileArticeContents(article_blocks.page),
			getBlockChildren: async (id: string) => await article_info.notion.getBlockChildren(id),

		}
	}

	async getManual({
		name,
	}: {
		name: string,
	}) {
		//@ts-ignore
		const journal: NotionEntry[] = await this.databaseTool
			.getTable("Manual")
			.query()
			.filter("Name", "title", "equals", name)
			.limit(1)
			.get()
			//@ts-ignore
			.then((entries: Entry) => entries.all());
		if (!journal || !journal[0]) {
			console.error("no journal article found");
			return null;
		}
		const article_info: NotionEntry = journal[0];
		const article_blocks = await article_info.retrievePage();
		return {
			page: article_blocks.page,
			article_info: this.transformJournal(article_info),
			contents: this.transpileArticeContents(article_blocks.page),
			getBlockChildren: async (id: string) => await article_info.notion.getBlockChildren(id),
		}
	}




	private transpileArticeContents(
		blocks: any[]
	): {
		label: string,
		link: string,
		order: number,
	}[] {
		const contents = blocks
			.filter((block: any) => block.type === "heading_1" || block.type === "heading_2" || block.type === "heading_3") 
			.map((block: any) => {
				const text = block[block.type].rich_text
					.map((text: any) => text.plain_text).join("");
				return {
					label: text,
					link: "#"+text,
					order: block.type === "heading_1" ? 1 : block.type === "heading_2" ? 2 : 3
				}
			})
		return contents;
	}

	async getCompleteArchitercute(
		page: number = 0
	) {
		const architecture = (await this.getArchitectures())[page];
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
		// console.log(module_libs);
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

	async searchTutorials(query: string) {
		const projects = await this.databaseTool
			.search(query, "Tutorials");
		return projects;
	}
		

	private async getArchitectures() {
		const architectures: any = await this.databaseTool
			.getTable("Projects")
			.query()
			.filter("Category", "select", "equals", "Architecture")
			.sort("Created", "ascending")
			.limit(3)
			.get()
			.then((entries: any) => entries.all());
		return architectures;
	}

	async getProject(key: string): Promise<Project | null> {
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
			const constructed_item = await this.getProjectDetails(project[0]) as Project & {[key:string]: any};
			return constructed_item;
		} catch	(err: any) {
			return this.exceptionHandler(err);
		}
	}

	async getGroupedExternalDeps(
		attributeExtractor: (dep: any, key: string) => any,
	) {
		const deps = await this.getExternalDeps();
		const deps_with_images = await Promise
			.all(deps
				.map((dep: any) => this
					.getProjectDetails(dep, "💼 Projects"))
		);
		const grouped = deps_with_images.reduce((acc: any, dep: any) => {
			const category = dep.Type;
			if (!acc[category]) acc[category] = [];
			const extracted = attributeExtractor(dep, dep.Type);
			acc[category].push(extracted);
			return acc;
		}, {});
		return grouped;
	}

	private async getExternalDeps() {
		try {
			const deps = await this.databaseTool
				.getTable("External Deps")
				.query()
				.filter("category", "select", "equals", "digital")
				.limit(30)
				.get()
				.then((entries: any) => entries.all());
			return deps;
		} catch (err: any) {
			console.error(err);
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

	private async retrievePageDetails(
		table: any
	) {
		const page = await table.retrievePageInfo();
		if (!page?.object || page?.object !== "page") {
			console.error("mistakes", page);
		}
		if (page) {
			return {
				cover: this.coverImage(page.cover),
				icon: page.icon,
				...table
			}
		} else {
			return {
				cover: "",
				icon: "",
				...table,
			}
		}
	}

	private async fetchRelatedItems(
		related_table: string,
		table: any
	) {
		const external = await this
			.getRelations(table[related_table])
			.then((relations) => relations
				.map((relation) => this.external(relation)));
		return {
			external,
			...table
		}
	}

	private async getProjectDetails(
		table: any,
		related_table: string = "External Deps"
	) {
		const constructed_item = await this.retrievePageDetails(table);
		if (related_table) {
			constructed_item.external = await this
				.getRelations(table[related_table])
					.then((relations) => relations
						.map((relation) => this.external(relation)));
		}
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
		console.error(err);
		if (err?.message)
		{
			console.log(err.message);
		}
		return null;
	}

}