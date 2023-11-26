// import {
// 	// EnstuctionAwareMotionHeader,
// 	EnstuctionAwareMotionDiv,
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
// 	SingleEnstruction,
// 	PresenceContext,
// 	ScrollDrivenEnstructionProvider
// } from './framer'
// import React,{
// 	lazy,
// } from 'react';

// type FramerExports = "EnstuctionAwareMotionHeader" | 
// "EnstuctionAwareMotionDiv" | 
// "EnstuctionAwareMotionUList" | 
// "EnstuctionAwareMotionHGroup" | 
// "EnstuctionAwareMotionTitle" | 
// "EnstuctionAwareMotionParagraph" | 
// "EnstuctionAwareMotionButton" | 
// "EnstructionAwareMauntMotionDiv" | 
// "EnstructionAwareMauntMotionHeader" | 
// "EnstructionAwareMauntMotionUList" | 
// "EnstructionAwareMauntMotionHGroup" | 
// "EnstructionAwareMauntMotionTitle" | 
// "EnstructionAwareMauntMotionParagraph" | 
// "EnstructionAwareMauntMotionButton" | 
// "ScrollDrivenEnstructionProvider";

// function getLazyItem(item: FramerExports) {
// 	return lazy(
// 		() => import('./framer')
// 		.then(
// 			module => ({ default: module[item] })
// 		)
// 	);
// }

// const EnstuctionAwareMotionHeader = React.lazy(
// 	() => import('./framer')
// 	.then(module => ({ default: module.EnstuctionAwareMotionHeader }))
// );
// // const {
// // 	EnstuctionAwareMotionHeader,
// // 	EnstuctionAwareMotionDiv,
// // 	EnstuctionAwareMotionUList,
// // 	EnstuctionAwareMotionHGroup,
// // 	EnstuctionAwareMotionTitle,
// // 	EnstuctionAwareMotionParagraph,
// // 	EnstuctionAwareMotionButton,
// // 	EnstructionAwareMauntMotionDiv,
// // 	EnstructionAwareMauntMotionHeader,
// // 	EnstructionAwareMauntMotionUList,
// // 	EnstructionAwareMauntMotionHGroup,
// // 	EnstructionAwareMauntMotionTitle,
// // 	EnstructionAwareMauntMotionParagraph,
// // 	EnstructionAwareMauntMotionButton,
// // 	SingleEnstruction,
// // 	PresenceContext,
// // 	ScrollDrivenEnstructionProvider	
// // } = lazy(() => import('./framer'));

// export const Motion = {
// 	Header: EnstuctionAwareMotionHeader,
// 	Div: EnstuctionAwareMotionDiv,
// 	Title: EnstuctionAwareMotionTitle,
// 	Paragraph: EnstuctionAwareMotionParagraph,
// 	HGroup: EnstuctionAwareMotionHGroup,
// 	UList: EnstuctionAwareMotionUList,
// 	Button: EnstuctionAwareMotionButton
// }

// export const MauntMotion = {
// 	Div: EnstructionAwareMauntMotionDiv,
// 	Header: EnstructionAwareMauntMotionHeader,
// 	Title: EnstructionAwareMauntMotionTitle,
// 	Paragraph: EnstructionAwareMauntMotionParagraph,
// 	HGroup: EnstructionAwareMauntMotionHGroup,
// 	UList: EnstructionAwareMauntMotionUList,
// 	Button: EnstructionAwareMauntMotionButton
// }

// export {
// 	ScrollDrivenEnstructionProvider,
// 	PresenceContext
// };

// export type {
// 	SingleEnstruction
// }

// import {
// 	ScrollPositionAwareMotionDiv,
// 	ScrollPositionAwareMotionHeader,
// } from "./framer";

// export const ScrollMotion = {
// 	Div: ScrollPositionAwareMotionDiv,
// 	Header: ScrollPositionAwareMotionHeader
// }

import {
	// EnstuctionAwareMotionDiv,
	// EnstuctionAwareMotionUList,
	// EnstuctionAwareMotionHGroup,
	// EnstuctionAwareMotionTitle,
	// EnstuctionAwareMotionParagraph,
	// EnstuctionAwareMotionButton,
	// EnstructionAwareMauntMotionDiv,
	// EnstructionAwareMauntMotionHeader,
	// EnstructionAwareMauntMotionUList,
	// EnstructionAwareMauntMotionHGroup,
	// EnstructionAwareMauntMotionTitle,
	// EnstructionAwareMauntMotionParagraph,
	// EnstructionAwareMauntMotionButton,
	SingleEnstruction,
	PresenceContext,
	// ScrollDrivenEnstructionProvider
} from './framer'
import React,{
	lazy,
} from 'react';

