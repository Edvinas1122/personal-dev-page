import { Card, Image, Avatar, Text, Group } from '@mantine/core';
import { ArticleCardProps } from './card';
import classes from './image-card.module.css';

export function ArticleCardVertical(
	props: ArticleCardProps
) {
	return (
		<Card
			withBorder
			radius="md"
			p={0}
			className={classes.card_vertical}
			style={{ height: props.height }}
		>
		<Group wrap="nowrap" gap={0}>
			<Image
				alt={`${props.title} cover image`}
				src="https://images.unsplash.com/photo-1602080858428-57174f9431cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
				height={160}
			/>
			<div className={classes.body_vertical}>
			<Text tt="uppercase" c="dimmed" fw={700} size="xs">
				technology
			</Text>
			<Text className={classes.title_vertical} mt="xs" mb="md">
				The best laptop for Frontend engineers in 2022
			</Text>
			<Group wrap="nowrap" gap="xs">
				<Group gap="xs" wrap="nowrap">
				<Avatar
					size={20}
					src="https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
				/>
				<Text size="xs">Elsa Typechecker</Text>
				</Group>
				<Text size="xs" c="dimmed">
				•
				</Text>
				<Text size="xs" c="dimmed">
				Feb 6th
				</Text>
			</Group>
			</div>
		</Group>
		</Card>
	);
}