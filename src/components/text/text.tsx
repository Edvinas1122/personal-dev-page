"use client";
import React from 'react';
import {
	Text,
	MantineTheme
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

const handleSegment: SegmentHandlers = {
	text: (segment, theme?: MantineTheme) => {
		return <span>{segment.content}</span>; // Wrapping text content in span
	},
	gradient: (segment, theme?: MantineTheme) => {
		// Ensuring theme and theme.defaultGradient exist
		if (!theme || !theme.defaultGradient) {
			console.error('Theme or defaultGradient not available for gradient segment.');
			return <></>;
		}

		return (
			<Text component="span" inherit variant="gradient" gradient={theme.defaultGradient}>
				{segment.content}
			</Text>
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

type TextProps = {
	rich_text: EnRichedText;
	theme: MantineTheme; // Made optional since not all segments might need it
};

function EnRichedTextDisplay({ rich_text, theme }: TextProps) {
	return (
		<>
		{rich_text.map((
			segment: Segment,
			index: number
		) => {
			const result = getSegment(segment, theme);
			return <React.Fragment key={index}>{result}</React.Fragment>;
		})}
		</>
	);
}

type EnRichedText = Segment[];

export type {TextProps, Segment, EnRichedText};
export {EnRichedTextDisplay};