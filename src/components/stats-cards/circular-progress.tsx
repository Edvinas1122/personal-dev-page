"use client";

import { RingProgress } from '@mantine/core';

function defaultColorMethod(key: string) {
	return "teal";
}

export function CircularProgress({
	items,
	label,
	colorMethod = defaultColorMethod,
}: {
	items: {[props: string]: number},
	label?: string,
	colorMethod: (key: string) => string,
}) {

	const sections = Object.keys(items).map((item) => (
		{ value: items[item], color: colorMethod(item) }
	));

	return (
		<>
		<RingProgress
			size={150}
			thickness={15}
			label={label}
			// roundCaps
			sections={sections}
			/>
		</>
	);
}