type FramerExports = "EnstuctionAwareMotionHeader" | 
"EnstuctionAwareMotionDiv" | 
"EnstuctionAwareMotionUList" | 
"EnstuctionAwareMotionHGroup" | 
"EnstuctionAwareMotionTitle" | 
"EnstuctionAwareMotionParagraph" | 
"EnstuctionAwareMotionButton" | 
"EnstructionAwareMauntMotionDiv" | 
"EnstructionAwareMauntMotionHeader" | 
"EnstructionAwareMauntMotionUList" | 
"EnstructionAwareMauntMotionHGroup" | 
"EnstructionAwareMauntMotionTitle" | 
"EnstructionAwareMauntMotionParagraph" | 
"EnstructionAwareMauntMotionButton" | 
"ScrollDrivenEnstructionProvider" |
"ScrollDrivenEnstructionProvider" |
"ScrollPositionAwareMotionDiv" |
"ScrollPositionAwareMotionHeader" |
"ScrollPositionAwareMotionTitle" |
"MotionDiv" |
"MotionHeader" |
"MotionUList" |
"MotionHGroup" |
"MotionTitle" |
"MotionListItem" |
"NavigationAndScrollHeader" |
"NavigationAndScrollMain" |
"MountMotionDiv" |
"EnstructionAwareMauntMotionNav" |
"ScrollPositionAwareMotionHGroup";


function getLazyItem(item: FramerExports) {
	return lazy(
		() => import('./framer')
		.then(
			module => ({
				default: module[item]
			})
		)
	);
}

const EnstuctionAwareMotionHeader = getLazyItem("EnstuctionAwareMotionHeader");

export const Motion = {
	// Header: getLazyItem("EnstuctionAwareMotionHeader"),
	// Div: getLazyItem("EnstuctionAwareMotionDiv"),
	// Title: getLazyItem("EnstuctionAwareMotionTitle"),
	// Paragraph: getLazyItem("EnstuctionAwareMotionParagraph"),
	// HGroup: getLazyItem("EnstuctionAwareMotionHGroup"),
	// UList: getLazyItem("EnstuctionAwareMotionUList"),
	// Button: getLazyItem("EnstuctionAwareMotionButton")
	// Header: EnstuctionAwareMotionHeader,
	Div: getLazyItem("MotionDiv"),
	Header: getLazyItem("MotionHeader"),
	Title: getLazyItem("MotionTitle"),
	HGroup: getLazyItem("MotionHGroup"),
	UList: getLazyItem("MotionUList"),
	ListItem: getLazyItem("MotionListItem")
}

export const MauntMotion = {
	Div: getLazyItem("EnstructionAwareMauntMotionDiv"),
	Header: getLazyItem("EnstructionAwareMauntMotionHeader"),
	Title: getLazyItem("EnstructionAwareMauntMotionTitle"),
	Paragraph: getLazyItem("EnstructionAwareMauntMotionParagraph"),
	HGroup: getLazyItem("EnstructionAwareMauntMotionHGroup"),
	UList: getLazyItem("EnstructionAwareMauntMotionUList"),
	Button: getLazyItem("EnstructionAwareMauntMotionButton"),
	Nav: getLazyItem("EnstructionAwareMauntMotionNav"),
}

const ScrollDrivenEnstructionProvider = getLazyItem("ScrollDrivenEnstructionProvider");

export {
	ScrollDrivenEnstructionProvider,
	PresenceContext
};

export type {
	SingleEnstruction
}

import {
	ScrollPositionAwareMotionDiv,
	ScrollPositionAwareMotionHeader,
} from "./framer";


export const ScrollMotion = {
	Div: getLazyItem("ScrollPositionAwareMotionDiv"),
	Header: getLazyItem("ScrollPositionAwareMotionHeader"),
	Title: getLazyItem("ScrollPositionAwareMotionTitle"),
	HGroup: getLazyItem("ScrollPositionAwareMotionHGroup"),
	// Div: ScrollPositionAwareMotionDiv,
	// Header: ScrollPositionAwareMotionHeader
}

// import {
// 	NavigationAndScrollHeader
// } from './framer';

export const Navigation = {
	Header: getLazyItem("NavigationAndScrollHeader"),
	Main: getLazyItem("NavigationAndScrollMain")
}

export const Mount = {
	Div: getLazyItem("MountMotionDiv")
}