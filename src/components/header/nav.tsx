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


	// const links = mockdata.map((item) => (
	//   <UnstyledButton className={classes.subLink} key={item.title}>
	// 	<Group wrap="nowrap" align="flex-start">
	// 	  <ThemeIcon size={34} variant="default" radius="md">
	// 		<item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
	// 	  </ThemeIcon>
	// 	  <div>
	// 		<Text size="sm" fw={500}>
	// 		  {item.title}
	// 		</Text>
	// 		<Text size="xs" c="dimmed">
	// 		  {item.description}
	// 		</Text>
	// 	  </div>
	// 	</Group>
	//   </UnstyledButton>
	// ));
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
		selectedLayoutSegment: string
	}) => {
		return links.map((link) => (
			<Link
				className={classes.link}
				key={link}
				href={`${link.toLowerCase()}`}
				style={{
					backgroundColor: selectedLayoutSegment === link.toLowerCase() ? theme.colors.blue[1] : undefined
				}}
			>
				{link}
			</Link>
		));
	}

  
	return (
		<>
			<Group
				justify="space-between"
				h="100%"
				px="lg"
			>
  
			<Group h="100%" gap={0} visibleFrom="md">
				<LinksDisplay
					links={links}
					selectedLayoutSegment={selectedLayoutSegment}
				/>
				{/* <a
					className={classes.link}
					onClick={() => {
						document.location.hash = '';
						closeDrawer();
					}}
				>
					Main
				</a>
				<a href="#" className={classes.link}>
					Projects
				</a>
				{/* <HoverCardPopover
					name={'Projects'}
					classes={classes}
					theme={theme}
					links={links}
				/> */}

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
  
			<a href="#" className={classes.link}>
				Home
			</a>
			<UnstyledButton className={classes.link} onClick={toggleLinks}>
			  <Center inline>
				<Box component="span" mr={5}>
					Features
				</Box>
				<IconChevronDown
				  style={{ width: rem(16), height: rem(16) }}
				  color={theme.colors.blue[6]}
				/>
			  </Center>
			</UnstyledButton>
			<Collapse in={linksOpened}>{links}</Collapse>
			<a href="#" className={classes.link}>
			  Learn
			</a>
			<a href="#" className={classes.link}>
			  Academy
			</a>
  
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
	const [were_used, setWereUsed] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		if (debaunced.length > 0) {
			setLoading(true);
			props.searchServerMethod(debaunced).then((res) => {
				setLoading(false);
				setResults(res.results);
				setWereUsed(true);
			});
		} else {
			setResults([]);
			setWereUsed(false);
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
				{/* <TextInput
					placeholder="Search"
					aria-label='Search'
					size="xs"
					leftSection={<IconSearch style={{ width: rem(12), height: rem(12) }} stroke={1.5} />}
					rightSection={loading ? <Loader size="xs" />: null}
					rightSectionWidth={70}
					styles={{ section: { pointerEvents: 'none' } }}
					mb="sm"
					data-autofocus
					onChange={(event) => {
						const currentValue = event.currentTarget.value;
						setSearch(currentValue);

					}}
					/> */}
				</FocusTrap>
				<ResultDisplay
					results={results}
					were_used={were_used}
					onChange={(value) => {
						// const currentValue = value;
						setSearch(value);
					}}
				/>
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
	value: string;
}

import {useRouter} from 'next/navigation';
  
function ResultDisplay(props: {
	results: {
		at: string;
		title: string;
		description: string;
	}[],
	were_used: boolean,
	onChange: ((value: string) => void)
}) {
	const router = useRouter();
	if (props.results.length === 0 && props.were_used) {
		return (
			<Text>
				No results found
			</Text>
		);
	}

	function handleSelect(value: string) {
		console.log("handleSelect", value);
		router.push(to_url_string(value));
	}

	const AutoCompleteItem = React
		.forwardRef<HTMLDivElement, ItemProps>(
			({ description, at, value, ...others }: ItemProps, ref) => {
				console.log("console",description, value);
			return <div ref={ref} {...others}>
				<Group noWrap>
				{/* <Avatar src={image} /> */}
					<Text>
						{at}
					</Text>
					<Text>
						{value}
					</Text>
					<Text
						size="xs"
						c="dimmed"
						lineClamp={2}
						>
						{description}
					</Text>
				</Group>
			</div>
			}
		);

	const resultsMapped = props.results.map((item) => ({ ...item, value: item.label }));

	return (
			<Autocomplete
				onChange={props.onChange}
				className={classes.search}
				placeholder="Search"
				leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
				itemComponent={AutoCompleteItem}
				onOptionSubmit={handleSelect}
				data={resultsMapped}
				filter={(item) => {
					console.log("item", item);
					return item.options;

				}
				}
				visibleFrom="xs"
			/>
	)
}