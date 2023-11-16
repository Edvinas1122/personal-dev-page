"use client";
import React, { createContext, useState, useEffect } from 'react';
import { useWindowScroll } from '@mantine/hooks';

type SingleEnstruction = {
	value: number;
	threshold: number;
	animation: string;
	mount?: boolean;
};

type Enstruct = Omit<SingleEnstruction, 'value' | 'threshold'>;

type ScrollAwareContextType = {
	activeEnstruction: Enstruct | null;
	// parrentActive: boolean;
};

const ScrollAwareEnstructionContext = createContext<
	ScrollAwareContextType
>({
	activeEnstruction: null,
	// parrentActive: false,
});

const useSelectActiveEnstruction = (
	react: SingleEnstruction[]
) => {
	const [scroll] = useWindowScroll();
	const [
		activeEnstruction,
		setActiveEnstruction
	] = useState<Enstruct | null>(null);

	function is_in_reactive_range(
		scroll: number,
		enstruction: SingleEnstruction
	) {
		return (
			scroll >= enstruction.value &&
			scroll < enstruction.value + enstruction.threshold
		);
	}

	React.useEffect(() => {
		const foundEnstruction = react
			.find(enstruction => 
				is_in_reactive_range(scroll.y, enstruction)
			);
		if (foundEnstruction) {
			if (!activeEnstruction ||
				activeEnstruction.animation !== foundEnstruction.animation) {
					setActiveEnstruction(foundEnstruction);
					console.log("foundEnstruction", foundEnstruction);
				}
		}
	}, [
		scroll.y,
		react,
		activeEnstruction,
		setActiveEnstruction
	]);

	return activeEnstruction;
}

const ScrollDrivenEnstructionProvider = ({
	children,
	react,
	initial,
}: {
	children: React.ReactNode,
	react: SingleEnstruction[],
	initial: Enstruct,
}) => {
	const activeEnstruction = useSelectActiveEnstruction(react);

	return (
		<ScrollAwareEnstructionContext.Provider
			value={{ activeEnstruction }}
		>
			{children}
		</ScrollAwareEnstructionContext.Provider>
	);
};

const useScrollDrivenEnstructions = () => {
	const context = React
		.useContext(ScrollAwareEnstructionContext);
	if (context === undefined) {
		throw new Error(
			'useScrollDrivenEnstructions must be used within a ScrollDrivenEnstructionProvider'
		);
	}
	return context;
}

// const PageTopEnstructionProvider = ({
// 	children,
// 	react,
// 	initial,
// }: {
// 	children: React.ReactNode,
// 	react: SingleEnstruction[],
// 	initial: Enstruct,
// }) => {
// 	const activeEnstruction = useSelectActiveEnstruction(react);

// 	return (
// 		<ScrollAwareEnstructionContext.Provider
// 			value={{ activeEnstruction }}
// 		>
// 			<></>
// 			{children}
// 		</ScrollAwareEnstructionContext.Provider>
// 	);
// };

export {
	ScrollDrivenEnstructionProvider,
};
export type {
	SingleEnstruction,
};

const ParrentHasFinishedContext = createContext<boolean | null>(null);

const ParrentHasFinishedProvider = ({
	children,
}: {
	children: React.ReactNode,
}) => {
	const [
		parrentActive,
		setParrentActive
	] = useState<boolean>(false);

	return (
		<ParrentHasFinishedContext.Provider
			value={parrentActive}
		>
			{children}
		</ParrentHasFinishedContext.Provider>
	);
};

const useParrentHasFinished = () => {
	const context = React
		.useContext(ParrentHasFinishedContext);
	if (context === undefined) {
		return null;
	}
	return context;
}



import {
	useAnimation,
	Variants,
	HTMLMotionProps,
	AnimatePresence
} from "framer-motion";
import { act } from 'react-dom/test-utils';

const useAnimateVariantWhenScroll = (
	variants: Variants,
) => {
	const controls = useAnimation();
	const { activeEnstruction } = useScrollDrivenEnstructions();

	React.useEffect(() => {
		if (activeEnstruction) {
			const animation = variants[activeEnstruction.animation];
			if (!animation) throw new Error("component does not have a required animation");
			controls.start(animation);
			return controls.stop;
		}
	}, [
		activeEnstruction,
		variants,
		controls,
	]);

	return controls;
};

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
		const controls = useAnimateVariantWhenScroll(variants);
		return (
			<MotionComponent animate={controls} {...props} />
		);
	};
	return ScrollMotionComponent;
};

import { usePresence } from "framer-motion";

const useMountWhenScroll = () => {
	const [mounted, setMounted] = useState<boolean>(false);
	const { activeEnstruction } = useScrollDrivenEnstructions();

	React.useEffect(() => {
		if (activeEnstruction &&
			activeEnstruction.mount !== undefined) {
				setMounted(activeEnstruction.mount);
			}
	}, [
		activeEnstruction,
		setMounted,
	]);

	return mounted;
};

const withScrollObservantFriendContextMount = (
	MotionComponent: React.ComponentType<HTMLMotionProps<any>>,
) => {
	const ScrollMountComponent = ({
		animate,
		...props
	} : HTMLMotionProps<any>
	) => {
		const mounted = useMountWhenScroll();

		return (
			<>
			<AnimatePresence>
			{mounted ? (
						<MotionComponent
							animate={animate}
							{...props}
							/> 
					): null}
			</AnimatePresence>
		</>
		)
	};
	return ScrollMountComponent;
};

export default withScrollObservantFriendContextAnimation;
export { withScrollObservantFriendContextMount };

import {
	useAnimate,
	stagger,
} from "framer-motion";

const withScrollObservantFriendStagger = (
	MotionComponent: React.ComponentType<HTMLMotionProps<any>>,
) => {
	const ScrollStaggerComponent = ({
		...props
	}: HTMLMotionProps<any>
	) => {
		const { activeEnstruction } = useScrollDrivenEnstructions();
		const [scope, animate] = useAnimate();

		React.useEffect(() => {

		}, [

		]);
	};
	return ScrollStaggerComponent;
}