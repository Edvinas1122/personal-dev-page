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
import {
	generateProjectMetadata
} from "./meta";

export const generateMetadata = generateProjectMetadata;

export default function ArticlePage({
	params,
}: {
	params: {
		project: string[]
	}
}) {
	const relation = params.project[1];
	const section = params.project[2];

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
						relation: relation as ItemPaths,
						name: url_string(section),
					}}
				/>
			</Suspense>
		</>
	);
}