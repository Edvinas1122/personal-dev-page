import {
	Anchor,
	Group
} from '@mantine/core';
import classes from './header.module.css';

function FooterCentered({
	links,
	children
}: {
	links: string[],
	children: React.ReactNode;
}) {
	const nav_items = links.map((link) => (
		<Anchor
			c="dimmed"
			key={link + "_link_footer"}
			href={`/${link.toLocaleLowerCase()}`}
			lh={1}
			size="sm"
		>
			{link}
		</Anchor>
	));

	return (
		<footer className={classes.footer}>
			<div className={classes.inner}>
				{/* <MantineLogo size={28} /> */}

				<nav>
					<Group className={classes.links}>
						{nav_items}
					</Group>
				</nav>
				{children}
			</div>
		</footer>
	);
}

export {
	FooterCentered
};