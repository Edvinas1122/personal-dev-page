import {
	Manual
} from "./blog.orm"

function describeManual(
	type: Manual["Type"],
	part: Manual["Part"],
	expands: Manual["Expands"],
): string {
	if (type == "Documentation" && part == "Full" && expands.length == 0) {
		return "A full documentation of the project";
	} else if (type == "Documentation" && part == "Full" && expands.length > 0) {
		return "Main documentation of the project";
	} else if (type == "Documentation" && part == "Fragment") {
		return "Documentation part";
	} else if (type == "Tutorial" && part == "Full") {
		return "A tutorial for the project";
	} else if (type == "Tutorial" && part == "Fragment") {
		return "A tutorial for a part of the project";
	} else 
		return "A manual for the project";
}

export {
	describeManual
}