import {
	ProjectSelection,
	Loading
} from "./_components/projects/module";
import { Suspense } from "react";


export default function ProjectsLayout({
	children,
}: {
	children: React.ReactNode,
}) {
	return (
		<>
			<Suspense fallback={<Loading/>}>
				<ProjectSelection/>
			</Suspense>
			{children}
		</>
	);
}