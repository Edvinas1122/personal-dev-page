

export default function ProjectJournalPage({
	children,
}: {
	children: React.ReactNode
}) {
	
	return (
		<article
			style={{
				display: "flex",
				flexDirection: "row",
				width: "-webkit-fill-available",
			}}
			>
			{children}
		</article>
	);
}