"use client";
import {
	Badge,
	MantineGradient,
	Group,
	Title,
	Container,
	Card,
	Paper,
	SimpleGrid,
	Text,
	Center,
	rem,
} from '@mantine/core';

export type Skill = {
	title: string;
	category: string;
	description: string;
	image_type: "emoji" | "image";
	image: string;
	url: string;
	featured: any[];
};

type SkillDisplay = {
	name: string;
	modules_used: Skill[];
	at_projects: Skill["featured"][];
}

export function SkillsGrid({
	skills,
}: {
	skills: SkillDisplay[]
}) {


	return (
			<>
			<SimpleGrid
				cols={{base: 2, sm: 3, lg: 4}}
				spacing={{base: 'md', sm: 'lg'}}
				style={{
					justifyContent: 'space-around',
					alignItems: 'center',
				}}

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
	SkillItem,
} from '../../article-cards/related-items'
import {
	motion
} from 'framer-motion'

const animation = {
	retracted: {
		maxWidth: 'rem(30px)',
	},
	expanded: {
		maxWidth: '100%',
		transformation : {
			delayChildren: 0.1,
			staggerChildren: 0.2,
		}
	},
}

const item = {
	retracted: {
	},
	expanded: {
		left: 40,
	}
}

/*
	https://mantine.dev/hooks/use-hover/
*/
import { useHover } from '@mantine/hooks';

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
				<Text fz="sm" c="dimmed">
					Utilised 
				</Text>
				<Badge size="sm">
					{props.modules_used.length} tools
				</Badge>
				<Text fz="sm" c="dimmed">
					in
				</Text>
				<Badge size="sm">
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
			<RetractableAccordion
				skills={props.modules_used}
			/>
			<RetractableAccordion
				skills={props.at_projects as unknown as Skill[]}
			/>
		</StatsCard>		
		</>
	);
}

export function RetractableAccordion({
	skills,
}: {
	skills: Skill[];
}) {
	const { hovered, ref } = useHover();
	return (
		<>
			<div
				ref={ref}
				style={{
					position: 'relative',
					// background: 'black',
					height: rem(20),
					width: "100%"
				}}
			>
			<motion.ol
				variants={animation}
				initial="retracted"
				style={{
					listStyle: 'none',
					position: 'absolute',
					height: rem(20),
					top: rem(-20),
					marginTop: rem(10),
					marginBottom: rem(10),
				}}
				animate={hovered ? 'expanded' : 'retracted'}
				
			>
				{skills.map((skill) => {
					const calculate_expand_distance = (index: number) => {
						return index * 40;
					};
					return skills.map((project, index) => {
						const distance_to_expand = calculate_expand_distance(index);
						return (
							<motion.li
								style={{
									position: "absolute",
									left: `${index * 16}px`,
									zIndex: index + 10,
									top: 0,
								}}
								variants={{
									retracted: {
										left: `${index * 16}px`,
									},
									expanded: {
										opacity: 1,
										left: `${distance_to_expand}px`,
									},
								}}
								key={project.title}
							>
							<SkillItem
								{...{
									title: project.title,
									image: project.image,
									image_type: project.image_type,
									description: project.description,
									url: project.url,
									textColor: "dimmed",
									hideUndertitle: true,
									bordered: true,
								}}
								/>
							</motion.li>
						)
					})
				})}
			</motion.ol>
			</div>
		</>
	);
}

import {
	StatsCard,
} from '../../stats-cards/progres-card';

