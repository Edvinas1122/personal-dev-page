import {
	EnstuctionAwareMotionHeader,
	EnstuctionAwareMotionDiv,
	EnstuctionAwareMotionUList,
	EnstuctionAwareMotionHGroup,
	EnstuctionAwareMotionTitle,
	EnstuctionAwareMotionParagraph,
	EnstuctionAwareMotionButton,
	EnstructionAwareMauntMotionDiv,
	EnstructionAwareMauntMotionHeader,
	EnstructionAwareMauntMotionUList,
	EnstructionAwareMauntMotionHGroup,
	EnstructionAwareMauntMotionTitle,
	EnstructionAwareMauntMotionParagraph,
	EnstructionAwareMauntMotionButton,
	SingleEnstruction,
	PresenceContext,
	ScrollDrivenEnstructionProvider
} from './framer'

export const Motion = {
	Header: EnstuctionAwareMotionHeader,
	Div: EnstuctionAwareMotionDiv,
	Title: EnstuctionAwareMotionTitle,
	Paragraph: EnstuctionAwareMotionParagraph,
	HGroup: EnstuctionAwareMotionHGroup,
	UList: EnstuctionAwareMotionUList,
	Button: EnstuctionAwareMotionButton
}

export const MauntMotion = {
	Div: EnstructionAwareMauntMotionDiv,
	Header: EnstructionAwareMauntMotionHeader,
	Title: EnstructionAwareMauntMotionTitle,
	Paragraph: EnstructionAwareMauntMotionParagraph,
	HGroup: EnstructionAwareMauntMotionHGroup,
	UList: EnstructionAwareMauntMotionUList,
	Button: EnstructionAwareMauntMotionButton
}

export {
	ScrollDrivenEnstructionProvider,
	PresenceContext
};

export type {
	SingleEnstruction
}