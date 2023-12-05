import { Variants } from "framer-motion";

const item: Variants = {
	hidden: {
		y: 20,
		opacity: 0,
		filter: "blur(1px)"
	},
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)"
	}
};
const container = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2
		}
	}
};

const animation = {
	item,
	container
}

export {
	animation
}