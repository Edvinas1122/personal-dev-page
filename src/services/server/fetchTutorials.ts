import {
	constructBlogService,
	Project,
	Paged,
	Manual,
	ExternalDeps
} from "@/services/blog/blog.module";

// export interface ProjectStat extends Paged<Project> {
// 	repo_languages?: {[language: string]: number}
// }

type Tutorial = Paged<Manual> & {external: ExternalDeps[]};

export async function getTutorials<T>(
	reduce: (item: Tutorial) => T
): Promise<T[]> {
	"use server";
	const service = constructBlogService({
		next: {revalidate: 3500}
	});
	const entries = await service.getTutorials()
	// const languages = await fetchRepositoryLanguages(entries);
    // const entriesWithStats: ProjectStat[] = entries
	// 	.map((entry, index) => ({
	// 		...entry,
	// 		repo_languages: languages[index],
	// 	}));
	const reducedItems: T[] = entries
		.map(reduce);
	return reducedItems;
}

export type {
	Tutorial
}