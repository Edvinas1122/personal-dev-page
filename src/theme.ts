"use client";

import {
	VariantColorsResolver,
	VariantColorsResolverInput,
	VariantColorResolverResult,
	createTheme,
	defaultVariantColorsResolver
} from "@mantine/core";


export const theme = createTheme({
/* Put your mantine theme override here */
	primaryColor: 'pink',
	// fontFamily: 'Open Sans, sans serif',
	variantColorResolver: defaultVariantColorsResolver,
	colors: {
		'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
		'light-blue': ['#E6F4FF', '#C0E2FF', '#9AD0FF', '#74BEFF', '#4EAFFD', '#2A9DFB', '#008CF9', '#007CE6', '#006DC3', '#005EA0'],
		'blue': ['#DCEBFF', '#B8D6FF', '#94C2FF', '#70ADFF', '#4C99FF', '#2885FF', '#0070FF', '#0062E6', '#0054C3', '#0046A0'],
		// 'pink': ['#FDEBFF', '#FAD6FF', '#F8C2FF', '#F5ADFF', '#F299FF', '#F085FF', '#ED70FF', '#E85CE6', '#E448C3', '#E034A0'],
		// 'yellow': ['#FFF9E6', '#FFF0C0', '#FFE99A', '#FFE173', '#FFD94C', '#FFD026', '#FFC300', '#E6AD00', '#C39500', '#A67C00'],
	},
	defaultGradient: {
		from: 'pink',
		to: 'yellow',
	}

});

export const lightTheme = createTheme({
	primaryColor: 'blue',
	fontFamily: 'Open Sans, sans serif',
	colors: {
		'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
		'light-blue': ['#E6F4FF', '#C0E2FF', '#9AD0FF', '#74BEFF', '#4EAFFD', '#2A9DFB', '#008CF9', '#007CE6', '#006DC3', '#005EA0'],
		'blue': ['#DCEBFF', '#B8D6FF', '#94C2FF', '#70ADFF', '#4C99FF', '#2885FF', '#0070FF', '#0062E6', '#0054C3', '#0046A0'],
		'pink': ['#FDEBFF', '#FAD6FF', '#F8C2FF', '#F5ADFF', '#F299FF', '#F085FF', '#ED70FF', '#E85CE6', '#E448C3', '#E034A0'],
		'yellow': ['#FFF9E6', '#FFF0C0', '#FFE99A', '#FFE173', '#FFD94C', '#FFD026', '#FFC300', '#E6AD00', '#C39500', '#A67C00'],
	},
	defaultGradient: {
		from: 'pink',
		to: 'yellow',
	}
});