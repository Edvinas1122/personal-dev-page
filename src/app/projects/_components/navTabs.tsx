"use client";
import { Tabs, rem } from '@mantine/core';
import {
	IconPhoto,
	IconBook,
	IconBook2
} from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';

export default function ProjectNavTabs() {
	const router = useRouter();
	const pathname = usePathname();
	const iconStyle = { width: rem(12), height: rem(12) };

	const currentSelectedProject = pathname.split("/")[2];

	function handleTabChange(value: string | null) {
		if (!value) return;
		router.push(`/projects/${currentSelectedProject}/${value}`);
	}

	function getTabValue() {
		const path = pathname.split("/");
		if (path.length < 4) return "journal"
		return path[3];
	}

	return (
		<Tabs
			value={getTabValue()}
			onChange={handleTabChange}
		>
			<Tabs.List>
				<Tabs.Tab value="manual" leftSection={<IconBook style={iconStyle} />}>
					Manual
				</Tabs.Tab>
				<Tabs.Tab value="journal" leftSection={<IconBook2 style={iconStyle} />}>
					Journal
				</Tabs.Tab>
				<Tabs.Tab value="gallery" leftSection={<IconPhoto style={iconStyle} />}>
					Gallery
				</Tabs.Tab>
			</Tabs.List>
		</Tabs>
	);
}