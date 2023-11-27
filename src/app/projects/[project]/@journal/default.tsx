import {
	constructBlogService
} from "@/services/blog/blog.module";
import { DevJournal } from "@/services/blog/blog.orm";
import {
	url_string
} from "@/utils/url_string";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function fetchJournal(
	name: string,
	page: number
) {
	"use server";
	const service = constructBlogService({
		next: { revalidate: 30 }
	});
	try {
		const journal = await service.getJournal({
			name: url_string(name),
			page: 0,
		});
		if (!journal) {
			notFound();
		}
		return journal;
	} catch (e) {
		notFound();
	}
}

import {
	Text,
	Title,
	Container,
	SimpleGrid,
	Paper,
	Button,
	Card,
} from "@mantine/core";

import {
	RouteReactiveGrid
} from "./components";

async function JournalGrid({
	name,
	page
}: {
	name: string
	page: number
}) {
	const journal = await fetchJournal(name, page);
	return (
		<>
			<RouteReactiveGrid
				heading={
					<>
						<Title
							order={2}
						>
							<Link
								href={`/projects/${name}`}
								style={{
									textDecoration: "none",
									color: "inherit",
								}}
							>
							Journal
							</Link>
						</Title>
						<Text
							size="xs"
						>
							{`${journal.length} entries`}
						</Text>
					</>
				}
			>
				{journal.map((entry, index: number) => {
					return (
						<li key={index}>
							<JournalItem
								entry={entry}
								project={name}
							/>
						</li>
					);
				})}
			</RouteReactiveGrid>
		</>
	);
}

import Link from "next/link";
import {
	ActiveSegmentComponent
} from "./components";


async function JournalItem({
	entry,
	project
}: {
	entry: DevJournal
	project: string
}) {
	return (
		<ActiveSegmentComponent
			title={entry.Name}
		>
			<Text
				size={"xs"}
			>
				{entry.Date}
			</Text>
			<Text
				size={"xs"}
				lineClamp={3}
			>{entry.Description}</Text>
			<Button
				variant="outline"
				size="xs"
				component={Link}
				href={`/projects/${project}/journal/${entry.Name}`}
				style={{
					textDecoration: "none",
					// color: "inherit",
				}}
			>
				Read More
			</Button>
		</ActiveSegmentComponent>
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
		<Suspense fallback={<JournalGridSkeleton/>}>
		<JournalGrid
			name={params.project}
			page={0}
		/>
		</Suspense>
	);
}

export default ProjectJournalPage;