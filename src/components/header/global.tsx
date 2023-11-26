// "use client";
import {
	SingleEnstruction
} from "@/utils/framer"
import {
	// Motion,
	MauntMotion,
	ScrollMotion,
	Navigation,
	ScrollDrivenEnstructionProvider,
	Mount
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

const contentAppearDelay = 0.1;

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
	logo_title: {
		expanded: animation_set({
			width: "0px",
    		overflow: "hidden",
			textWrap: "nowrap",
			textOverflow: "ellipsis",
		}, 0.3, 0),
		contracted: animation_set({
			opacity: 1,
		}, 0.3, 1),
		test: animation_set({
			opacity: 1,
			width: "400px",
			overflow: "hidden",
			textWrap: "nowrap",
			textOverflow: "ellipsis",
		}, 0.2, 1),
	},
	title: {
		contracted: animation_set(down_pop_hidden, 0.2, 0),
		expanded: animation_set(down_pop_visible,
			0.3, 0.1, "spring"),
	},
	description: {
		contracted: animation_set(down_pop_hidden, 0.15, 0),
		expanded: animation_set(down_pop_visible,
			0.3, 0.2, "spring"),
	},
	button: {
		contracted: animation_set(down_pop_hidden, 0.1, 0),
		expanded: animation_set(down_pop_visible, 0.3, 0.3, "spring"),
	},
	hero: {
		contracted: {
			opacity: 0,
			scale: 1,
			filter: "blur(0px)",
			transition: {
				duration: 0,
				delay: 0,
			}
		},
		expanded: {
			opacity: 1,
			scale: 1.1,
			filter: "blur(1.6px)",
			transition: {
				duration: 4,
				delay: 0.4,
				type: "spring",
			}
		},
	}
}

const scroll_react_enstructions: SingleEnstruction[] = [{
	value: 0,
	threshold: 10,
	animation: "expanded",
}
, {
	value: 320,
	threshold: 10000,
	animation: "test",
}
, {
	value: 11,
	threshold: 800000,
	animation: "contracted",
}
]

import {
	searchMethod,
} from "@/services/server";

import {
	NavSection,
} from "./nav"

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
	const name = typer
			.addGradientSegment("Edvinas Momkus")
			.build();
	const avatar = "https://www.edvinasmomkus.com/_next/image?url=https%3A%2F%2Fwww.notion.so%2Fimage%2Fhttps%253A%252F%252Fs3-us-west-2.amazonaws.com%252Fsecure.notion-static.com%252F5f29da70-9f6a-4980-bf67-f9c0c54704db%252Fprofile.jpeg%3Ftable%3Dblock%26id%3Dacd18d29-7b8c-4eb1-823d-21f63088898c%26cache%3Dv2&w=3840&q=75";
	const background_image = "https://spangled-hall-d99.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ffd7e6ad3-3f36-45d5-94fb-5bdb95af5da7%2F37fbe56e-638f-453e-8487-9d6e4c7a5ff0%2FIMG_3042.webp?table=block&id=e764bdcf-2ef7-438f-a63f-6c3efa60b176&spaceId=fd7e6ad3-3f36-45d5-94fb-5bdb95af5da7&width=2000&userId=&cache=v2";

	return (
		<>
		<Suspense fallback={
			<div>Loading...</div>
		}>
		<ScrollDrivenEnstructionProvider
			react={scroll_react_enstructions}
			initial={{
				animation: "expanded",
			}}
		>
			<Navigation.Header
				className={classes.header}
				initial={"expanded"}
				pathEffect={{
					default: {
						position: "relative",
					},
					"/": {
						position: "fixed",
					},
				}}
			>
				<FounderInfo
					title={title}
					description={description}
					name={name}
					avatar={avatar}
					/>
				<GlobalNavigation />
				<Hero
					background_image={background_image}
				/>
				<MauntMotion.Nav
					mountInfo={{
						on: "test",
						off: "contracted",
					}}
					initial={animations.description.contracted}
					animate={animations.description.expanded}
					exit={animations.description.contracted}
				>
				<NavSection
					searchServerMethod={searchMethod}
					/>
				</MauntMotion.Nav>
			</Navigation.Header>
		</ScrollDrivenEnstructionProvider>
		</Suspense>
		<Navigation.Main
			className={classes.main}
			pathEffect={{
				default: {
					marginTop: "1rem",
				},
				"/": {},
			}}
		>

		{children}

		</Navigation.Main>
		</>
	);
}

import Link from "next/link";

function FounderInfo({
	title,
	description,
	avatar,
	name,
}: {
	title: EnRichedText,
	name: EnRichedText,
	description: EnRichedText,
	avatar: string,
}) {

	return (
		<ScrollMotion.HGroup
			className={classes.content}
			// variants={animations.founder}
			style={{
				position: "relative",
				zIndex: 30,
			}}
		>
			<Suspense
				fallback={
					<div>Loading...</div>
				}
			>
			<Avatar
				component={ScrollMotion.Div}
				className={classes.avatar}
				src={avatar}
				size={"sm"}
				/>
			<Link
				href={"/"}
				style={{
					textDecoration: "none",
				}}
			>
			<EnRichedTextDisplay
				Component={ScrollMotion.Title}
				className={classes.logo_title}
				rich_text={name}
				/>
			</Link>
			<EnRichedTextDisplay
				Component={MauntMotion.Title}
				mountInfo={{
					on: "expanded",
					off: "contracted",
				}}
				className={classes.title}
				initial={animations.title.contracted}
				rich_text={title}
				animate={animations.title.expanded}
				exit={animations.title.contracted}
				style={{
				}}
				/>
			<EnRichedTextDisplay
				Component={MauntMotion.Paragraph}
				mountInfo={{
					on: "expanded",
					off: "contracted",
				}}
				initial={animations.title.contracted}
				className={classes.description}
				rich_text={description}
				animate={animations.description.expanded}
				exit={animations.description.contracted}
				/>
			</Suspense>
		</ScrollMotion.HGroup>
	);
}

import {
	GradientThemedButton
} from "@/components/text/contexted";

function GlobalNavigation() {
	return (
		<>
			{/* <Group

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
			</Group> */}
		</>
	);
}

import { TyperHeader } from "@/components/hero/typer";
import { Suspense } from "react";

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
				//@ts-ignore
				mountInfo={{
					on: "expanded",
					off: "contracted",
				}}
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
				initial={animations.hero.contracted}
				className={classes.hero}
				// variants={animations.hero}
				//@ts-ignore
				animate={animations.hero.expanded}
				exit={animations.hero.contracted}
			/>
		</>
	);
}



export default GlobalHeaderLayout;