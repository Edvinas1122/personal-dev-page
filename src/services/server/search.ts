import {
	constructBlogService
} from "@/services/blog/blog.module";
import {
	to_url_string
} from "@/utils/url_string";

export async function searchMethod(query: string): Promise<any> {
	"use server";
	const service = constructBlogService({
		cache: "no-store"
	});
	// console.log("searching for", query);
	const results = await service.searchProjects(query);
	const resolvedResults = await Promise.all(results.map(async (result: any) => {
		const properties = result.properties;
		const keys = Object.keys(properties);
		const promises = keys.map(key => properties[key]);
		const resolvedValues = await Promise.all(promises);
		const resolvedProperties = keys.reduce((acc: any, key, index) => {
			acc[key] = resolvedValues[index];
			return acc;
		}, {});
		console.log("Searching", query);
		return {
		  ...result,
		  properties: resolvedProperties
		};
	  }));
	const propeties = resolvedResults.map((result: any) => {
		return {
			at: result.properties.Category,
			title: result.properties.Name,
			description: result.properties.Description,
			value: result.properties.Name.toLowerCase(),
			label: result.properties.Name,
			path: `projects/${to_url_string(result.properties.Name)}`,
		}
	});

	return {
		outcome: "success",
		results: propeties
	}
}