"use client";
import React from "react";

const AnimationContext = React.createContext<{
	animationState: string;
	setAnimationState: React.Dispatch<React.SetStateAction<string>>;
}>({
	animationState: 'expanded', // Default state
	setAnimationState: () => {}, // Placeholder function
});

const AnimationProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [
		animationState,
		setAnimationState
	] = React.useState('expanded');

	return (
		<AnimationContext.Provider 
			value={{
				animationState,
				setAnimationState 
			}}>
			{children}
		</AnimationContext.Provider>
	);
};

import { Variants, HTMLMotionProps, useAnimation } from "framer-motion";

const withAnimationControllContext = (
	MotionComponent: React.ComponentType<HTMLMotionProps<any>>
) => {
	const ControledMotionComponent = ({
		variants,
		...props
	}: {
		variants: Variants;
		} & HTMLMotionProps<any>
	) => {
		const { animationState } = React.useContext(AnimationContext);
		const controls = useAnimation();

		React.useEffect(() => {
			if (variants && animationState in variants) {
			controls.start(variants[animationState]);
			}
		}, [controls, animationState, variants]);

		return <MotionComponent animate={controls} {...props} />;
	};
	return ControledMotionComponent;
};

const useFramerControl = () => {
	const { setAnimationState } = React.useContext(AnimationContext);

	const triggerAnimation = (newState: string) => {
		setAnimationState(newState);
	};

	return { triggerAnimation };
};

export {
	withAnimationControllContext,
	AnimationProvider,
	useFramerControl
};