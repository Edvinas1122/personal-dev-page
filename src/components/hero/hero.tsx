"use client";
import {
	Container,
	Title,
	Text,
	Button,
	useMantineTheme,
} from '@mantine/core';
import classes from './hero.module.css';
import {
	EnRichedText,
	EnRichedTextDisplay
} from "@/components/text/text"

type HeroProps = {
	title: EnRichedText;
	description: EnRichedText;
	button: string;
	background_image: string;
}

export function Hero(
	props: HeroProps
) {
	const theme = useMantineTheme();

	const rootStyle = {
		backgroundColor: '#11284b',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundImage: `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${props.background_image})`,
		paddingTop: 'calc(var(--mantine-spacing-xl) * 3)',
		paddingBottom: 'calc(var(--mantine-spacing-xl) * 3)'
	};

	return (
		<div style={rootStyle}>
			<Container size="lg">
				<div className={classes.inner}>
				<div className={classes.content}>
					<Title className={classes.title}>
						<EnRichedTextDisplay
							rich_text={props.title}
							theme={theme}
						/>
					</Title>

					<Text className={classes.description} mt={30}>
						<EnRichedTextDisplay
							rich_text={props.description}
							theme={theme}
						/>
					</Text>

					<Button
						variant="gradient"
						gradient={theme.defaultGradient}
						size="xl"
						className={classes.control}
						mt={40}
					>
						{props.button}
					</Button>
				</div>
				</div>
			</Container>
		</div>
	);
}