"use client";
import { AnimatePresence, motion } from "framer-motion";
import {
	withAnimationControllContext,
	AnimationProvider,
	useFramerControl,
} from "./useFramer";

/*
	https://github.com/framer/motion/issues/2054#issuecomment-1491568547
*/
export const MotionDiv = withAnimationControllContext(motion.div);
export const MotionHeader = withAnimationControllContext(motion.header);
export const MotionUList = withAnimationControllContext(motion.ul);
export const MotionOList = withAnimationControllContext(motion.ol);
export const MotionListItem = withAnimationControllContext(motion.li);
export const MotionHGroup = withAnimationControllContext(motion.hgroup);
export const MotionTitle = withAnimationControllContext(motion.h1);
export const MotionParagraph = withAnimationControllContext(motion.p);

export {
	AnimationProvider,
	useFramerControl
}


// does calculations in itself so better to context that does the calculations
// import
// 	withScrollControllContext 
// from "./useScroll";

// export const ScrollAwareMotionDiv = withScrollControllContext(motion.div);
// export const ScrollAwareMotionHeader = withScrollControllContext(motion.header);
// export const ScrollAwareMotionUList = withScrollControllContext(motion.ul);
// export const ScrollAwareMotionHGroup = withScrollControllContext(motion.hgroup);

import
	withScrollObservantFriendContextAnimation,
{
	ScrollDrivenEnstructionProvider,
	SingleEnstruction
} from "./reactScroll";

// export const EnstuctionAwareMotion = {
// 	Div: withScrollObservantFriendContextAnimation(motion.div),
// 	Header: withScrollObservantFriendContextAnimation(motion.header),
// 	UList: withScrollObservantFriendContextAnimation(motion.ul),
// 	HGroup: withScrollObservantFriendContextAnimation(motion.hgroup),
// 	Title: withScrollObservantFriendContextAnimation(motion.h1),
// 	Paragraph: withScrollObservantFriendContextAnimation(motion.p)
// }

// function animation_set(
// 	animation: {},
// 	duration: number,
// 	delay: number,
// 	type: string = "linear"
// ) {
// 	return {
// 		...animation,
// 		transition: {
// 			duration: duration,
// 			staggerChildren: 0.5,
// 			delay: delay,
// 			type: type,
// 			bounce: 0.55,
// 		}
// 	}
// }

// const down_pop_hidden = {
// 	y: 40,
// 	opacity: 0,
// }

// const down_pop_visible = {
// 	y: 0,
// 	opacity: 1,
// }
// const animations = {
// 	// founder: {
// 	// 	expanded: animation_set({
// 	// 		marginLeft: 'var(--left-spacing)',
// 	// 	}, 0.3, 0, "tween"),
// 	// 	contracted: animation_set({
// 	// 		marginLeft: "0",
// 	// 	}, 0.12, 0.1, "linear"),
// 	// },
// 	avatar: {
// 		contracted: animation_set({
// 			marginTop: "0",
// 			width: "var(--contracted-size)",
// 			height: "var(--contracted-size)",
// 		}, 0.25, 0.15, "linear"),
// 		expanded: animation_set({
// 			ease: "easeInOut",
// 			marginTop: "var(--top-spacing)",
// 			width: "var(--expanded-size)",
// 			height: "var(--expanded-size)",
// 		}, 0.3, 0.1, "linear"),
// 	},
// 	title: {
// 		contracted: animation_set(down_pop_hidden, 0.2, 0),
// 		expanded: animation_set(down_pop_visible,
// 			0.3, 0.1, "spring"),
// 	},
// 	description: {
// 		contracted: animation_set(down_pop_hidden, 0.15, 0),
// 		expanded: animation_set(down_pop_visible,
// 			0.3, 0.2, "spring"),
// 	},
// 	button: {
// 		contracted: animation_set(down_pop_hidden, 0.1, 0),
// 		expanded: animation_set(down_pop_visible, 0.3, 0.3, "spring"),
// 	},
// 	hero: {
// 		contracted: {
// 			opacity: 0,
// 			scale: 1,
// 			filter: "blur(0px)",
// 			transition: {
// 				duration: 0.2,
// 				delay: 0.15,
// 			}
// 		},
// 		expanded: {
// 			opacity: 1,
// 			scale: 1.1,
// 			filter: "blur(1.6px)",
// 			transition: {
// 				duration: 4,
// 				delay: 0.4,
// 				type: "spring",
// 			}
// 		},
// 	}
// }

