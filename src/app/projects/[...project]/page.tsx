import { Suspense } from "react";
import {
	url_string
} from "@/utils/url_string";

import ArticleDisplay, {
	Loading
} from "./_components/article/component"
import {
	ItemPaths
} from "@/services/server/fetchProjectItems";


export default function ArticlePage({
	params,
}: {
	params: {
		project: string[]
	}
}) {
	const project_name = url_string(params.project[0]);
	const relation = params.project[1];
	const section = params.project[2];

	console.log("article", project_name, relation, section);
	if (!relation || !section) {
		return null;
	}

	return (
		<>
			<Suspense fallback={
				<Loading/>
			}>
				<ArticleDisplay
					params={{
						project: project_name,
						relation: relation as ItemPaths,
						name: url_string(section),
					}}
				/>
			</Suspense>
		</>
	);
}