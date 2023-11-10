"use client";
import {
	Badge,
	MantineGradient,
	Group,
	Title,
	Container,
	Paper,
	SimpleGrid,
} from '@mantine/core';

export type Skill = {
	title: string;
	category: string;
	description: string;
	image: string;
	url: string;
	featured: any[];
};

export function SkillsGrid({
	skills,
}: {
	skills: {[key: string]: Skill[]};
}) {


	return (
		<Container
			my="lg"
			size="lg"
		>
			<Title
			>Skills</Title>
			<Group
				display="flex"
				dir='row'
			>
			{Object.keys(skills).map((key) => (
				<Paper
				key={key}
				radius="md"
				>
				<SkillsCategoryGrid
					skills={skills[key]}
					skill_name={key}
					/>
				</Paper>
			))}
			</Group>
		</Container>
	);
}

function SkillsCategoryGrid({
	skills,
	skill_name,
}: {
	skills: Skill[];
	skill_name: string;
}) {

	const used_in_projects = skills.reduce((acc, skill) => {
		return acc + skill.featured.length;
	}, 0);
	const info = `Utilised ${skills.length} modules, in ${used_in_projects} projects`;

	return (
		<>
			<Paper
				display="flex"
				dir="row"
			>
				<StatsCard
					title={skill_name}
					subtitle={info}
				/>
				{/* {skills.map((skill) => (
					<SkillItem
						key={skill.title}
						skill={skill}
					/>
				))} */}
			</Paper>
		</>
	);
}

import {
	StatsCard,
} from '../../stats-cards/progres-card';

function SkillItem({
	skill,
} : {
	skill: Skill;
}) {
	return (
		<StatsCard

		/>
		// <div>
		// 	<div className="flex items-center justify-between">
		// 		<Badge>{skill.title}</Badge>
		// 	</div>

		// 	<div className="mt-2">
		// 		<p className="mt-2 text-gray-600 dark:text-gray-300">{skill.description}</p>
		// 	</div>

		// 	<div className="flex items-center justify-between mt-4">
		// 		<a
		// 			href={skill.url}
		// 			target="_blank"
		// 			rel="noopener noreferrer"
		// 			className="text-blue-600 dark:text-blue-400 hover:underline"
		// 		>
		// 			Learn More
		// 		</a>
		// 	</div>
		// </div>
	);
}