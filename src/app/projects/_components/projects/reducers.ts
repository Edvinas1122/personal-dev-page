import {
	ArticleCardProps
} from "./components/module";
import {
	ProjectStat
} from "@/services/server/fetchGitStats";

export function convertToArticleProps(table: ProjectStat): ArticleCardProps {
	return {
		title: table.Name,
		description: table.Description,
		category: table.Category,
		created_at: table.Created,
		image: table.cover,
		external_deps: table.external as {
			title: string
			image: string
			image_type: "emoji" | "image"
			description: string
			url: string
		}[],
		github: table["GitHub Page"],
		radius: "md",
		height: "", // filled later
		dist: table.Dist,
		repo_languages: table.repo_languages
	}

}

