import {
	SingleEnstruction
} from "@/utils/framer"
import {
	Motion,
	MauntMotion,
	PresenceContext,
	ScrollDrivenEnstructionProvider
} from "@/utils/module"
import classes from './header.module.css';
import
	EnRichedTextTyper
from "@/components/text/typer";
import {
	EnRichedText,
	EnRichedTextDisplay
} from "@/components/text/text";
import {
	Title,
	Image,
	Avatar,
	Group,
	Button
} from "@mantine/core";

const down_pop_hidden = {
	y: 40,
	opacity: 0,
}

const down_pop_visible = {
	y: 0,
	opacity: 1,
}

function animation_set(
	animation: {},
	duration: number,
	delay: number,
	type: string = "linear"
) {
	return {
		...animation,
		transition: {
			duration: duration,
			staggerChildren: 0.5,
			delay: delay,
			type: type,
			bounce: 0.55,
		}
	}
}

const animations = {
	// founder: {
	// 	expanded: animation_set({
	// 		marginLeft: 'var(--left-spacing)',
	// 	}, 0.3, 0, "tween"),
	// 	contracted: animation_set({
	// 		marginLeft: "0",
	// 	}, 0.12, 0.1, "linear"),
	// },
	avatar: {
		contracted: animation_set({
			marginTop: "0",
			width: "var(--contracted-size)",
			height: "var(--contracted-size)",
		}, 0.25, 0.15, "linear"),
		expanded: animation_set({
			ease: "easeInOut",
			marginTop: "var(--top-spacing)",
			width: "var(--expanded-size)",
			height: "var(--expanded-size)",
		}, 0.3, 0.1, "linear"),
	},
	title: {
		contracted: animation_set(down_pop_hidden, 0.2, 0),
		expanded: animation_set(down_pop_visible,
			0.3, 0.4, "spring"),
	},
	description: {
		contracted: animation_set(down_pop_hidden, 0.15, 0),
		expanded: animation_set(down_pop_visible,
			0.3, 0.5, "spring"),
	},
	button: {
		contracted: animation_set(down_pop_hidden, 0.1, 0),
		expanded: animation_set(down_pop_visible, 0.3, 0.6, "spring"),
	},
	header: {
		contracted: animation_set({
			marginBottom: "6rem",
			height: "4rem",
			backgroundColor: "rgba(8, 45, 85, 0)",
		}, 0.3, 0.2),
		expanded: animation_set({
			height: "100vh",
			backgroundColor: "rgba(6, 35, 67, 1)",
			type: "tween",
		}, 0.3, 0.1),
	},
	hero: {
		contracted: {
			opacity: 0,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				duration: 0.2,
				delay: 0.15,
			}
		},
		expanded: {
			opacity: 1,
			scale: 1.1,
			filter: "blur(1.6px)",
			transition: {
				duration: 4,
				delay: 0.5,
				type: "spring",
			}
		},
	}
}

const scroll_react_enstructions: SingleEnstruction[] = [{
	value: 0,
	threshold: 20,
	animation: "expanded",
	mount: true,
}, {
	value: 50,
	threshold: 800000,
	animation: "contracted",
	mount: false,
}]

function GlobalHeaderLayout({
	children
}: {
	children: React.ReactNode // local_navigation
}) {

	const typer = new EnRichedTextTyper();
	const title = typer
			.addTextSegment('Hi 👋, I am ')
			.addNewLine()
			.addTextSegment("Edvinas Momkus")
			.addNewLine()
			.addTextSegment('a ')
			.addGradientSegment('Full stack developer')
			.build();
	const description = typer
			.addTextSegment("Greetings, my name is Edvinas, I am from Lithuania 🇱🇹, 28 years old. I am computing learner, software development practitioner, craft enthusiast.")
			.build();
	const avatar = "https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F5f29da70-9f6a-4980-bf67-f9c0c54704db%252Fprofile.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75";
	const background_image = "https://spangled-hall-d99.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffd7e6ad3-3f36-45d5-94fb-5bdb95af5da7%2F37fbe56e-638f-453e-8487-9d6e4c7a5ff0%2FIMG_3042.webp?table=block&id=e764bdcf-2ef7-438f-a63f-6c3efa60b176&spaceId=fd7e6ad3-3f36-45d5-94fb-5bdb95af5da7&width=2000&userId=&cache=v2";

	return (
		<ScrollDrivenEnstructionProvider
			react={scroll_react_enstructions}
			initial={{
				animation: "contracted",
				mount: true,
			}}
		>
			<Motion.Header
				className={classes.header}
				variants={animations.header}
				initial={"expanded"}
				style={{
					position: "fixed",
				}}
			>
				<FounderInfo
					title={title}
					description={description}
					avatar={avatar}
				/>
				<GlobalNavigation />
				<Hero
					background_image={background_image}
				/>
				{children}
			</Motion.Header>
		</ScrollDrivenEnstructionProvider>
	);
}

function FounderInfo({
	title,
	description,
	avatar,
}: {
	title: EnRichedText,
	description: EnRichedText,
	avatar: string,
}) {

	return (
		<hgroup
			className={classes.content}
			// variants={animations.founder}
			style={{
				position: "relative",
				zIndex: 30,
			}}
		>
			<Avatar
				component={Motion.Div}
				className={classes.avatar}
				src={avatar}
				size={"sm"}
				style={{
					border: "2px solid #fff",
					zIndex: 30,
					position: "relative",
				}}
				variants={animations.avatar}
				/>
			<EnRichedTextDisplay
				Component={MauntMotion.Title}
				// mountable={true}
				// variants={animations.title}
				className={classes.title}
				initial={animations.title.contracted}
				rich_text={title}
				animate={animations.title.expanded}
				exit={animations.title.contracted}
				style={{
				}}
				// lineClamp={4}
			/>
			<EnRichedTextDisplay
				Component={MauntMotion.Paragraph}
				initial={animations.title.contracted}
				className={classes.description}
				rich_text={description}
				animate={animations.description.expanded}
				exit={animations.description.contracted}
				style={{
				}}
			/>
		</hgroup>
	);
}

import {
	GradientThemedButton
} from "@/components/text/contexted";

function GlobalNavigation() {
	return (
		<>
			<Group

				style={{
					position: "relative",
					zIndex: 30,
				// className={classes.controls}
				}}
				>
				<GradientThemedButton
					component={MauntMotion.Button}
					variant="gradient"
					// className={classes.control}
					animate={animations.button.expanded}
					initial={animations.button.contracted}
					exit={animations.button.contracted}
					size="xl"
					mt={40}
					>
						Contact
					</GradientThemedButton>
			</Group>
		</>
	);
}

import { TyperHeader } from "@/components/hero/typer";

function Hero({
	background_image,
}: {
	background_image: string,
}) {
	const background = `linear-gradient(250deg, rgba(130, 201, 30, 0) 0%, #062343 70%), url(${background_image})`;
	return (
		<>
			<Image
				component={MauntMotion.Div}
				style={{
					top: 0,
					height: "100vh",
					position: "absolute",
					zIndex: 0,
					background: background,
					backgroundSize: "cover",
					backgroundBlendMode: "normal",
					backgroundPosition: "center",
				}}
				variants={animations.hero}
				initial={"contracted"}
				animate={"expanded"}
				className={classes.hero}
			/>
		</>
	);
}



export default GlobalHeaderLayout;