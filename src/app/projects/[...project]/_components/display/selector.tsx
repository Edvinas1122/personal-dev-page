"use client";
import {
	Group,
	MantineComponent
} from "@mantine/core";
import {
	usePathname
} from "next/navigation";


/*
	on path sets setting of media query
*/
function Selector<T extends React.ElementType>({
	children,
	as,
	comprisedStyle,
	uncomprisedStyle,
	comprisedFrom,
	...props
}: {
	children: React.ReactNode;
	as?: T;
	comprisedFrom: number;
	comprisedStyle: {[key: string]: any},
	uncomprisedStyle: {[key: string]: any},
	[key: string]: any;
}) {

	const path = usePathname();
	const pathSegments = path.split("/");
	const isComprised = pathSegments.length > comprisedFrom;
	const combinedStyle = isComprised ? 
		{...props, ...comprisedStyle} : 
		{...props, ...uncomprisedStyle};
	const Component = as || Group;

	return (
		<Component
			{...combinedStyle}
		>
			{children}
		</Component>
	);
}

export default Selector;