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

function markheadingID(heading: Heading)
{
	const text = heading.rich_text
		.map((richText) => richText.plain_text)
		.join("")
		// .replace(/ /g, "%20");

	return text;
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
			id={markheadingID(heading_1)}
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
			id={markheadingID(heading_2)}
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
			id={markheadingID(heading_3)}
		>
			{heading}
		</h3>
	);
}