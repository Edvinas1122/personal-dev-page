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
	if (!root_manual) {
		return <></>
	}
	const root_manual_page = await root_manual.retrievePage();
	return (
		<>
			<Paper
				shadow="md"
				radius="md"
				mt="md"
				p="md"
			>
				<NotionList
					page={root_manual_page}
					/>
			</Paper>
		</>
	);
}

import {
	ArticleCardProps,
	GeneralArticleCard
} from '@/components/article-cards/card';

async function Project({
	name
}: {
	name: string
}) {

	const service = constructBlogService({
		// cache: "no-store"
		next: {revalidate: 400}
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

	return (
		<>
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
			{/* <Project
				name={name}
			/> */}
		</>
	);
}