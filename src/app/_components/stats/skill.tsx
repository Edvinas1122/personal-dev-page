import {
	Text,
	Badge,
} from "@mantine/core"

type Skill = {
	title: string;
	category: string;
	description: string;
	image_type: "emoji" | "image";
	image: string;
	url: string;
	featured: any[];
};

import {
	StatsCard
} from "@/components/stats-cards/progres-card"
// import {
// 	RetractableAccordion
// } from "@/components/grid/skills"


function SkillsCategoryGrid(
	props: {
		skill_name: string;
		modules_used: Skill[];
		at_projects: Skill["featured"][];
	}
) {

	const Info = () => {
		return (
			<>
				<Text fz="xs" c="dimmed">
					Utilised 
				</Text>
				<Badge size="xs">
					{props.modules_used.length} tools
				</Badge>
				<Text fz="xs" c="dimmed">
					in
				</Text>
				<Badge size="xs">
					{props.at_projects.length} projects
				</Badge>
			</>
		);
	};

	return (
		<>
		<StatsCard
			title={props.skill_name}
			subtitle={<Info/>}
		>
			<></>
			{/* <RetractableAccordion
				skills={props.modules_used}
			/>
			<RetractableAccordion
				skills={props.at_projects as unknown as Skill[]}
			/> */}
		</StatsCard>		
		</>
	);
}

export default SkillsCategoryGrid;