import {
	ArchitecturePreviewGrid,
	ArticleCardProps,
	HeaderCard,
} from "./components/module";
import {
	getTables
} from "@/services/server/fetchGitStats";
import {
	convertToArticleProps
} from "./reducers"
import {
	animation
} from "./config"

export default async function ProjectSelection() {

	const tables = await getTables<ArticleCardProps>(
		convertToArticleProps
	);

	const GridItems = tables.map((table_props: ArticleCardProps) => {
		if (!table_props.title) return;
		return <HeaderCard
					key={table_props.title}
					{...table_props}
					// @ts-ignore
					variants={animation.item}
				/>;
	});

	return (
		<>
			<ArchitecturePreviewGrid
				variant={animation.container}
			>
				<>
					{GridItems}
				</>
			</ArchitecturePreviewGrid>
		</>
	)
}
