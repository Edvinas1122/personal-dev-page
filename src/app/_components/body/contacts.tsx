import { ActionIcon, rem } from '@mantine/core';
import * as allIcons from '@tabler/icons-react';

type TablerItem = keyof typeof allIcons;

export type TablerIconProps = {
	icon_name: TablerItem;
//@ts-ignore
} & React.ComponentProps<typeof allIcons[TablerItem]>;

export type Contact = {
	tabler_icon_name: TablerItem;
	link: string;
}

function TablerIcon({
	icon_name,
	...props
}: TablerIconProps) {
	const Icon = allIcons[icon_name];
	if (!Icon) {
		throw Error("TablerIcon: wrong icon name");
	}
	//@ts-ignore
	return (<><Icon {...props}/></>);
}

export default function Contacts({
	contacts,
}: {
	contacts: Contact[],
}) {

	const Item = ({
		contact,
	}: {
		contact: Contact,
	}) =>
	(
		<ActionIcon
			size="xl"
			variant="default"
			radius="xl"
			component='a'
			target='blank'
			href={contact.link}
		>
			<TablerIcon
				icon_name={contact.tabler_icon_name}
				style={{ width: rem(32), height: rem(32) }} stroke={1} />
		</ActionIcon>
	);

	const contact_items = contacts.map((contact) => (
		<>
			<Item key={contact.link + "_icon_link"} contact={contact}/>
		</>
	));


	return (
		<address
			style={{
				display: "flex",
				justifyContent: "flex-start",
				flexWrap: "nowrap",
				gap: "1rem"
			}}
		>
			{contact_items}
		</address>
	);
}