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

async function Description({
	project
} : {
	project: any
}) {

	const manual_aquisition_methods = project["Manual"];
	const manuals = await Promise.all(manual_aquisition_methods.map(async (method: any) => {
		const manual = await method();
		return manual;
	}));

	const root_manual = manuals.find((manual: any) => {
		return manual["Expands"].length == 0;
	});
	// console.log(root_manual);
	const root_manual_page = await root_manual.retrievePage();
	console.log(root_manual_page);
	return (
		<>
			<Container p="xl" size="md" >
			<NotionList // transpiles blocks
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

	console.log(name);
	const service = constructBlogService({
		// cache: "no-store"
		next: {revalidate: 5}
	});
	const project = await service.getProject(name);
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

export default function ProjectPage({
	params,
}: {
	params: {
		project: string[]
	}
}) {
	if (params.project.length == 0) {
		return null;
	}
	const name = url_string(params.project[0]);
	console.log("being called");
	return (
		<>
			<main>
				<Suspense>
					<Project
						name={name}
					/>
				</Suspense>
			</main>
		</>
	);
}