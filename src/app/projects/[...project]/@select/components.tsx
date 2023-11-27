"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { url_string } from "@/utils/url_string";

function useActiveSegment(
	title: string,
	order: number = 3
) {
	const path = usePathname();
	const [activeSegment, setActiveSegment] = React.useState<boolean>(false);

	React.useEffect(() => {
		const pathSegments = path.split("/");
		if (pathSegments.length < order) {
			return;
		}
		const activeSegment = pathSegments[order];
		setActiveSegment(
			url_string(activeSegment) === title
		);
	}, [
		path
	]);
	return activeSegment;
}

import {
	Card,
	Title
} from "@mantine/core";

export function ActiveSegmentLayout({
	children,
	title,
	states,
}: {
	children: React.ReactNode;
	title: React.ReactNode;
	states: {
		activeSegment: boolean;
	}
}) {
	return (
		<Card
			shadow={states.activeSegment ? "md" : "md"}
			withBorder
			color="gray"
			radius={"md"}
			p="sm"
			h={140}
			display={"flex"}
			style={{
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "flex-start",
				gap: "0.1rem",
			}}
		>
			<Title
				order={3}
				w="100%"
				size={states.activeSegment ? "md" : "sm"}
			>{title}</Title>
			{children}
		</Card>
	);
}

export function ActiveSegmentComponent({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	const activeSegment = useActiveSegment(title, 3);
	return (
		<ActiveSegmentLayout
			title={
				<>
					{title}
				</>
			}
			states={{
				activeSegment,
			}}
		>
			<>
			{children}
			</>
		</ActiveSegmentLayout>
	);
}

import {
	SimpleGrid,
	Group,
} from "@mantine/core";

export function RouteReactiveGrid({
	children,
	heading,
}: {
	children: React.ReactNode;
	heading?: React.ReactNode;
}) {

	const path = usePathname();

	const pathSegments = path.split("/");
	const isComprised = pathSegments.length > 4;

	const cols = isComprised ? 1 : { base: 1, sm: 2, md: 3, lg: 4 };

	return (
		<Group
			style={{
				alignContent: "baseline",
				flexDirection: "column",
				alignItems: "baseline",
				width: isComprised ? "270px" : "100%"
			}}
			visibleFrom={isComprised ? "lg" : undefined}
		>
		{heading}
		<SimpleGrid
			cols={cols}
			style={{
				listStyle: "none",
				maxWidth: isComprised ? "270px" : "100%",
				position: "sticky",
				width: "100%",
			}}
		>
			{children}
		</SimpleGrid>
		</Group>
	);
}