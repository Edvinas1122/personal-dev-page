import {
	SelectionDisplay,
	Loading
} from "../_components/projects/module";
import { Suspense } from "react";
import {
	getTutorials
} from "@/services/server/fetchTutorials";
import {
	convertManualToArticleProps
} from "../_components/projects/reducers";
import {
	HeaderCard,
} from "../_components/projects/module"
import {
	linker
} from "@/utils/linker"

export default function TutorialsLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<>
			<Suspense fallback={<Loading/>}>
				<SelectionDisplay
					retrieveSelection={getTutorials}
					reducer={convertManualToArticleProps}
					Card={HeaderCard}
					linker={linker("tutorials")}
				/>
			</Suspense>
			{children}
		</>
	);
}