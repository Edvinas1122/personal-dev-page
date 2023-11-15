"use client";

import {
	Text,
	Button,
} from '@mantine/core';
import {
	withMantineTheme
} from "./hooks";

export const GradientThemedText = withMantineTheme(
	Text,
	[{
		toSet: "gradient",
		setting: "defaultGradient"
	}]
);

export const GradientThemedButton = withMantineTheme(
	Button,
	[{
		toSet: "gradient",
		setting: "defaultGradient"
	}]
);