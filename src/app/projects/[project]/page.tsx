import { Suspense } from "react";
import {
	constructBlogService
} from "@/services/blog/blog.module";
import {
	url_string
} from "@/utils/url_string";
import
	EnRichedTextTyper
from "@/components/text/typer";
import { Hero } from "@/components/hero/hero";
import NotionList from "@/services/notion-views/List";
import { Text, Paper, Container } from '@mantine/core';
import { notFound } from "next/navigation";

async function Description({
	project
} : {
	project: any
}) {

	const manual_aquisition_methods = project["Manual"];
	const manuals = await Promise.all(manual_aquisition_methods.map(async (method: any) => {
		const manual = await method();
		if (!manual) {
			throw new Error("Error parallel fetching manuals");
		}
		return manual;
	}));

	const root_manual = manuals.find((manual: any) => {
		return manual["Expands"].length == 0;
	});
	const root_manual_page = await root_manual.retrievePage();
	return (
		<>
			<Container p="xl" size="md" >
				<NotionList
					page={root_manual_page}
				/>
			</Container>
		</>
	);
}

async function Project({
	name
}: {
	name: string
}) {

	const service = constructBlogService({
		// cache: "no-store"
		next: {revalidate: 5}
	});
	const project = await service.getProject(name);
	if (!project) {
		notFound();
		return null;
	}
	const typer = new EnRichedTextTyper();
	const title = typer
		.addGradientSegment(project.Name)
		.build();
	const description = typer
		.addTextSegment(project.Description)
		.build();
	
	const backup_image = "https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F23185bc3-4231-41dc-8e86-8a4ca374fa80%252F1681923508963.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75";
	const background_image = project.cover ? project.cover : backup_image;

	return (
		<>
			<Hero
				title={title}
				description={description}
				background_image={background_image}
				button="Get started"
				github_link={project["GitHub Page"]}
				disable_gradient={true}
			/>
			<Suspense>
				<Description
					project={project}
					/>
			</Suspense>
		</>
	);
}

// export async function generateStaticParams() {
   
// 	return {
// 		project: [
// 			["Bicycle%20Share%20V2"],
// 			["CV-Template"],
// 		]
// 	}
// }

export default function ProjectPage({
	params,
}: {
	params: {
		project: string;
	}
}) {
	const name = url_string(params.project);

	return (
		<>
			<main>
					<Project
						name={name}
					/>
			</main>
		</>
	);
}