import { Group } from "@mantine/core";
import {
	BlockSpecifics
} from "../../render/blocksRender"

export default function handleColumnList({
	column_list,
	children
}: BlockSpecifics) {
	if (column_list === undefined) {
		throw new Error("column_list in notion block renderenr received as undefined");
	}
	return (
		<Group
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-around",
			}}
		>
			{children && children}
		</Group>
	);
}

export function handleColumn({
	column,
	children
}: BlockSpecifics) {
	if (column === undefined) {
		throw new Error("column in notion block renderenr received as undefined")
	}
	return (
		<>
			{children && children}
		</>
	);
}