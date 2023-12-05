import
	SkillsCategoryGrid
from "./_components/stats/skill"
import {
	SimpleGrid,
	Group,
	Title,
	Text,
	Paper
} from "@mantine/core"
import {
	fetchSkills
} from "./_components/stats/fetch"
import { Suspense } from "react";

export default function HomePage({

}:{

}) {


	return (
		<Group
			my="xl"
			gap={"xl"}
		>
			<BigPaper>
			<Announcement
				title="Skills"
				subinfo="In last projects I worked with these tools"
				isTextOnRight={false}
			/>
			<Suspense>
				<Skills/>
			</Suspense>
			</BigPaper>
			<BigPaper>
				<Suspense>
					<Languages/>
				</Suspense>
				<Announcement
					title="Languages"
					subinfo="In my GitHub most common languages I have used"
					isTextOnRight={true}
				/>
			</BigPaper>
		</Group>
	);
}

function Announcement({
	title,
	subinfo,
	isTextOnRight
}:{
	title: string,
	subinfo: string,
	isTextOnRight: boolean,
}) {
	return (
		<Group
			style={{
				flexDirection: "column",
				alignItems: isTextOnRight ? "start" : "end" // Adjust alignment based on the variable
			}}
		>
			<Title size="5rem">{title}</Title>
			<Text
				size="2rem"
				style={{
					textAlign: isTextOnRight ? "start" : "end" // Adjust text alignment based on the variable
				}}
			>
				{subinfo}
			</Text>
		</Group>
	);
}



function BigPaper({
	children
}:{
	children: React.ReactNode

}) {
    const isTextOnRight = false;

    return (
        <>
			<Paper
				withBorder
				p="lg"
				my="xl"

			>
            <SimpleGrid
                cols={{ base: 1, sm: 2 }}
                style={{
					placeItems: "center",
                }}
				>
				{children}
            </SimpleGrid>
			</Paper>
        </>
    );
}

async function Skills()
{
	const skills = await fetchSkills();
	return (
		<>
			<SimpleGrid
					cols={{ base: 1, sm: 1, md: 2 }}
				>
					{skills.map((skill) => (
						<SkillsCategoryGrid
							key={skill.name}
							skill_name={skill.name}
							modules_used={skill.modules_used}
							at_projects={skill.at_projects}
						/>
					))}
			</SimpleGrid>
		</>
	);
}

import {
	getGitHubStats
} from "./fetch";
import {
	ProgressCard
} from "@/components/stats-cards/progrss-card-2";

async function Languages()
{
	const stats = await getGitHubStats({
		user_name: "edvinas1122"
	});

	return (
		<Group
			dir="column"
			gap="0"
		>
			<Text
				size="xs"
			>
				{`In total ${stats.repos} repositories`}
			</Text>
			<ProgressCard
				items={stats.language_info}
			/>
		</Group>
	)
}