import {
	Paper,
	Text,
	Title,
	Button,
	useMantineTheme,
} from '@mantine/core';
import { ArticleCardProps } from './card';
import classes from './image-card.module.css';

export function ArticleCardImage(
	props: ArticleCardProps
) {

	// const theme = useMantineTheme();

	return (
		<Paper
			shadow="md"
			p="xl"
			radius="md"
			className={classes.card}
			style={{
				height: props.height
			}}
		>
			<div>
				<Text className={classes.category} size="xs">
				nature
				</Text>
				<Title order={3} className={classes.title}>
				Best forests to visit in North America
				</Title>
			</div>
			<Button variant="white" color="dark">
				Read article
			</Button>
		</Paper>
	);
}