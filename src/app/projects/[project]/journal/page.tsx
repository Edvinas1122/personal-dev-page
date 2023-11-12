import {
	constructBlogService
} from "@/services/blog/blog.module";
import { DevJournal } from "@/services/blog/blog.orm";
import {
	url_string
} from "@/utils/url_string";
import { Suspense } from "react";

async function fetchJournal(
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
	return journal;
}

import {
	Text,
	Title,
	Container,
	SimpleGrid,
	Paper
} from "@mantine/core";

async function JournalGrid({
	name,
	page
}: {
	name: string
	page: number
}) {
	const journal = await fetchJournal(name, page);
	return (
		<SimpleGrid
			
		>
			{journal.map((entry, index: number) => {
				return (
					<div key={index}>
						<JournalItem
							entry={entry}
							project={name}
						/>
					</div>
				);
			})}
		</SimpleGrid>
	);
}

import Link from "next/link";

async function JournalItem({
	entry,
	project
}: {
	entry: DevJournal
	project: string
}) {

	return (
		<Paper
			shadow="md"
			withBorder
		>
			<Title>{entry.Name}</Title>
			<Text>{entry.Description}</Text>
			<Link
				href={`/projects/${project}/journal/${entry.Name}`}
			>
				Read More
			</Link>
		</Paper>
	);
}

function JournalGridSkeleton() {
	return (
		<div>
			<h1>Journal loading</h1>
			<p>...</p>
		</div>
	);
}

function ProjectJournalPage({
	params
}: {
	params: {
		project: string,
	}
}) {

	return (
		<div>
			<h1>{params.project}</h1>
			<Suspense fallback={<JournalGridSkeleton/>}>
			<JournalGrid
				name={params.project}
				page={0}
			/>
			</Suspense>
		</div>
	);
}

export default ProjectJournalPage;