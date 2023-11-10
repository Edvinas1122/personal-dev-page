"use client";
import {
	Container,
	Title,
	Text,
	Button,
	useMantineTheme,
	Group,
	Image,
	Avatar
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
	avatar?: string;
}
import { useWindowScroll } from '@mantine/hooks';
import {
	useMediaQuery,
	useIntersection
} from '@mantine/hooks';
import React from 'react';
import {MotionStyle, motion} from "framer-motion";

const animations = {
	visible: {
		opacity: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		}
	},
	hidden: {
		opacity: 0
	}
}

const animation_colapse = {
	visible: {
		height: "100vh",
		minHeight: "600px",
		opacity: 1
	},
	hidden: {
		height: "0vh",
		minHeight: "500px",
		opacity: 0
	}
}

const item = {
	hidden: { 
		y: 20,
		opacity: 0,
		filter: "blur(1px)"
	},
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)"
	}
};
import { usePathname, useRouter } from 'next/navigation';

export function Hero(
	props: HeroProps
) {
	const theme = useMantineTheme();
	const isMobile = useMediaQuery('(max-width: 1000px)');
	const [scroll, scrollTo] = useWindowScroll();
	const [hero_visible, setHeroVisible] = React.useState(true);
	const { ref, entry } = useIntersection({
		threshold: 1,
	});

	function focusOnHero() {
		scrollTo({x:0, y:0});
	}

	React.useEffect(() => {
		if (isMobile) return;
		if (!entry?.isIntersecting && scroll.y > 10 && hero_visible === true) {
			console.log("away from hero");
			setHeroVisible(false);
		} else if (entry?.isIntersecting && hero_visible === false) {
			console.log("back to hero")
			focusOnHero();
			setHeroVisible(true);
		}
	}, [entry?.isIntersecting, scroll.y, hero_visible]);


	const center_scale = props.avatar ? 0.8 : 1;
	const title_offset = !isMobile ? (16 * 100) / 200 : props.avatar ? 2 : 3;
	const background_gradient = "linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%)"
	const dimGradient = "linear-gradient(250deg, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0.82) 70%)";
	const gradient = props.disable_gradient ? `${dimGradient}` : `${background_gradient}`;
	const rootStyle = {
		maxHeight: `${isMobile ? "700px" : ""}`,
	};
	const imageStyle = {
		position: "absolute",
		top: 0,
		maxHeight: `${isMobile ? "700px" : ""}`,
		height: `100vh`,
		opacity: `${(100 - scroll.y / 12)/ 100}`,
	};

	const gradientItem = {
		position: "absolute",
		top: 0,
		maxHeight: `${isMobile ? "700px" : ""}`,
		backgroundImage: `${gradient}`,
		width: "100%"
	};

	function content_top_margin(height: number) {
		// return "calc(var(--mantine-spacing-xl) * 2)";
		if (height <= 50) {
			return "calc(var(--mantine-spacing-xl) * 1)";
		} else {
			const margin = 2 / (50 / (height - 50)) * (50 / (height - 50));
			return `calc(var(--mantine-spacing-xl) * ${margin})`;
		}
	}
	return (
		<>
		<motion.div 
			className={classes.root}
			initial={hero_visible ? animation_colapse.visible : animation_colapse.hidden}
			animate={hero_visible ? animation_colapse.visible : animation_colapse.hidden}
			style={{	
			...rootStyle
		}}>
			<motion.div
				initial={hero_visible ? animations.visible : animations.hidden}
				animate={hero_visible ? animations.visible : animations.hidden}
			>
			<Image 
				src={props.background_image}
				style={{
					...imageStyle,
					position: `${isMobile ? "absolute" : "fixed"}`,
				}}
				alt="background"
			/>
			</motion.div>
			<motion.div 
				initial={hero_visible ? animation_colapse.visible : animation_colapse.hidden}
				animate={hero_visible ? animation_colapse.visible : animation_colapse.hidden}
				style={gradientItem as MotionStyle}
			/>
			<Container size="lg"
				style={{
					zIndex: 20,
					position: "relative",
				}}
			>
				<div className={classes.inner}>
				<motion.div className={classes.content}
					initial={"hidden"}
					animate={hero_visible ? "visible" : "hidden"}
					variants={animations}
					ref={ref}
				>
					{props.avatar && (
						<motion.div variants={item}>
						<Avatar
							src={props.avatar}
							size={"xl"}
							style={{
								marginBottom: "20px",
								border: "2px solid #fff",
								zIndex: 30,
								position: "relative",

							}}
							w={isMobile ? "120px" : "200px"}
							h={isMobile ? "120px" : "200px"}
						/>
						</motion.div>
					)}
					<motion.div variants={item}>
					<Title 
						className={classes.title}
					>
						<EnRichedTextDisplay
							rich_text={props.title}
							theme={theme}
						/>
					</Title>
					</motion.div>
					<motion.div variants={item}>
					<Text 
						className={classes.description}
						mt={30}
					>
						<EnRichedTextDisplay
							rich_text={props.description}
							theme={theme}
						/>
					</Text>
					</motion.div>
					<Group 
						className={classes.controls}
					>
						<motion.div variants={item}>
						<Button
							variant="gradient"
							gradient={theme.defaultGradient}
							size="xl"
							className={classes.control}
							mt={40}
							>
							{props.button}
						</Button>
						</motion.div>
					{props.github_link && (
						<motion.div variants={item}>
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
						</Button>
						</motion.div>
						)
					}
					</Group>
				</motion.div>
				</div>
			</Container>
		</motion.div>
		</>
	);
}