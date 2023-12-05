import {
	Group,
	Container
} from '@mantine/core';
import styles from "./article.module.css"

export function ArticleLayout({
	children,
	contents,
}: {
	children: React.ReactNode
	contents: React.ReactNode
}) {
	return (
		<>
		<article
			className={styles.article}
		>
			{children}
		</article>
		<aside
			className={styles.article_nav}
		>
		<Group
			my="md"
			align="start"
			visibleFrom="lg"
			>
			{contents}
		</Group>
		</aside>
		</>
	);
}