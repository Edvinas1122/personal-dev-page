"use client";
import {
	Badge,
	MantineGradient,
	Group,
} from '@mantine/core';
import classes from './image-card.module.css';

type CategoryBadgeProps = {
	gradient: MantineGradient;
	children?: React.ReactNode;
};

export function CategoryBadge(
	props: CategoryBadgeProps
) {
	return (
		<Badge
			className={classes.badge}
			variant="gradient"
			gradient={props.gradient}
			style={{textShadow: "none"}}
			>
			{props.children}
		</Badge>
	);

}

type LinkBadgeProps = {
	gradient: MantineGradient;
	url: string;
	icon: React.ReactNode;
	children: React.ReactNode;
};


export function LinkBadge(
	props: LinkBadgeProps
) {

	return (
		<Badge
			className={classes.badge}
			variant="gradient"
			gradient={props.gradient}
		>
		<HoverExample
			notHovered={
					<Group>
						{props.icon}
					</Group>
			}
		>
				<a
					href={props.url}
					target="_blank"
					style={{ textDecoration: 'none',
						color: "inherit"
					}}
				>
				<Group
				>
					{props.icon}
					{props.children}
				</Group>
			</a>
		</HoverExample>
		</Badge>
	);
}

import { useHover } from '@mantine/hooks';
import { motion } from 'framer-motion';

const animation = {
	retracted: {
		width: "1em",
		transition: {
			duration: 0.5,
		}
	},
	expanded: {
		width: "100%",
		transition: {
			duration: 0.5,
		}
	}
}

export function HoverExample({
	children,
	notHovered,
}: {
	children: React.ReactNode;
	notHovered?: React.ReactNode;
}) {
	const {hovered, ref} = useHover();

	const Hovered = () => (
		<motion.div
			animate={{
				scale: [1, 1.03, 1],
			}}
			transition={{
				duration: 0.5
			}}
		>
			{children}
		</motion.div>
	)

	return (
		<div
			ref={ref}
			>
			{hovered ? 	
				<Hovered/>
				: 
				notHovered
			}
		</div>
	);
}

