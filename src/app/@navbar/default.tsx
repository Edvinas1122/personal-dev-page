import {
	HeaderSearch,
	HeaderSearchProps
} from "@/components/header/header";
import {
	constructBlogService
} from "@/services/blog/blog.module";

async function searchMethod(query: string): Promise<any> {
	"use server";
	const service = constructBlogService({
		cache: "no-store"
	});
	// console.log("searching for", query);
	const results = await service.searchProjects(query);
	console.log("results", results);
	const resolvedResults = await Promise.all(results.map(async (result: any) => {
		const properties = result.properties;
		const keys = Object.keys(properties);
		const promises = keys.map(key => properties[key]);
		const resolvedValues = await Promise.all(promises);
		const resolvedProperties = keys.reduce((acc: any, key, index) => {
			acc[key] = resolvedValues[index];
			return acc;
		}, {});
		return {
		  ...result,
		  properties: resolvedProperties
		};
	  }));
	  console.log("resolved results", resolvedResults);
	const propeties = resolvedResults.map((result: any) => {
		return {
			at: result.properties.Category,
			title: result.properties.Name,
			description: result.properties.Description,
		}
	});

	return {
		outcome: "success",
		results: propeties
	}
}

export default function Navbar() {

	const sections = [
		"Main",
		"Projects",
		"Journal",
		"Contact",
	];

	return (
		<>
			<HeaderSearch
				sections={sections}
				searchServerMethod={searchMethod}
			/>
		</>
	);
}