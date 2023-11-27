"use client"
import cx from 'clsx';
import { useState } from 'react';
import { Box, Text, Group, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import classes from './contents.module.css';

const links = [
  { label: 'Usage', link: '#usage', order: 1 },
  { label: 'Position and placement', link: '#position', order: 1 },
  { label: 'With other overlays', link: '#overlays', order: 1 },
  { label: 'Manage focus', link: '#focus', order: 1 },
  { label: 'Examples', link: '#1', order: 1 },
  { label: 'Show on focus', link: '#2', order: 2 },
  { label: 'Show on hover', link: '#3', order: 2 },
  { label: 'With form', link: '#4', order: 2 },
];

export function TableOfContentsFloating({
		links,
	}: {
		links: {
			label: string
			link: string
			order: number
		}[]
	}) {
	const [active, setActive] = useState(2);

	function selectFontsize(order: number) {
		switch (order) {
			case 1:
				return "var(--mantine-font-size-md)";
			case 2:
				return "var(--mantine-font-size-sm)";
			case 3:
				return "var(--mantine-font-size-xs)";
			case 4:
				return "var(--mantine-font-size-xs)";
			default:
				return "var(--mantine-font-size-xs)";
		}
	}
	function selectHeight(order: number) {
		switch (order) {
			case 1:
				return "3rem";
			case 2:
				return "2.5rem";
			case 3:
				return "1.8rem";
			case 4:
				return "1rem";
			default:
				return "0.8rem";
		}
	}

	const items = links.map((item, index) => (
		<Box<'a'>
			component="a"
			href={item.link}
			onClick={(event) => {
				event.preventDefault();
				setActive(index);
			window.history.pushState(null, '', item.link);
			}}
			key={item.label}
			className={cx(classes.link, { [classes.linkActive]: active === index })}
			style={{
				paddingLeft: `calc(${item.order} * var(--mantine-spacing-sm))`,
				fontSize: selectFontsize(item.order),
				height: selectHeight(item.order),
				lineHeight: selectHeight(item.order),
			}}
		>
			{item.label}
		</Box>
	));

	return (
		<nav className={classes.root} style={{
			position: "sticky",
			top: 0,
			marginTop: "var(--mantine-spacing-md)",
			paddingTop: "6vh",
			whiteSpace: "nowrap",
			width: "100%",
			minWidth: "100px",
			maxWidth: "240px",
		}}>
			<Group
				mb="md"
				hiddenFrom='sm'
				>
				<IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
				<Text
					size='xs'
				>Table of contents</Text>
			</Group>
			<div className={classes.links}>
				<div
					className={classes.indicator}
					style={{
						transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
				}}
				/>
				{items}
			</div>
		</nav>
	);
}