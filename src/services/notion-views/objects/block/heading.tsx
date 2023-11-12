import displayRichText from "./rich_text/rich_text";

interface Heading {
	rich_text: any[],
	is_toggable: boolean,
}


export function handleHeading({
	heading,
}: {
	heading: Heading,
}): any {
	if (heading === undefined) {
		// return null;
		throw new Error("heading is undefined");
	}
	const richText = displayRichText(heading.rich_text);
	return (
		<>
			{richText}
		</>
	);
}

export function handleHeading_1({
	heading_1
}: {
	heading_1: Heading,
}): any {
	const heading = handleHeading({heading: heading_1});
	return (
		<h1
			className={"notion-heading_1"}
			id={heading_1.rich_text.map((richText) => richText.plain_text).join("")}
		>
			{heading}
		</h1>
	);
}

export function handleHeading_2({
	heading_2
}: {
	heading_2: Heading,
}): any {
	const heading = handleHeading({heading: heading_2});
	return (
		<h2
			className={"notion-heading_2"}
			id={heading_2.rich_text.map((richText) => richText.plain_text).join("")}
		>
			{heading}
		</h2>
	);
}

export function handleHeading_3({
	heading_3
}: {
	heading_3: Heading,
}): any {
	const heading = handleHeading({heading: heading_3});
	return (
		<h3
			className={"notion-heading_3"}
			id={heading_3.rich_text.map((richText) => richText.plain_text).join("")}
		>
			{heading}
		</h3>
	);
}