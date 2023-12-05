"use client";
import {
	Container,
	Title,
	Text,
	Group,
	Paper,
} from '@mantine/core';
import { CircularProgress } from './circular-progress';
import { RationalProgress } from './rational-progres';

function defaultColorMethod(key: string) {
	switch (key) {
		case "Python":
			return "teal";
		case "JavaScript":
			return "yellow";
		case "TypeScript":
			return "#03bafc";
		case "HTML":
			return "red";
		case "CSS":
			return "blue";
		case "C++":
			return "cyan";
		case "C":
			return "pink";
		case "Java":
			return "orange";
		case "C#":
			return "red";
		case "PHP":
			return "blue";
		case "Ruby":
			return "red";
		case "Go":
			return "blue";
		case "Swift":
			return "orange";
		default:
			return "gray";
	}
}

export function ProgressCard({
	items,
}: {
	items: {[props: string]: number},
}) {

	return (
		<>
			<Container my="lg" size={"lg"}>
				<div style={{
					padding: "var(--mantine-spacing-md)"
				}}>
				
				{/* <CircularProgress */}
				<RationalProgress
					items={items}
					colorMethod={defaultColorMethod}
					/>
				</div>
				<Legend items={items} />
			</Container>
		</>
	);
}

function Legend({
	items,
}: {
	items: {[props: string]: number},
}) {
	return (
		<>
				<ul style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					gap: "1em",
				}}>
				{Object.keys(items).map((item) => (
					<li key={item} style={{
						textDecoration: "none",
						flexDirection: "row",
						display: "flex",
						gap: "0.45em",
						rowGap: "0.1em",
						flexWrap: "wrap",
					}}>
					<Text
						c={defaultColorMethod(item)}
						fw="bold"
						fs="xl"
						style={{
							fontSize: "1.8em",
							lineHeight: "0.73em",
						}}
					>
						{"•"}
					</Text>
					<Text>
						{item}
					</Text>
					<Text c="dimmed" pr="xs">
						{items[item]}%
					</Text>
					</li>
				))}
				</ul>
		</>
	);
}