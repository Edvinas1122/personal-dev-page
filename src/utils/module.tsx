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
"ScrollPositionAwareMotionHeader";


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

// export const Motion = {
// 	// Header: getLazyItem("EnstuctionAwareMotionHeader"),
// 	// Div: getLazyItem("EnstuctionAwareMotionDiv"),
// 	// Title: getLazyItem("EnstuctionAwareMotionTitle"),
// 	// Paragraph: getLazyItem("EnstuctionAwareMotionParagraph"),
// 	// HGroup: getLazyItem("EnstuctionAwareMotionHGroup"),
// 	// UList: getLazyItem("EnstuctionAwareMotionUList"),
// 	// Button: getLazyItem("EnstuctionAwareMotionButton")
// 	// Header: EnstuctionAwareMotionHeader,
// 	Div: EnstuctionAwareMotionDiv,
// 	Title: EnstuctionAwareMotionTitle,
// 	Paragraph: EnstuctionAwareMotionParagraph,
// 	HGroup: EnstuctionAwareMotionHGroup,
// 	UList: EnstuctionAwareMotionUList,
// 	Button: EnstuctionAwareMotionButton
// }

export const MauntMotion = {
	Div: getLazyItem("EnstructionAwareMauntMotionDiv"),
	Header: getLazyItem("EnstructionAwareMauntMotionHeader"),
	Title: getLazyItem("EnstructionAwareMauntMotionTitle"),
	Paragraph: getLazyItem("EnstructionAwareMauntMotionParagraph"),
	HGroup: getLazyItem("EnstructionAwareMauntMotionHGroup"),
	UList: getLazyItem("EnstructionAwareMauntMotionUList"),
	Button: getLazyItem("EnstructionAwareMauntMotionButton")
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
import { get } from 'http';

export const ScrollMotion = {
	Div: getLazyItem("ScrollPositionAwareMotionDiv"),
	Header: getLazyItem("ScrollPositionAwareMotionHeader")
	// Div: ScrollPositionAwareMotionDiv,
	// Header: ScrollPositionAwareMotionHeader
}
