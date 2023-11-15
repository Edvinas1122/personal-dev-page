"use client";
import { motion } from "framer-motion";
import {
	withAnimationControllContext,
	AnimationProvider,
	useFramerControl
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
	ScrollDrivenEnstructionProvider
} from "./reactScroll";

// export const EnstuctionAwareMotion = {
// 	Div: withScrollObservantFriendContextAnimation(motion.div),
// 	Header: withScrollObservantFriendContextAnimation(motion.header),
// 	UList: withScrollObservantFriendContextAnimation(motion.ul),
// 	HGroup: withScrollObservantFriendContextAnimation(motion.hgroup),
// 	Title: withScrollObservantFriendContextAnimation(motion.h1),
// 	Paragraph: withScrollObservantFriendContextAnimation(motion.p)
// }

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
