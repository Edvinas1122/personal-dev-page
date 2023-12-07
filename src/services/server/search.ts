import {
	constructBlogService
} from "@/services/blog/blog.module";
import {
	to_url_string
} from "@/utils/url_string";

export async function searchMethod(
	query: string,
	lookFor: "projects" | "tutorials" = "projects"
): Promise<any> {
	"use server";
	const service = constructBlogService({
		cache: "no-store"
	});
	// console.log("searching for", query);
	const results = await searchItems(query, lookFor);
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
		return resolveResult(result.properties, lookFor);
	}).filter((result: any) => (result !== null));

	return {
		outcome: "success",
		results: propeties
	}
}

async function searchItems(query: string, item: "projects" | "tutorials") {
	"use server";
	const service = constructBlogService({
		cache: "no-store"
	});
	if (item === "projects") {
		return await service.searchProjects(query);
	} else if (item === "tutorials") {
		return await service.searchTutorials(query);
	}
	else
		throw new Error("Invalid Search item");
}

function resolveResult(properties: any, lookFor: "projects" | "tutorials" = "projects") {
	if (lookFor === "projects") {
		return {
			at: properties.Category,
			title: properties.Name,
			description: properties.Description,
			value: properties.Name.toLowerCase(),
			label: properties.Name,
			path: `/projects/${to_url_string(properties.Name)}`,
		}
	} else if (lookFor === "tutorials") {
		if (properties.Type !== "Tutorial") return null;
		return {
			at: properties.Category,
			title: properties.Name,
			description: "",
			value: properties.Name.toLowerCase(),
			label: properties.Name,
			path: `/tutorials/${to_url_string(properties.Name)}`,
		}
	}
}