// export const EnstuctionAwareMotionDiv = withScrollObservantFriendContextAnimation(
// 	motion.div,
// 	animations.avatar
// );
// export const EnstuctionAwareMotionHeader = withScrollObservantFriendContextAnimation(
// 	motion.header,
// 	animations.title
// );
// export const EnstuctionAwareMotionUList = withScrollObservantFriendContextAnimation(
// 	motion.ul,
// 	animations.description
// );
// export const EnstuctionAwareMotionHGroup = withScrollObservantFriendContextAnimation(
// 	motion.hgroup,
// 	animations.button
// );
// export const EnstuctionAwareMotionTitle = withScrollObservantFriendContextAnimation(
// 	motion.h1,
// 	animations.title
// );
// export const EnstuctionAwareMotionParagraph = withScrollObservantFriendContextAnimation(
// 	motion.p,
// 	animations.description
// );
// export const EnstuctionAwareMotionButton = withScrollObservantFriendContextAnimation(
// 	motion.button,
// 	animations.button
// );


export const EnstuctionAwareMotionDiv = withScrollObservantFriendContextAnimation(motion.div);
export const EnstuctionAwareMotionHeader = withScrollObservantFriendContextAnimation(motion.header);
export const EnstuctionAwareMotionUList = withScrollObservantFriendContextAnimation(motion.ul);
export const EnstuctionAwareMotionHGroup = withScrollObservantFriendContextAnimation(motion.hgroup);
export const EnstuctionAwareMotionTitle = withScrollObservantFriendContextAnimation(motion.h1);
export const EnstuctionAwareMotionParagraph = withScrollObservantFriendContextAnimation(motion.p);
export const EnstuctionAwareMotionButton = withScrollObservantFriendContextAnimation(motion.button);

export {
	ScrollDrivenEnstructionProvider
}
export type {
	SingleEnstruction
}

import {
	withScrollObservantFriendContextMount
} from "./reactScroll";


export const EnstructionAwareMauntMotionDiv = withScrollObservantFriendContextMount(motion.div);
export const EnstructionAwareMauntMotionHeader = withScrollObservantFriendContextMount(motion.header);
export const EnstructionAwareMauntMotionUList = withScrollObservantFriendContextMount(motion.ul);
export const EnstructionAwareMauntMotionHGroup = withScrollObservantFriendContextMount(motion.hgroup);
export const EnstructionAwareMauntMotionTitle = withScrollObservantFriendContextMount(motion.h1);
export const EnstructionAwareMauntMotionParagraph = withScrollObservantFriendContextMount(motion.p);
export const EnstructionAwareMauntMotionButton = withScrollObservantFriendContextMount(motion.button);

export const PresenceContext = AnimatePresence;

import {
	withScrollPosition
} from "./reactScroll";

function interpolateColor(from: string, to: string, between: number) {
	const fromColor = from.match(/\d+/g);
	const toColor = to.match(/\d+/g);
	if (!fromColor || !toColor) throw new Error("invalid color");
		const fromColorNumbers = fromColor.map((color) => parseInt(color));
		const toColorNumbers = toColor.map((color) => parseInt(color));
		const colorNumbers = fromColorNumbers.map((fromColorNumber, index) => {
			const toColorNumber = toColorNumbers[index];
			const difference = toColorNumber - fromColorNumber;
			const colorNumber = fromColorNumber + (difference * between);
			return colorNumber;
	});
	const colorString = `rgba(${colorNumbers.join(", ")})`;
	return colorString;
}

