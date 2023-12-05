import { DevJournal, Manual } from "@/services/blog/blog.orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
	Text,
	Button,
} from "@mantine/core";
import {
	RouteReactiveGrid
} from "./components";
import {
	fetchProjectItem,
	ItemPaths,
	CardItem,
} from "@/services/server/fetchProjectItems";

function describeManual(
	type: Manual["Type"],
	part: Manual["Part"],
	expands: Manual["Expands"],
): string {
	if (type == "Documentation" && part == "Full" && expands.length == 0) {
		return "A full documentation of the project";
	} else if (type == "Documentation" && part == "Full" && expands.length > 0) {
		return "Main documentation of the project";
	} else if (type == "Documentation" && part == "Fragment") {
		return "Documentation part";
	} else if (type == "Tutorial" && part == "Full") {
		return "A tutorial for the project";
	} else if (type == "Tutorial" && part == "Fragment") {
		return "A tutorial for a part of the project";
	} else 
		return "A manual for the project";
}

function reduceManual(manual: Manual) {
	const description = describeManual(
		manual.Type,
		manual.Part,
		manual.Expands
	);
	return {
		title: manual.Name,
		description: description,
	};
}

function reduceDevJournal(journal: DevJournal) {
	return {
		title: journal.Name,
		description: journal.Description,
		date: journal.Date,
	};
}

async function ItemsGrid({
	project_name,
	project_items,
	page,
}: {
	project_name: string;
	project_items: ItemPaths;
	page: number;
}) {
	const reducer = (project_items == ItemPaths.manual)
		? reduceManual : reduceDevJournal;
	// const wait = await new Promise(resolve => {
	// 	setTimeout(resolve, 50000);
	// }); // debug block for loading skeleton
	const journal = await fetchProjectItem(
		project_name,
		project_items,
		reducer as (item: Manual | DevJournal) => CardItem,
		page
	);
	if (!journal) {
		notFound();
	}
	return (
		<>
			<RouteReactiveGrid
				heading={
					<>
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
						<li key={index}
							style={{
								padding: "0 5px"
							}}
						>
							<JournalItem
								entry={entry}
								project={project_name}
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


function JournalItem({
	entry,
	project
}: {
	entry: CardItem,
	project: string
}) {
	return (
		<ActiveSegmentComponent
			title={entry.title}
		>
			{entry.date && <Text
				size={"xs"}
			>
				{entry.date}
			</Text>}
			<Text
				size={"xs"}
				lineClamp={3}
			>{entry.description}</Text>
			<Button
				variant="outline"
				size="xs"
				component={Link}
				href={entry.path}
				style={{
					textDecoration: "none",
				}}
			>
				Read More
			</Button>
		</ActiveSegmentComponent>
	);
}

import Loading from "./loading";

// export async function generateStaticParams() {
// 	// const projects = await fetchAvailableProjects();
// 	return [
// 		["API%20Wrapper", "manual", "Use%20API%20wrapper"],
// 		["WebSocketService", "journal", "Auto%20Message%20Parsing%20error"],
// 		// [],
// 	]
// }

function ArticleSelector({
	params
}: {
	params: {
		project: string[]
	}
}) {

	const project_name = params.project[0];
	const route = params.project[1];

	function checkRoute(route: string | undefined) {
		switch (route) {
			case undefined:
				return ItemPaths.journal;
			case ItemPaths.journal:
				return route;
			case ItemPaths.manual:
				return route;
			default:
				return null;
		}
	}

	const route_name = checkRoute(route);
	if (!route_name) {
		notFound();
	}

	return (
		<>
		<Suspense fallback={<Loading/>}>
			<ItemsGrid
				project_name={project_name}
				project_items={route_name}
				page={0}
				/>
		</Suspense>
		</>
	);
}
export default ArticleSelector;