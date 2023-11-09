import { Suspense } from "react";
import {
	constructBlogService
} from "@/services/blog/blog.module";
import {
	Hero
} from "@/components/hero/hero";
import
	EnRichedTextTyper
from "@/components/text/typer";
import {
	ArchitecturePreviewGrid,
	ArticleCardProps
} from "@/components/grid/preview/architecture";

async function getTables() {
	const service = constructBlogService({
		// cache: "no-store"
		next: {revalidate: 350}
	});
	// const entires = await service.getProjects();
	const entires = await service.getCompleteArchitercute();
	return entires;
}

function convertToArticleProps(table: any): ArticleCardProps {
	return {
		title: table.Name,
		description: table.Description,
		category: table.Category,
		created_at: table.Created,
		image: table.cover,
		external_deps: table.external as {
			title: string
			image: string
			image_type: "emoji" | "image"
			description: string
			url: string
		}[],
		github: table["GitHub Page"],
		radius: "md",
		height: "", // filled later
		dist: table.Dist,
	}

}

async function TableList() {
	const tables = await getTables();
	const tableList: ArticleCardProps[] = tables.map((table: any) => {
		return convertToArticleProps(table);
	});

	return (
		<>
			<div id={"Projects"}>
			<ArchitecturePreviewGrid 
				articles={tableList}
				/>
			</div>
		</>
	);
}

const info = "";

export default function Home() {

	const typer = new EnRichedTextTyper();
	const title = typer
		.addTextSegment('Hi 👋, I am ')
		.addNewLine()
		.addTextSegment('Edvinas Momkus')
		.addNewLine()
		.addTextSegment('a ')
		.addGradientSegment('Full stack developer')
		.build();
	const description = typer
		.addTextSegment(info)
		.build();

	const background_image = "https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F23185bc3-4231-41dc-8e86-8a4ca374fa80%252F1681923508963.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75"

	return (
		<main>
			<Hero
				title={title}
				description={description}
				button="Let's talk"
				background_image={background_image}
			/>
			<Suspense fallback={<ArchitecturePreviewGrid/>}>
				<TableList />
			</Suspense>
			<div 
				style={{
					height: "35vh"
				}}
			></div>
		</main>
	)
}
