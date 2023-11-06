import displayRichText, { richText } from "./rich_text/rich_text";
import { Group, Code } from "@mantine/core";
import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";

type code = {
	language: string;
	rich_text: richText[];
};

export default function handle_code({
	code,
}: {
	code: code
}) {
	const code_text = code.rich_text.map((text) => {
		return text.plain_text;
	}).join("");
	return (
			<CodeHighlightTabs
				withExpandButton
				defaultExpanded={false}
				expandCodeLabel="Show full code"
				collapseCodeLabel="Show less"
				code={[
					{
						code: code_text,
						language: code.language,
					}
				]}
			/>
	)
}