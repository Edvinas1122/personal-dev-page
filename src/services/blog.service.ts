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
			.getEntries()
			.all()
			.then((entries: any) => entries.all());
		
		return projects;
	}
}