function compensateScroll(scrollY:  number) {
	const scrollValue = (100 - scrollY * scrollY / 1000);
	const compensate = Math.min(Math.max(0, scrollValue), 100);
	const compensateHeight = compensateVarProperty(scrollY, "--min-height", "--max-height", 1);
	return {
		height: compensateHeight,
		backgroundColor: interpolateColor(
			"rgba(20, 130, 200, 0)",
			"rgba(6, 35, 67, 1)",
			compensate / 100,
		),
	}
}

function compensateProperty(value: number, min: number, max: number, unit: string) {
	const scrollValue = (max - value * value / 1000);
	const compensate = Math.min(Math.max(min, scrollValue), max);
	const compensateString = `${compensate}${unit}`;
	return compensateString;
}

function compensateVarProperty(value: number, minVar: string, maxVar: string, factor: number) {
    // Creating the calc expression
	const min = 0;
	const max = 1;
	const scrollValue = (max - value * value / 100000);
	const clampedFactor = Math.min(Math.max(min, scrollValue), max);
	const calcExpression = `calc(var(${minVar}) * (1 - ${clampedFactor}) + var(${maxVar}) * ${clampedFactor})`;
    return calcExpression;
}

function avatarScroll(scrollY: number) {
	// const compensateString = compensateProperty(scrollY, min, 100, "vh");
	const compensateMarginTop = compensateVarProperty(
		scrollY,
		"--min-top-spacing",
		"--top-spacing",
		1);
	const compensateImageSize = compensateVarProperty(scrollY, "--contracted-size", "--expanded-size", 0.01);
	return {
		marginTop: compensateMarginTop,
		width: compensateImageSize,
		height: compensateImageSize,
	}
}

const initial = {
	height: "100vh",
	backgroundColor: "rgba(6, 35, 67, 1)",
}

const initialAvatar = {
	marginTop: "var(--top-spacing)",
	width: "var(--expanded-size)",
	height: "var(--expanded-size)",
}

export const ScrollPositionAwareMotionDiv = withScrollPosition(
	motion.div,
	avatarScroll,
	initialAvatar
	);
export const ScrollPositionAwareMotionHeader = withScrollPosition(
	motion.header,
	compensateScroll,
	initial
);
export const ScrollPositionAwareMotionUList = withScrollPosition(
	motion.ul,
	compensateScroll,
	initial
);
export const ScrollPositionAwareMotionHGroup = withScrollPosition(
	motion.hgroup,
	avatarScroll,
	initial
);


// export default {
// 	ScrollPositionAwareMotionDiv,
// 	ScrollPositionAwareMotionHeader,
// 	ScrollPositionAwareMotionUList,
// 	ScrollPositionAwareMotionHGroup,
// 	EnstuctionAwareMotionDiv,
// 	EnstuctionAwareMotionHeader,
// 	EnstuctionAwareMotionUList,
// 	EnstuctionAwareMotionHGroup,
// 	EnstuctionAwareMotionTitle,
// 	EnstuctionAwareMotionParagraph,
// 	EnstuctionAwareMotionButton,
// 	EnstructionAwareMauntMotionDiv,
// 	EnstructionAwareMauntMotionHeader,
// 	EnstructionAwareMauntMotionUList,
// 	EnstructionAwareMauntMotionHGroup,
// 	EnstructionAwareMauntMotionTitle,
// 	EnstructionAwareMauntMotionParagraph,
// 	EnstructionAwareMauntMotionButton,
// 	ScrollDrivenEnstructionProvider,
// 	withScrollObservantFriendContextAnimation,
// 	withScrollObservantFriendContextMount,
// 	withScrollPosition,
// 	interpolateColor,
// 	compensateProperty,
// 	compensateVarProperty,
// 	avatarScroll,
// 	compensateScroll,
// }