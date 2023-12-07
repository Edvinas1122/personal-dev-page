import { Suspense } from "react";
import {
	url_string
} from "@/utils/url_string";

import ArticleDisplay, {
	Loading
} from "@/app/projects/[...project]/_components/article/component"
import {
	ItemPaths
} from "@/services/server/fetchProjectItems";
import {
	generateTutorialMetadata
} from "./meta";

export const generateMetadata = generateTutorialMetadata;

export default function ArticlePage({
	params,
}: {
	params: {
		tutorial: string[]
	}
}) {
	const tutorial_name = url_string(params.tutorial[0]);

	return (
		<>
			<Suspense fallback={
				<Loading/>
			}>
				<ArticleDisplay
					params={{
						relation: ItemPaths.manual,
						name: url_string(tutorial_name),
					}}
				/>
			</Suspense>
		</>
	);
}