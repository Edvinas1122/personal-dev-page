import {
	constructBlogService,
	Manual,
	DevJournal,
	AquisitionMethod
} from "@/services/blog/blog.module";
import {
	url_string,
	to_url_string
} from "@/utils/url_string";
import { notFound } from "next/navigation";

export async function fetchAvailableProjects()
{
	"use server";
	const projects = constructBlogService({
		cache: "no-store"
	});
	const availableProjects = await projects.getAvailable();
	return availableProjects.map((project) => (
		to_url_string(project.Name)
	));
}

const cachePolicies = {
	journal: {
		revalidate: 50
	},
	projects: {
		revalidate: 50
	}
}

export async function fetchProjectManuals(
	name: string
): Promise<Manual[]> {
	"use server";
	const service = constructBlogService({
		next: {
			revalidate: 50
		}
	});
	const correctedName = url_string(name);
	const project = await service
		.getProject(correctedName);
	if (!project) {
		notFound();
	};
	const manualMethods = project.Manual.map((
		manual: AquisitionMethod<Manual>
	) => {
		return manual;
	});
	const manuals = await Promise.all(manualMethods.map(
		async (method: AquisitionMethod<Manual>) => {
			const manual = await method();
			return manual;
		}
	));
	return manuals;
}

export async function fetchProjectJournal(
	name: string,
	page: number
) {
	"use server";
	const service = constructBlogService({
		next: { revalidate: 30 }
	});
	const journal = await service.getJournal({
		name: url_string(name),
		page: 0,
	});
	if (!journal) {
		notFound();
	}
	return journal;
}

export enum ItemPaths {
	manual = "manual",
	journal = "journal",
}

type PageItems = Manual | DevJournal;

export type CardItem = {
	title: string;
	description: string;
	path: string;
	date?: string;
};

export async function fetchProjectItem<T extends PageItems>(
	name: string,
	item_type: ItemPaths,
	reducer: (item: T) => Omit<CardItem, "path">,
	page: number
) {
	function reduce (item: T) {
		const reduced_item = reducer(item);
		return {
			...reduced_item,
			path: `/projects/${to_url_string(name)}/${item_type}/${to_url_string(item.Name)}`,
		};
	}
	function reduceEach(item: T[]) {
		return item.map(reduce);
	}

	if (item_type === ItemPaths.manual) {
		return fetchProjectManuals(name)
			.then(reduceEach as (item: Manual[]) => CardItem[]);
	}
	if (item_type === ItemPaths.journal) {
		return fetchProjectJournal(name, page)
			.then(reduceEach as (item: DevJournal[]) => CardItem[]);
	}
	return null;
}

async function fetchArticle(name: string) {
	"use server";
	const service = constructBlogService({
		next: cachePolicies.journal
	});
	const article = await service.getJournalArticle({
		name: name,
	});
	return article;
}

async function fetchManual(name: string) {
	"use server";
	const service = constructBlogService({
		next: cachePolicies.journal
	});
	const manual = await service.getManual({
		name
	});
	return manual;
}

export async function fetchProjectItemPage(
	item_type: ItemPaths,
	item_name: string
) {
	if (item_type === ItemPaths.manual) {
		return fetchManual(item_name);
	}
	else if (item_type === ItemPaths.journal) {
		return fetchArticle(item_name);
	}
	return null;
}