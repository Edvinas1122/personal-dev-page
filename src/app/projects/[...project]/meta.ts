import {
	url_string
} from "@/utils/url_string";
import { Metadata, ResolvingMetadata } from 'next'
import {
	constructBlogService,
} from "@/services/blog/blog.module";

export async function generateProjectMetadata(
	{
		params,
	}: {
		params: {
			project: string[]
		}
	},
	parent: ResolvingMetadata
): Promise<Metadata> {
	const project_name = url_string(params.project[0]);
	const service = constructBlogService({
		next: {
			revalidate: 50
		}
	});
	const project = await service
		.getProject(project_name);
	if (!project) return {
		title: "Not Found",
		description: "Not Found",
		openGraph: {
			title: "Not Found",
			description: "Not Found",
		}
	}
	return {
		title: project.Name,
		description: project.Description,
		openGraph: {
			title: project.Name,
			description: project.Description,
			type: "article",
			images: [
				project.cover
			]
		}
	}
}