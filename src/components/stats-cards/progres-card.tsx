"use client";
import {
	ThemeIcon,
	Progress,
	Text,
	Group,
	Badge,
	Paper,
	rem,
	Title,
	Card,
} from '@mantine/core';
import {
	IconUxCircle,
	IconAffiliateFilled,
	IconBrandOnedrive,
	IconBrandNpm,
	IconPackage,
	IconBrandNetbeans
} from '@tabler/icons-react';
import classes from './progres-card.module.css';

function IconSelector(props: {
	title: string;
}) {

	const visual = {
		style: {
			width: rem(32),
			height: rem(32)
		},
		stroke: 1
	};

	switch (props.title) {
		case "UX/UI":
			return <IconUxCircle {...visual} />;
		case "Framework":
			return <IconBrandNetbeans {...visual} />;
		case "Cloud":
			return <IconBrandOnedrive {...visual} />;
		case "NPM":
			return <IconBrandNpm {...visual} />;
		case "package manager":
			return <IconPackage {...visual} />;

		default:
			return <IconAffiliateFilled {...visual} />;
	}
}

export function StatsCard({
	title,
	subtitle,
	children,
	ref
}: {
	title: string;
	subtitle: React.ReactNode;
	children: React.ReactNode;
	ref?: React.RefObject<HTMLDivElement>;
}) {
	return (
		<Paper
			radius="md"
			withBorder
			p="xs"
			w="fit-content"
			className={classes.card}
			// mt={20}
			ref={ref}
		>
		<Group
			dir="row"
		>
			<ThemeIcon className={classes.icon} size={50} radius={50}>
				<IconSelector title={title} />
			</ThemeIcon>
			<Group
				style={{flexDirection: "column", alignItems: "start"}}
				gap="3px"
			>
				<Title ta="start" order={3} fw={700} className={classes.title}>
					{title}
				</Title>
				<Group justify="start" gap={4}>
					{subtitle}
				</Group>
			</Group>
		</Group>

		<Group justify="start" mt="xs">
			{children}
		</Group>

		{/* <Progress value={62} mt={5} /> */}

		</Paper>
	);
}