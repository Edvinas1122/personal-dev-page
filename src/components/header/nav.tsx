"use client";
import {
	HoverCard,
	Group,
	Button,
	UnstyledButton,
	Text,
	SimpleGrid,
	ThemeIcon,
	Anchor,
	Divider,
	Center,
	Box,
	Burger,
	Drawer,
	Collapse,
	ScrollArea,
	rem,
	useMantineTheme,
	Autocomplete,
	Container,
	MantineTheme,
	NavLink
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import {
	IconNotification,
	IconCode,
	IconBook,
	IconChartPie3,
	IconFingerprint,
	IconCoin,
	IconChevronDown,
} from '@tabler/icons-react';
import { IconSearch } from '@tabler/icons-react';
import classes from './header.module.css';
  
  const mockdata = [
	{
	  icon: IconCode,
	  title: 'Open source',
	  description: 'This Pokémon’s cry is very loud and distracting',
	},
	{
	  icon: IconCoin,
	  title: 'Free for everyone',
	  description: 'The fluid of Smeargle’s tail secretions changes',
	},
	{
	  icon: IconBook,
	  title: 'Documentation',
	  description: 'Yanma is capable of seeing 360 degrees without',
	},
	{
	  icon: IconFingerprint,
	  title: 'Security',
	  description: 'The shell’s rounded shape and the grooves on its.',
	},
	{
	  icon: IconChartPie3,
	  title: 'Analytics',
	  description: 'This Pokémon uses its flying ability to quickly chase',
	},
	{
	  icon: IconNotification,
	  title: 'Notifications',
	  description: 'Combusken battles with the intensely hot flames it spews',
	},
];

import { motion } from 'framer-motion';
import React from 'react';

export interface HeaderSearchProps {
	// sections: string[];
	searchServerMethod: (query: string) => Promise<any>;
	children?: React.ReactNode;
}

import { useSelectedLayoutSegment } from 'next/navigation'

type Link = string;

export function NavSection(props: HeaderSearchProps) {
	const [
		drawerOpened,
		{ toggle: toggleDrawer, close: closeDrawer }
	] = useDisclosure(false);
	const [
		linksOpened,
		{ toggle: toggleLinks }
	] = useDisclosure(false);
	const theme = useMantineTheme();
	const selectedLayoutSegment = useSelectedLayoutSegment();

	const height = rem(64);

	const links = [
		'Projects',
		'Journal',
		'Contact'
	];

	const LinksDisplay = ({
		links,
		selectedLayoutSegment
	}:{
		links: Link[]
		selectedLayoutSegment: string | null
	}) => {

		const selected_color = theme.primaryColor;

		function background_color(link: string) {
			return selectedLayoutSegment === link.toLowerCase() ? selected_color : undefined;
		}

		return links.map((link) => (
			<Button
				component={Link}
				h="1.8rem"
				variant="transparent"
				className={classes.link}
				key={link}
				href={`/${link.toLowerCase()}`}
				style={{
					backgroundColor: background_color(link),
				}}
			>
				{link}
			</Button>
		));
	}

  
	return (
		<>
			<Group
				justify="space-between"
				h="100%"
				px="lg"
			>
  
			<Group h="100%" gap={2} visibleFrom="md">
				<LinksDisplay
					links={links}
					selectedLayoutSegment={selectedLayoutSegment}
				/>
				{props.children}
			</Group>
  
			<Group visibleFrom='sm'>
				<SearchBar
					searchServerMethod={props.searchServerMethod}
				/>
			</Group>
  
			<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="md" />
		  </Group>
		<Drawer
		  opened={drawerOpened}
		  onClose={closeDrawer}
		  size="100%"
		  padding="md"
		  title="Navigation"
		  hiddenFrom="md"
		  zIndex={1000000}
		>
		  <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
			<Divider my="sm" />
  
			<LinksDisplay
				links={links}
				selectedLayoutSegment={selectedLayoutSegment}
			/>
			{props.children}
  
			<Divider my="sm" />
  
			{/* <Group justify="center" grow pb="xl" px="md">
			  <Button variant="default">Log in</Button>
			  <Button>Sign up</Button>
			</Group> */}
			<Group justify="center" grow pb="xl" px="md" hiddenFrom="sm">
				{/* <Autocomplete
					className={classes.search}
					placeholder="Search"
					leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
					data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
					visibleFrom="xs"
				/> */}
				{/* <SearchBar
					searchServerMethod={props.searchServerMethod}
				/> */}
			</Group>
		  </ScrollArea>
		</Drawer>
		</>
	);
}

const HoverCardPopover = ({
	name,
	classes,
	theme,
	links,
	// scrollToProject,
}: {
	name: string;
	classes: Record<string, string>;
	theme: MantineTheme;
	links: React.ReactNode;
	// scrollToProject: () => void;
}) => {

	return (
		<>
		<HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
			<HoverCard.Target>
			<a href={`#${name}`} className={classes.link}>
				<Center inline>
				<Box component="span" mr={5}>
					{name}
				</Box>
				<IconChevronDown
					style={{ width: rem(16), height: rem(16) }}
					color={theme.colors.blue[6]}
				/>
				</Center>
			</a>
			</HoverCard.Target>

			<HoverCard.Dropdown style={{ overflow: 'hidden' }}>
			<Group justify="space-between" px="md">
				<Text fw={500}>Features</Text>
				<Anchor href="#" fz="xs">
					View all
				</Anchor>
			</Group>

			<Divider my="sm" />

			<SimpleGrid cols={2} spacing={0}>
				{links}
			</SimpleGrid>

			<div className={classes.dropdownFooter}>
				<Group justify="space-between">
				<div>
					<Text fw={500} fz="sm">
					Get started
					</Text>
					<Text size="xs" c="dimmed">
					Their food sources have decreased, and their numbers
					</Text>
				</div>
				<Button variant="default">Get started</Button>
				</Group>
			</div>
			</HoverCard.Dropdown>
		</HoverCard>
		</>
	);
}

import {
	TextInput,
	Code,
	Modal,
	FocusTrap,
	Loader,
	ComboboxItem,
	MantineColor
} from '@mantine/core';
import {
	useHotkeys,
	useDebouncedState,
} from '@mantine/hooks';

type SearchBarProps = {
	searchServerMethod: (query: string) => Promise<any>;
};

function SearchBar(
	props: SearchBarProps
) {
	const [search_opened, { toggle, close }] = useDisclosure(false);
	const [search, setSearch] = React.useState('');
	const [debaunced] = useDebouncedValue(search, 200);
	const [results, setResults] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (debaunced.length > 0) {
			setLoading(true);
			props.searchServerMethod(debaunced).then((res) => {
				setLoading(false);
				setResults(res.results);
			});
		} else {
			setResults([]);
		}
	}, [debaunced]);

	useHotkeys([
		['ctrl+k', () => toggle()],
		["ArrowDown", () => console.log('down')],
	]);
	return (
		<>
			<TextInput
				placeholder="Search"
				size="xs"
				leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
				rightSectionWidth={70}
				rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
				styles={{ section: { pointerEvents: 'none' } }}
				onClick={toggle}
			/>
			<Modal
				opened={search_opened}
				onClose={close}
				title="Search Documents"
				yOffset="1vh"
				xOffset={0}
			>
				<FocusTrap active={search_opened}>
					<ResultDisplay
						results={results}
						onChange={(value) => {
							// const currentValue = value;
							setSearch(value);
						}}
						loading={loading}
						/>
				</FocusTrap>
			</Modal>
		</>
	)
}

