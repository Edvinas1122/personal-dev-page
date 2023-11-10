"use client";
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
} from '@tabler/icons-react';


type PRLanguages = {
	[language: string]: number;
}

type IconMappedHandler = {
	[language: string]: (props: TablerIconsProps) => JSX.Element;
}

const iconMap: IconMappedHandler = {
	"TypeScript": IconBrandTypescript,
	"JavaScript": IconBrandJavascript,
	"Python": IconBrandPython,
	"HTML": IconBrandHtml5,
	"CSS": IconBrandCss3,
	"C++": IconBrandCpp,
	"Docker": IconBrandDocker,
	"Git": IconBrandGit,
	"Next.js": IconBrandNextjs,
	"Node.js": IconBrandNodejs,
	"React": IconBrandReact,
	"shell": IconBrandNodejs,
	"C": IconBrandCpp,
};

export function Languages({
	languages,
	color,
}: {
	languages: PRLanguages,
	color: string,
}) {

	const languageIcons = Object.keys(languages).map((language, index) => {
		const Icon = iconMap[language];
		if (!Icon) {
			console.warn(`No icon for language ${language}`);
			return null;
		}
		return (
			<li
				key={language + index}
				style={{
					display: "inline-block",
					// marginRight: "0.5rem",
					marginTop: "var(--mantine-spacing-xs)",
				}}
			>
				<Icon
					color={color}
					size={24}
					/>
			</li>
		);
	});
	return (
		<>
			<ul
				style={{
					listStyle: "none",
					display: "flex",
					justifyContent: "flex-start",
					alignItems: "center",
					padding: 0,
					margin: 0,
					borderRadius: "var(--mantine-radius-md)",
				}}
			>
				{languageIcons}
			</ul>
		</>
	);
}