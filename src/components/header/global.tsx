import {
	ScrollDrivenEnstructionProvider
} from "@/utils/framer"
import {
	Motion
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
	y: 20,
	opacity: 0,
	filter: "blur(1px)",
}

const down_pop_visible = {
	y: 0,
	opacity: 1,
	filter: "blur(0px)",
}

function animation_set(animation: {}, duration: number, delay: number) {
	return {
		...animation,
		transition: {
			duration: duration,
			delay: delay,
		}
	}
}

const animations = {
	founder: {
		expanded: animation_set({
			x: 'var(--left-spacing)',
			y: 'var(--top-spacing)',
		}, 0.12, 0),
		contracted: animation_set({
			x: "0vw",
			y: "0vh",
		}, 0.12, 0.1),
	},
	avatar: {
		contracted: animation_set({
			width: "var(--contracted-size)",
			height: "var(--contracted-size)",
		}, 0.3, 0.1),
		expanded: animation_set({
			width: "var(--expanded-size)",
			height: "var(--expanded-size)",
		}, 0.3, 0.1),
	},
	title: {
		contracted: animation_set(down_pop_hidden, 0.1, 0),
		expanded: animation_set(down_pop_visible, 0.3, 0.3),
	},
	description: {
		contracted: animation_set(down_pop_hidden, 0.1, 0),
		expanded: animation_set(down_pop_visible, 0.3, 0.4),
	},
	button: {
		contracted: animation_set(down_pop_hidden, 0.1, 0),
		expanded: animation_set(down_pop_visible, 0.3, 0.5),
	},
	header: {
		contracted: {
			height: "4rem",
		},
		expanded: animation_set({
			height: "100vh",
		}, 0.3, 0.1),
	},
	hero: {
		contracted: animation_set({
			opacity: 0,
			height: "0vh",
		}, 0.25, 0.15),
		expanded: {
			opacity: 1,
			height: "100vh",
		},
	}
}

const scroll_react_enstructions = [{
	value: 0,
	threshold: 20,
	animation: "expanded"
}, {
	value: 50,
	threshold: 500,
	animation: "contracted"
}]

const gradientItem = {
	position: "absolute",
	top: 0,
	// maxHeight: `${isMobile ? "700px" : ""}`,
	// backgroundImage: `${gradient}`,
	width: "100%"
};

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
			initial="contracted"
		>
			<Motion.Header
				className={classes.header}
				variants={animations.header}
				initial={"contracted"}
				transition={{
					duration: 0.5
				}}
				style={{
					position: "fixed",
				}}
			>
				<FounderInfo
					title={title}
					description={description}
					avatar={avatar}
				/>
				<Hero
					background_image={background_image}
				/>
				{children}
			</Motion.Header>
		</ScrollDrivenEnstructionProvider>
	);
}

import {
	GradientThemedButton
} from "@/components/text/contexted";

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
		<Motion.HGroup
			className={classes.content}
			variants={animations.founder}
			style={{
				position: "relative",
				zIndex: 30,
				margin: "10px",
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
				Component={Motion.Title}
				variants={animations.title}
				className={classes.title}
				initial={"contracted"}
				rich_text={title}
				style={{
					marginTop: "1rem",
				}}
				lineClamp={4}
			/>
			<EnRichedTextDisplay
				Component={Motion.Paragraph}
				variants={animations.description}
				initial={"contracted"}
				className={classes.description}
				rich_text={description}
				style={{
					marginTop: "1rem",
				}}
			/>
			<Group
				// className={classes.controls}
				>
				<GradientThemedButton
					component={Motion.Button}
					variant="gradient"
					className={classes.control}
					variants={animations.button}
					size="xl"
					mt={40}
					style={{
						marginRight: "1rem",
					}}
					>
						Contact
					</GradientThemedButton>
			</Group>
		</Motion.HGroup>
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
				component={Motion.Div}
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
				className={classes.hero}
			/>
		</>
	);
}



export default GlobalHeaderLayout;