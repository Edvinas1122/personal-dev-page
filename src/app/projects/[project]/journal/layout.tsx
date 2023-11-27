

export default function ProjectJournalPage({
	children,
}: {
	children: React.ReactNode
}) {
	
	return (
		<article
			style={{
				// backgroundColor: "black",
				// height: "100vh",
				display: "flex",
				flexDirection: "row",
				width: "-webkit-fill-available",
			}}
			>
			{children}
		</article>
	);
}