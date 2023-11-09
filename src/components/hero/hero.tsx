"use client";
import {
	Container,
	Title,
	Text,
	Button,
	useMantineTheme,
	Group,
	Image
} from '@mantine/core';
import classes from './hero.module.css';
import {
	EnRichedText,
	EnRichedTextDisplay
} from "@/components/text/text"
import { GithubIcon } from '@mantine/ds';

type HeroProps = {
	title: EnRichedText;
	description: EnRichedText;
	button: string;
	background_image: string;
	disable_gradient?: boolean;
	github_link?: string;
}
import { useWindowScroll } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

export function Hero(
	props: HeroProps
) {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery('(max-width: 1000px)');
	const [scroll, scrollTo] = useWindowScroll();
	const [
		background_height,
		setHeight
	] = React
		.useState(100);

	React.useEffect(() => {
		if (isMobile) {
			setHeight(100);
		}
		if (!isMobile && scroll.y > 0 && scroll.y < 300) {
			const height = 100 - (scroll.y / 6);
			setHeight(height);
		}
	}, [scroll.y]);

	const title_offset = !isMobile ? (16 * background_height) / 200 : 3;
	const background_gradient = "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%)"
	const dimGradient = "linear-gradient(250deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.82) 70%)";
	const gradient = props.disable_gradient ? `${dimGradient}` : `${background_gradient}`;
	const rootStyle = {
		// backgroundColor: '#11284b',
		// backgroundSize: 'cover',
		// backgroundPosition: 'center',
		// backgroundImage: `${gradient}, url(${props.background_image})`,
		// backgroundImage: `${gradient}`,
		paddingTop: `calc(var(--mantine-spacing-xl) * ${title_offset})`,
		paddingBottom: 'calc(var(--mantine-spacing-xl) * 3)',
		maxHeight: `${isMobile ? "700px" : ""}`,
		height: `${background_height}vh`,
		// filter: "blur(8px)",
		// webkitFilter: "blur(8px)",
	};
	const imageStyle = {
		position: "absolute",
		top: 0,
		maxHeight: `${isMobile ? "700px" : ""}`,
		height: `${background_height}vh`,
		// backgroundImage: `${gradient}`,
		// zIndex: 5,
		// opacity: 0.1,
		// webkitFilter: "blur(4px)",
	};

	const gradientItem = {
		position: "absolute",
		top: 0,
		maxHeight: `${isMobile ? "700px" : ""}`,
		height: `${background_height}vh`,
		backgroundImage: `${gradient}`,
		// zIndex: 10,
		width: "100%",
		// opacity: 0.5,
	};

	function opacityDegression(height: number) {
		if (height <= 50) {
		  return "0%";
		} else {
		  const opacity = 2 * (height - 50);
		  return `${opacity}%`;
		}
	  }
	return (
		<>
		<div style={rootStyle}>
			{/* <div style={rootStyle} /> */}
			<Image 
				src={props.background_image}
				style={{
					...imageStyle,
					filter: `blur(${4 * (2 * (background_height - 50)) / 100}px)`,
				}}
				alt="background"
			/>
			<div style={gradientItem}/>
			<Container size="lg"
				style={{
					zIndex: 20,
					position: "relative",
				}}
			>
				<div className={classes.inner}>
				<div className={classes.content}
					style={{
						opacity: opacityDegression(background_height)
					}}
				>
					<Title 
						className={classes.title}
					>
						<EnRichedTextDisplay
							rich_text={props.title}
							theme={theme}
						/>
					</Title>
					<Text 
						className={classes.description}
						mt={30}
					>
						<EnRichedTextDisplay
							rich_text={props.description}
							theme={theme}
						/>
					</Text>
					<Group 
						className={classes.controls}
					>
					<Button
						variant="gradient"
						gradient={theme.defaultGradient}
						size="xl"
						className={classes.control}
						mt={40}
						>
						{props.button}
					</Button>
					{props.github_link && (
						<Button
							component="a"
							href={props.github_link}
							size="xl"
							variant="default"
							className={classes.control}
							mt={40}
							leftSection={<GithubIcon size={20} />}
						>
							GitHub
						</Button>)
					}
					</Group>
				</div>
				</div>
			</Container>
		</div>
		</>
	);
}