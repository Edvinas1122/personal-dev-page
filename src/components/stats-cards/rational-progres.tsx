"use client";
import {
	Progress,
} from '@mantine/core';
import classes from './progres-card.module.css';

function defaultColorMethod(key: string) {
	return "teal";
}

export function RationalProgress({
	items,
	colorMethod = defaultColorMethod,
}: {
	items: {[props: string]: number},
	colorMethod?: (key: string) => string,
}) {

	return (
		<>
			<Progress.Root>
				{Object.keys(items).map((item) => (
					<Progress.Section
						key={item}
						className={classes.progressSection}
						value={items[item]}
						color={colorMethod(item)}
					/>
				))}
			</Progress.Root>
		</>
	);
}