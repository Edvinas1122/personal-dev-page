

export default function TutorialArticleLayout({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<main
			style={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				width: "100%",
				gap: "1em",
			}}
		>
			{children}
		</main>
	);
}