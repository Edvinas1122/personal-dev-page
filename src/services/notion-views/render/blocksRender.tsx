import handleCallout from "../objects/block/callout";
import handleParagraph from "../objects/block/paragraph";
import handleChildDatabase from "../objects/block/child_database";
import { handleHeading_1, handleHeading_2, handleHeading_3 } from "../objects/block/heading";
import handleNumberedListItem from "../objects/block/numbered_list_item";
import handle_image from "../objects/block/image";
import handle_code from "../objects/block/code";
import handleColumnList, {handleColumn} from "../objects/block/column_list";

export enum BlockType {
	callout = "callout",
	child_database = "child_database",
	paragraph = "paragraph",
	heading_1 = "heading_1",
	heading_2 = "heading_2",
	heading_3 = "heading_3",
	rich_text = "rich_text",
	numbered_list_item = "numbered_list_item",
	bulleted_list_item = "bulleted_list_item",
	image = "image",
	code = "code",
	column_list = "column_list",
	column = "column"
}

type BlockContent = {
	[type in BlockType]: any;
};

enum Object {
	block = "block",
	list = "list",
	database = "database",
	page = "page",
	user = "user",
	space = "space",
	collection_view = "collection_view",
	collection = "collection",
}

export type notionBlock = {
	id: string;
	object: Object;
	type: BlockType;
	has_children: boolean;
	results?: notionBlock[];
	children?: notionBlock;
	fetchBlocks?: (blockId: string) => Promise<any>;
} & BlockContent;


interface BlockProps {
	children?: JSX.Element
}

export type BlockSpecifics = BlockContent & BlockProps;

type BlockHandler = (content: BlockSpecifics) => JSX.Element | null;

const blockHandlers: { [key: BlockType | string]: BlockHandler } = {
	[BlockType.callout]: handleCallout,
	[BlockType.child_database]: handleChildDatabase,
	[BlockType.paragraph]: handleParagraph,
	[BlockType.heading_1]: handleHeading_1,
	[BlockType.heading_2]: handleHeading_2,
	[BlockType.heading_3]: handleHeading_3,
	[BlockType.numbered_list_item]: handleNumberedListItem,
	[BlockType.bulleted_list_item]: handleNumberedListItem,
	[BlockType.image]: handle_image,
	[BlockType.code]: handle_code,
	[BlockType.column_list]: handleColumnList,
	[BlockType.column]: handleColumn,
	// "Breadcrumb": handleBreadcrumb,
	// "Bulleted list item": handleBulleted,
	// "Child page": handleChild_page,
	// "Code": handleCode,
	// "Column list and column": handleColumn_list,
	// "Divider": handleDivider,
	// "Embed": handleEmbed,
	// "Equation": handleEquation,
	// "File": handleFile,
	// "Headings": handleHeadings,
	// "Image": handleImage,
	// "Link Preview": handleLink,
	// "Mention": handleMention,
	// "Numbered list item": handleNumbered,
	// "PDF": handlePDF,
	// "Quote": handleQuote,
	// "Synced block": handleSynced,
	// "Table": handleTable,
	// "Table of contents": handleTable,
	// "Template": handleTemplate,
	// "To do": handleTo,
	// "Toggle blocks": handleToggle,
	// "Video": handleVideo,
};

import BlocksView from "./blocks";

function childrenBlocks(
	block: notionBlock, 
	fetchBlocks: (blockId: string) => Promise<any>
): JSX.Element | null { // recursive children blocks
	if (!block) return null;
	return (
		<>
			<BlocksView
				blocks={block.results as notionBlock[]}
				fetchBlocks={fetchBlocks}
			/>
		</>
	);
}

export default async function Block({
	block,
	fetchBlocks,
}: {
	block: notionBlock;
	fetchBlocks: (blockId: string) => Promise<any>;
}): Promise<JSX.Element | null> {

	const handler = blockHandlers[block.type];
	if (!handler) {
		console.warn(`No handler for block type ${block.type}`);
		return null;
	}

	const childrenElements = block.has_children ? await fetchBlocks(block.id) : undefined;
	const content: any = {
		[block.type]: block[block.type],
		children: childrenElements ? childrenBlocks(childrenElements, fetchBlocks) : undefined
	};
	const html = handler(content);
	return (
		<>
			{html}
		</>
	);
}
