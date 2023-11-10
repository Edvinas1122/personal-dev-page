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
import {
	Octokit,
	App
} from "octokit";

type Table = {
	Name: string
	Description: string
	Category: string
	Created: string
	cover: string
	external: {
		title: string
		image: string
		image_type: "emoji" | "image"
		description: string
		url: string
	}[]
	"GitHub Page": string,
	Dist: string,
	repo_languages?: {[language: string]: number}
}

async function fetchRepositoryLanguages(
	tables: Table[]
) {
	const octokit = new Octokit({
		auth: process.env.GITHUB_TOKEN
	});
	octokit.request.defaults({
		next: {revalidate: 36000}
	})
	const languages = await Promise.all(
		tables.map(async (table) => {
			if (!table["GitHub Page"]) return {};
			const [owner, repo] = table["GitHub Page"]
				.split("/")
				.slice(3);

			const repo_languages = await octokit.rest.repos.listLanguages({
				owner,
				repo,
				next: {revalidate: 36000}
			});
			// console.log(repo_languages.data);
			return repo_languages.data;
		})
	);
	return languages;
}


async function getTables() {
	const service = constructBlogService({
		// cache: "no-store"
		next: {revalidate: 350}
	});
	// const entires = await service.getProjects();
	const entires: Table[] = await service.getCompleteArchitercute();
	const languages = await fetchRepositoryLanguages(entires);
	entires.forEach((entry, index) => {
		entry.repo_languages = languages[index];
	});
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
		repo_languages: table.repo_languages
	}

}

async function TableList({
	user_name
}: {
	user_name: string
}) {
	const tables = await getTables();
	const tableList: ArticleCardProps[] = tables.map((table: any) => {
		return convertToArticleProps(table);
	});

	return (
		<>
			<div id={"Projects"}
			>
			<ArchitecturePreviewGrid 
				articles={tableList}
			/>
			<SkillsList />
			</div>
		</>
	);
}

import {
	SkillsGrid,
	Skill
} from "@/components/grid/skills/skills";

async function SkillsList({

}: {

}) {
	const external_deps: Skill[][] = await fetchSkills();
	console.log(external_deps);
	return (
		<>
			<SkillsGrid 
				skills={external_deps}
			/>
		</>
	);
} 

type GitHubUser = {
	data: {
		login: string
		id: number
		avatar_url: string
		location: string
		bio: string
		twitter_username: string
		name: string
		html_url: string
	}
}

function getUser(user: GitHubUser) {
	return {
		login: user.data.login,
		id: user.data.id,
		avatar_url: user.data.avatar_url,
		location: user.data.location,
		bio: user.data.bio,
		twitter_username: user.data.twitter_username,
		name: user.data.name,
		html_url: user.data.html_url
	}
}

type PersonalInfo = ReturnType<typeof getUser>;

type Dependency = {
	Name: string
	Description: string
	URL: string
	icon: string
	external: any[]
}

function getSkill(
	external_deps: Dependency,
	key: string
): Skill {
	return {
		title: external_deps.Name,
		description: external_deps.Description,
		url: external_deps.URL,
		image: external_deps.icon,
		category: key,
		featured: external_deps.external,
	}
}

async function fetchSkills() {
	"use server";
	const blog_service = constructBlogService({
		next: {revalidate: 30}
	});
	const external_deps = await blog_service.getGroupedExternalDeps(getSkill);
	return external_deps;
}

async function fetchPersonalInfo(): Promise<PersonalInfo> {
	"use server";
	const github_integration_token = process.env.GITHUB_INTEGRATION_TOKEN;
	const username = "edvinas1122";
	const octokit = new Octokit({
		github_integration_token
	});
	octokit.request.defaults({
		next: {
			revalidate: 36000,
			tags: [`user-${username}`]
		}
	})
	const user = await octokit.request(`GET /users/${username}`, {
		headers: {
		  'X-GitHub-Api-Version': '2022-11-28',
		},
		next: {revalidate: 350}
	});
	if (user.status !== 200) {
		console.error(user);
		throw new Error("Failed to fetch user info");
	}
	return getUser(user as GitHubUser);
}

export default async function Home() {

	const user: PersonalInfo = await fetchPersonalInfo();
	const typer = new EnRichedTextTyper();
	const title = typer
		.addTextSegment('Hi 👋, I am ')
		.addNewLine()
		.addTextSegment(user.name)
		.addNewLine()
		.addTextSegment('a ')
		.addGradientSegment('Full stack developer')
		.build();

	const description = typer
		.addTextSegment(user.bio)
		.build();

	const background_image = "https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F23185bc3-4231-41dc-8e86-8a4ca374fa80%252F1681923508963.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75"
	const github_link = user.html_url;

	return (
		<main>
			<Hero
				title={title}
				description={description}
				button="Let's talk"
				background_image={background_image}
				github_link={github_link}
				avatar={user.avatar_url}
			/>
			<Suspense fallback={<ArchitecturePreviewGrid/>}>
				<TableList
					user_name={user.login}
				/>
			</Suspense>
			<div 
				style={{
					height: "35vh"
				}}
			></div>
		</main>
	)
}
