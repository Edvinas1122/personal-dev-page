"use client";
import {
	SimpleGrid,
} from '@mantine/core';
import { motion, Variants } from "framer-motion";
import React from 'react';
import { usePathname } from 'next/navigation';

export function ArchitecturePreviewGrid({
	children,
	variant
}: {
	children: React.ReactNode
	variant: Variants
}) {
	const visible = true;

	const MotionSimpleGrid = motion(SimpleGrid);

	const InnerContents = () => {
		const path = usePathname();

		const isSelected = path.split("/").length > 2;
		const singleSelected = (isSelected) ? isSelected : null;
		const cols = singleSelected ? 1 : { base: 1, sm: 2, md: 2, lg: 3 };

		return (
			<MotionSimpleGrid
				cols={cols}
				spacing="md"
				variants={variant}
				initial="hidden"
				animate={visible ? "visible" : "hidden"}
				style={{
					listStyle: "none",
					padding: 0,
				}}
			>
				{children}
			</MotionSimpleGrid>
		);
	}

	return (
		<InnerContents />
	);
}