import
	Link
from 'next/link';
import {
	to_url_string
} from '@/utils/url_string';


interface ItemProps extends ComboboxItem {
	color: MantineColor;
	description: string;
	image: string;
	at: string;
	title: string;
}

import {useRouter} from 'next/navigation';
  
const ResultDisplay = (props: {
	results: {
		at: string;
		title: string;
		description: string;
		label: string;
		path: string;
	}[],
	onChange: ((value: string) => void),
	loading: boolean;
}) => {
	const router = useRouter();
	function handleSelect(path: string) {
		console.log("handleSelect", path);
		router.push(path);
	}

	function AutoCompleteItemComponent(
		props: ItemProps & {
			ref: React.ForwardedRef<HTMLDivElement>;
			others: React.ComponentPropsWithoutRef<"div">;
		}
	) {
		return (
			<div ref={props.ref} {...props.others}>
				<Group wrap='nowrap'>
					{/* <Avatar src={image} /> */}
					<Text>{props.at}</Text>
					<Text>{props.title}</Text>
					<Text size="xs" c="dimmed" lineClamp={2}>
						{props.description}
					</Text>
				</Group>
			</div>
		);
	}

	const AutoCompleteItem = React.forwardRef(AutoCompleteItemComponent);

	const resultsMapped = props.results.map((item) => ({ ...item, value: item.path }));

	return (
			<Autocomplete
				onChange={props.onChange}
				className={classes.search}
				placeholder="Search"
				leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
				//@ts-ignore
				itemComponent={AutoCompleteItem}
				onOptionSubmit={handleSelect}
				data={resultsMapped}
				filter={(item) => {
					console.log("item", item);
					return item.options;

				}}
				rightSection={props.loading ? <Loader size="xs" /> : null}
				visibleFrom="xs"
			/>
	)
}