"use server";
import React from 'react';
import {
	Text,
	MantineTheme,
	MantineComponent
} from '@mantine/core';

type TextSegment = {
	type: 'text';
	content: string;
};

type GradientSegment = {
	type: 'gradient';
	content: string;
};

type NewLineSegment = {
	type: 'new_line';
};

type Segment = TextSegment | GradientSegment | NewLineSegment;

type SegmentHandlers = {
	[Type in Segment['type']]: (segment: Extract<Segment, { type: Type }>, theme?: MantineTheme) => React.ReactNode;
};

import {
	GradientThemedText
} from "./contexted";

const handleSegment: SegmentHandlers = {
	text: (segment, theme?: MantineTheme) => {
		return <>{segment.content}</>; // Wrapping text content in span
	},
	gradient: (segment, theme?: MantineTheme) => {
		return (
			<GradientThemedText 
				component="span"
				inherit
				variant="gradient"
				// gradient={"default-gradient"}
				// gradient={theme.defaultGradient}
			>
				{segment.content}
			</GradientThemedText>
		);
	},
	new_line: (segment, theme?: MantineTheme) => {
		return <br />;
	}
};

function getSegmentHandler<Discriminant extends Segment['type']>(
	type: Discriminant
): (segment: Extract<Segment, { type: Discriminant }>, theme?: MantineTheme) => React.ReactNode {
	const handle = handleSegment[type];
	if (!handle) {
		console.error(`No handler for segment type ${type}`);
		throw new Error(`No handler for segment type ${type}`);
	}
	return handle;
}

function getSegment(
	segment: Segment,
	theme?: MantineTheme
) {
	const handler = getSegmentHandler(segment.type);
	return handler(segment, theme);
}

type TextProps<ComponentProps = {}> = {
	rich_text: EnRichedText;
	Component?: React.ComponentType<ComponentProps> | MantineComponent<any>;
} & ComponentProps;

function EnRichedTextDisplay<ComponentProps>({ 
	rich_text,
	Component = Text,
	...props
}: TextProps<ComponentProps>) {
	return (
		<Component {...props as ComponentProps}>
		{rich_text.map((
			segment: Segment,
			index: number
		) => {
			const result = getSegment(segment);
			return <React.Fragment key={index}>{result}</React.Fragment>;
		})}
		</Component>
	);
}

type EnRichedText = Segment[];

export type {TextProps, Segment, EnRichedText};
export {EnRichedTextDisplay};