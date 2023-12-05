import React from "react";
import { useAnimation, Variants, HTMLMotionProps } from "framer-motion";
import { useWindowScroll } from '@mantine/hooks'; 

type SingleEnstruction = {
	value: number; // Greater than this value
	threshold: number; // Less than this value + threshold
	animation: string;
};

type ScrollReactance = SingleEnstruction[];

const withScrollControlledContext = (
	MotionComponent: React.ComponentType<HTMLMotionProps<any>>
) => {
	const ScrollAwareComponent = ({
		variants,
		react,
		...props
	}: {
		variants: Variants;
		react: ScrollReactance;
	} & HTMLMotionProps<any>) => {
		const controls = useAnimation();
		const [scroll] = useWindowScroll();
		const [
			currentEnstruction,
			setCurrentEnstruction
		] = React.useState<SingleEnstruction>();

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
			const activeEnstruction = react
				.find(enstruction => 
					is_in_reactive_range(scroll.y, enstruction)
				);
			if (
				activeEnstruction
					&& activeEnstruction !== currentEnstruction
			) {
				setCurrentEnstruction(activeEnstruction);
				controls.start(variants[activeEnstruction.animation]);
			}
		}, [
			scroll.y,
			react,
			variants,
			controls,
			currentEnstruction
		]);

		return <MotionComponent animate={controls} {...props} />;
	};
	return ScrollAwareComponent;
};

export default withScrollControlledContext;