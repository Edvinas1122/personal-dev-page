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
				repo
			});
			return repo_languages.data;
		})
	);
	return languages;
}


async function getTables() {
	const service = constructBlogService({
		// cache: "no-store"
		next: {revalidate: 3500}
	});
	// const entires = await service.getProjects();
	const entires: Table[] = await service.getCompleteArchitercute();
	// const languages = await fetchRepositoryLanguages(entires);
	// 	entires.forEach((entry, index) => {
	// 		entry.repo_languages = languages[index];
	// });
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

type RepoInfo = {
	owner: any;
	full_name: string;
	id: number;
};

const transformAndNormalize = (values: number[]) => {
    // Apply a transformation (e.g., square root) to reduce differences
    const transformed = values.map(value => Math.sqrt(value));

    // Calculate the sum of transformed values
    const sumTransformed = transformed.reduce((sum, current) => sum + current, 0);

    // Normalize to make the total 100%
    return transformed.map(value => (value / sumTransformed) * 100);
};

// async function getGitHubStats({
// 	user_name
// }: {
// 	user_name: string
// }) {
// 	const octokit = new Octokit({
// 		auth: process.env.GITHUB_TOKEN
// 	});
// 	octokit.request.defaults({
// 		next: {revalidate: 36000}
// 	})
// 	const all_repos = await octokit
// 		.request(`GET /users/${user_name}/repos`, {
// 			headers: {
// 				'X-GitHub-Api-Version': '2022-11-28'
// 			}
// 		});
// 	const not_forked_repos = all_repos.data.filter((repo: any) => {
// 		return !repo.fork;
// 	});
// 	const languages_used = await Promise.all(
// 		not_forked_repos.map(async (repo: any) => {
// 			const repo_languages = await octokit.rest.repos.listLanguages({
// 				owner: repo.owner.login,
// 				repo: repo.name
// 			});
// 			return repo_languages.data;
// 		})
// 	);
// 	type Languages = {[lang: string]: number};
// 	const languages: Languages = languages_used.reduce((acc: any, curr: any) => {
// 		for (const [key, value] of Object.entries(curr)) {
// 			if (acc[key]) {
// 				acc[key] += value;
// 			} else {
// 				acc[key] = value;
// 			}
// 		}
// 		return acc;
// 	}, {});
// 	const totalBytes = Object.values(languages)
// 		.reduce((total, current) => total + current, 0);
// 	const languagePercentages: Languages = Object.entries(languages)
// 		.map(([language, bytes]): [string, number] => [language, Math.round((bytes / totalBytes) * 100)])
// 		.sort((a, b) => (b as [string, number])[1] - (a as [string, number])[1]) // Type assertion
// 		.reduce((obj: Languages, [language, percentage]) => {
// 			obj[language] = percentage;
// 			return obj;
// 		}, {});
// 	return {
// 		repos: not_forked_repos.length,
// 		language_info: languagePercentages,
// 	}
// }

import {
	ProgressCard
} from "@/components/stats-cards/progrss-card-2";

async function TableList({
	user_name
}: {
	user_name: string
}) {
	const tables = await getTables();
	const tableList: ArticleCardProps[] = tables.map((table: any) => {
		return convertToArticleProps(table);
	});
	// const stats = await getGitHubStats({user_name});

	return (
		<>
			<div id={"Projects"}
			>
			<ArchitecturePreviewGrid 
				articles={tableList}
			/>
			{/* <SkillsList /> */}
			{/* <ProgressCard 
				title="GitHub Stats"
				description={`Programming Languages used in ${stats.repos} repositories`}
				items={stats.language_info}
			/> */}
			</div>
		</>
	);
}

import {
	SkillsGrid,
	Skill
} from "@/components/grid/skills/skills";

// async function SkillsList({

// }: {

// }) {
// 	const skills_display: SkillDisplay[] = await fetchSkills();

// 	return (
// 		<>
// 			<SkillsGrid 
// 				skills={skills_display}
// 			/>
// 		</>
// 	);
// } 

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
	icon: {
		type: "emoji" | "image"
		[key: string]: any
	}
	external: any[]
}

function getIcon(image: any) {
	if (image.type === "emoji") {
		return image.emoji;
	} else if (image.type === "external") {
		return image.external.url;
	} else if (image.type === "file") {
		return image.file.url;
	} else {
		return image;
	}
}

function getSkill(
	external_deps: Dependency,
	key: string
): Skill {
	return {
		title: external_deps.Name,
		description: external_deps.Description,
		url: external_deps.URL,
		image_type: external_deps.icon.type as Dependency["icon"]["type"],
		image: getIcon(external_deps.icon),
		category: key,
		featured: external_deps.external,
	}
}

type SkillDisplay = {
	name: string
	modules_used: Skill[]
	at_projects: Skill["featured"][]
}

async function fetchSkills(): Promise<SkillDisplay[]> {
    "use server";
    const blog_service = constructBlogService({
        next: { revalidate: 4000 }
    });
    const external_deps: {[key: string]: Skill[]} = await blog_service.getGroupedExternalDeps(getSkill);
    const skillDisplays = Object.keys(external_deps).map(key => {
        const at_projects: Skill["featured"] = [];
        const already_added: string[] = [];
        external_deps[key].forEach((module) => {
            module.featured.forEach((project) => {
                if (!already_added.includes(project.title)) {
                    at_projects.push(project);
                    already_added.push(project.title);
                }
            });
        });
        return {
            name: key,
            modules_used: external_deps[key],
            at_projects: at_projects,
        };
    });
	skillDisplays.sort((a, b) => {
		return b.modules_used.length - a.modules_used.length;
	});
    return skillDisplays;
}

async function fetchPersonalInfo(): Promise<PersonalInfo> {
	"use server";
	const github_integration_token = process.env.GITHUB_INTEGRATION_TOKEN;
	const username = "edvinas1122";
	const octokit = new Octokit({
		auth: github_integration_token
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
		next: {revalidate: 35000}
	});
	if (user.status !== 200) {
		console.error(user);
		throw new Error("Failed to fetch user info");
	}
	return getUser(user as GitHubUser);
}

export default async function Home() {

	// const user: PersonalInfo = await fetchPersonalInfo();
	const user: PersonalInfo = {
		login: "edvinas1122",
		id: 50779875,
		avatar_url: "https://avatars.githubusercontent.com/u/50779875?v=4",
		location: "Lithuania",
		bio: "Full stack developer",
		twitter_username: "edvinas1122",
		name: "Edvinas Momkus",
		html_url: "",
	}

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
		<>
			{/* <Hero
				title={title}
				description={description}
				button="Let's talk"
				background_image={background_image}
				github_link={github_link}
				avatar={user.avatar_url}
			/> */}
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
		</>
	)
}
