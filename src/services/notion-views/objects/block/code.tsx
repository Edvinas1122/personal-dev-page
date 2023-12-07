import displayRichText, { richText } from "./rich_text/rich_text";
import { Group, Code } from "@mantine/core";
import { CodeHighlight, CodeHighlightTabs } from "@mantine/code-highlight";
import {
	TypeScriptIcon,
	CssIcon,
} from '@mantine/ds';

import {
	IconBrandTypescript,
	IconBrandJavascript,
	IconBrandPython,
	IconBrandHtml5,
	IconBrandCss3,
	IconBrandCpp,
	IconBrandDocker,
	IconBrandGit,
	IconBrandNextjs,
	IconBrandNodejs,
	IconBrandReact,
	TablerIconsProps,
	IconJson
} from '@tabler/icons-react';

type code = {
	language: string;
	rich_text: richText[];
};

function languageToLanguage(language: string) {
	switch (language) {
		case "plain text":
			return "plaintext";
		default:
			return language;
	}
}

function iconForLanguage(language: string) {
	switch (language) {
		case "typescript":
			return <TypeScriptIcon size={18} />;
		case "css":
			return <CssIcon size={18}/>;
		case "c++":
			return <IconBrandCpp size={18}/>;
		case "bash":
			return <IconBrandNodejs size={18}/>;
		case "plain text":
			return null;
		case "json":
			return <IconJson size={18}/>;
		case "docker":
			return <IconBrandDocker size={18}/>;
		case "shell":
			return <IconBrandNodejs size={18}/>;
		case "javascript":
			return <IconBrandJavascript size={18}/>;
		default:
			console.warn(`No icon for language ${language}`);
			return null;
	}
}

export default function handle_code({
	code,
}: {
	code: code
}) {
	const code_text = code.rich_text.map((text) => {
		return text.plain_text;
	}).join("");

	const reducedCode = code_text.replace(/\t/g, "  ");

	return (
		<CodeHighlightTabs
			withExpandButton
			defaultExpanded={code_text.length < 400}
			expandCodeLabel="Show full code"
			collapseCodeLabel="Show less"
			
			code={[
				{
					code: reducedCode,
					language: languageToLanguage(code.language),
					icon: iconForLanguage(code.language),
				}
			]}
		/>
	)
}