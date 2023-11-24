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

function determineInitialEnstruction(
	react: SingleEnstruction[],
) {
	const height = 0;
	if (height > 0) {
		return react[0];
	} else {
		return react[1];
	}
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
	const {pathEnstruction, root} = usePathDrivenEnstructions(react);
	// const [
	// 	active,
	// 	setActive
	// ] = React.useState<Enstruct>(initial);
	const [
		active,
		dispatch
	] = React.useReducer(
		enstructionReducer,
		determineInitialEnstruction(react)
	);

	function pathPreventsScroll() {
		// if root
		const currentUrl = new URL(window.location.href).pathname;
		return currentUrl !== "/";
	}


	React.useEffect(() => {
		if (activeEnstruction && !pathPreventsScroll()) {
			dispatch({ type: 'SET_ACTIVE', payload: activeEnstruction });
		}
	}, [activeEnstruction]);

	React.useEffect(() => {
		if (pathEnstruction) {
			dispatch({ type: 'SET_ACTIVE', payload: pathEnstruction });
		}
	}, [
		pathEnstruction,
		root
	]);

	return (
		<ScrollAwareEnstructionContext.Provider
			value={{ activeEnstruction: active }}
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

const withScrollObservantFriendContextMount = (
	MotionComponent: React.ComponentType<HTMLMotionProps<any>>,
) => {
	const ScrollMountComponent = ({
		animate,
		...props
	} : HTMLMotionProps<any> & {
		animate: MotionStyle;
	}
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
	useScroll,
	useMotionValueEvent,
	useTransform,
	MotionValue,
	MotionStyle
} from "framer-motion"

type StyleProperties = Partial<CSSStyleDeclaration>;

// type AffectProperty = {
// 	min: StyleProperties
// 	max: StyleProperties;
// 	// compensate: string;
// }

import { usePathname } from 'next/navigation'

function usePathReference() {
	const pathname = usePathname();
	const [path, setPath] = useState<boolean>(true);

	React.useEffect(() => {
		if (pathname !== "/") {
			setPath(false);
		} else {
			setPath(true);
		}
	}, [pathname]);
	return path;
}

const enstructionReducer = (
	state: Enstruct | null,
	action: { type: string; payload: Enstruct }
) => {
    switch (action.type) {
        case 'SET_ACTIVE':
            return action.payload;
        default:
            return state;
    }
};

function usePathDrivenEnstructions(react: SingleEnstruction[]) {
    const root = usePathReference();
    const [
		activeEnstruction,
		dispatch
	] = React.useReducer(enstructionReducer, null);

    React.useEffect(() => {
        if (root) {
            const scrollHeight = window.scrollY === 0;
            if (scrollHeight) {
                dispatch({ type: 'SET_ACTIVE', payload: react[0] });
            }
        } else {
            dispatch({ type: 'SET_ACTIVE', payload: react[1] });
        }
    }, [root, activeEnstruction]);

    return {
		pathEnstruction: activeEnstruction,
		root
	};
}

type AnimateRate = {
	incramentRate: number;
	initial: number | null;
}

function useAnimateTime(
	animateState: React.Dispatch<React.SetStateAction<any>>,
	compensate: (latest: number) => any,
	max: number,
	rate: number = 10,
) {
	const [isPending, startTransition] = React.useTransition()
	const [value, setValue] = useState<number>(0);
	const [startPoint, setStartPoint] = useState<AnimateRate | null>(null);

	React.useEffect(() => {
		console.log("we run animation", startPoint);
		if (startPoint === null) return;
		startPoint.initial && setValue(startPoint.initial);
		const interval = setInterval(() => {
			setValue((prev) => {
				console.log("we run animation", prev)
				const next = prev + startPoint.incramentRate;
				if (next <= 0) return 0;
				if (next >= max && startPoint.incramentRate < 0) {
					// clearInterval(interval);
					return max;
				}
				return next;
			});
		}, rate);
		const timeout = setTimeout(() => {
			clearInterval(interval);
		}, 800);
		return () => {
			clearInterval(interval);
			clearTimeout(timeout);
		}
	}, [
		startPoint,
	]);

	React.useEffect(() => {
		if (value === 0) return;
		animateState(compensate(value));
	}, [
		value,
		animateState,
	]);

	return {
		setStartPoint,
	};
}

export const withScrollPosition = (
	MotionComponent: React.ComponentType<HTMLMotionProps<any>>,
	compensateScroll: (latest: number) => MotionStyle,
	initial: MotionStyle,
) => {
	const ScrollPositionComponent = ({
		...props
	}: HTMLMotionProps<any>
	) => {
		const { scrollY } = useScroll();
		const [
			scrollPositionStyle,
			setScroll
		] = React.useState<MotionStyle>(initial);
		const root = usePathReference();
		const { setStartPoint } = useAnimateTime(
			setScroll,
			compensateScroll,
			320
		);

		useMotionValueEvent(scrollY, "change", (latest) => {
			if (!root) return;
			// if (latest > 400) return;
			setScroll(
				compensateScroll(latest)
			);
		});

		React.useEffect(() => {
			if (!root) {
				// const scrollValue = window.scrollY;
				setStartPoint({
					initial:  scrollY.get(),
					incramentRate: 10,
				});
			} else {
				const scrollValue = window.scrollY / 10;
				const isRoot = new URL(window.location.href).pathname === "/";
				// console.log("scroll value", scrollValue);
				if (scrollValue > 0 && isRoot) return;
				setStartPoint({
					initial: 0,
					incramentRate: -10,
				});
			}
		}, [
			root
		]);

		return (
			<MotionComponent
				{...props}
				style={{
					// ...props.style,
					...scrollPositionStyle,
				}}
			/>
		);
	};
	return ScrollPositionComponent;
}

// import {
// 	useAnimate,
// 	stagger,
// } from "framer-motion";

// const withScrollObservantFriendStagger = (
// 	MotionComponent: React.ComponentType<HTMLMotionProps<any>>,
// ) => {
// 	const ScrollStaggerComponent = ({
// 		...props
// 	}: HTMLMotionProps<any>
// 	) => {
// 		const { activeEnstruction } = useScrollDrivenEnstructions();
// 		const [scope, animate] = useAnimate();

// 		React.useEffect(() => {

// 		}, [

// 		]);
// 	};
// 	return ScrollStaggerComponent;
// }