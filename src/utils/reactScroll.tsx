"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useWindowScroll } from '@mantine/hooks';

type SingleEnstruction = {
	value: number;
	threshold: number;
	animation: string;
};

type ScrollAwareContextType = {
	activeEnstruction: string | null;
};

const ScrollAwareEnstructionContext = createContext<
	ScrollAwareContextType
>({
	activeEnstruction: "expanded"
});

const ScrollDrivenEnstructionProvider = ({
	children,
	react,
	initial,
}: {
	children: React.ReactNode,
	react: SingleEnstruction[],
	initial: string
}) => {
	const [scroll] = useWindowScroll();
	const [
		activeEnstruction,
		setActiveEnstruction
	] = useState<string>(initial);

	function is_in_reactive_range(
		scroll: number,
		enstruction: SingleEnstruction
	) {
		return (
			scroll >= enstruction.value &&
			scroll < enstruction.value + enstruction.threshold
		);
	}

	useEffect(() => {
		const foundEnstruction = react
			.find(enstruction => 
				is_in_reactive_range(scroll.y, enstruction)
			);
			if (
				foundEnstruction
				&& activeEnstruction !== foundEnstruction.animation
			) {
				setActiveEnstruction(foundEnstruction.animation);
			}
	}, [scroll.y, react, activeEnstruction]);

	return (
		<ScrollAwareEnstructionContext.Provider
			value={{ activeEnstruction }}
		>
			{children}
		</ScrollAwareEnstructionContext.Provider>
	);
};

const useScrollDrivenEnstructions = () => {
	const context = React.useContext(ScrollAwareEnstructionContext);
	if (context === undefined) {
		throw new Error(
			'useScrollDrivenEnstructions must be used within a ScrollDrivenEnstructionProvider'
		);
	}
	return context;
}

export {
	ScrollDrivenEnstructionProvider
};

import {
	useAnimation,
	Variants,
	HTMLMotionProps
} from "framer-motion";

const withScrollObservantFriendContextAnimation = (
		MotionComponent: React.ComponentType<HTMLMotionProps<any>>
) => {
	const ScrollMotionComponent = ({
		variants,
		...props
	}: {
		variants: Variants;
		} & HTMLMotionProps<any>
	) => {
		const controls = useAnimation();
		const { activeEnstruction } = useScrollDrivenEnstructions();

		React.useEffect(() => {
			if (activeEnstruction) {
				const animation = variants[activeEnstruction];
				if (!animation) throw new Error("component does not have a required animation");
				controls.start(animation);
			}
		}, [
			activeEnstruction,
			variants,
			controls
		]);

		return <MotionComponent animate={controls} {...props} />;
	};
	return ScrollMotionComponent;
};

export default withScrollObservantFriendContextAnimation;