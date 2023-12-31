import {
	SelectionDisplay,
	Loading
} from "../_components/projects/module";
import {
	getTables
} from "@/services/server/fetchGitStats";
import {
	convertToArticleProps
} from "../_components/projects/reducers"
import { Suspense } from "react";
import {
	HeaderCard,
} from "../_components/projects/module"
import {
	linker
} from "@/utils/linker"

export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<>
			<Suspense fallback={<Loading/>}>
				<SelectionDisplay
					retrieveSelection={getTables}
					reducer={convertToArticleProps}
					Card={HeaderCard}
					linker={linker("projects")}
				/>
			</Suspense>
			{children}
		</>
	);
}