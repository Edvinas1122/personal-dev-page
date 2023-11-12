import Block, {BlockType, notionBlock} from "./blocksRender";

type BlocksViewProps = {
	blocks: notionBlock[];
	fetchBlocks: (blockId: string) => Promise<any>;
};

enum WrappedListType {
	numbered_list_item,
	bulleted_list_item,
}

function isWrappedList(block: notionBlock): boolean {
	if (block.type === BlockType.numbered_list_item) {
		return true;
	}
	if (block.type === BlockType.bulleted_list_item) {
		return true;
	}
	return false;
}

function listRender(
	list: notionBlock[],
	fetchBlocks: (blockId: string) => Promise<any>,
	listType: WrappedListType
): JSX.Element {

	if (listType === WrappedListType.numbered_list_item) {
		return (
			<ol key={list[0].id} className={"notion-list"}>
				{list.map((block) => {
					return (
						<Block
							key={block.id}
							block={block}
							fetchBlocks={fetchBlocks}
						/>
					);
				})}
			</ol>
		);
	}

	return (
		<ul key={list[0].id} className={"notion-list"}>
			{list.map((block) => {
				return (
					<Block
						key={block.id}
						block={block}
						fetchBlocks={fetchBlocks}
					/>
				);
			})}
		</ul>
	);
}

export default function BlocksView({
	blocks, fetchBlocks
}: BlocksViewProps
) {
	let list: any = [];
	let listType: WrappedListType = WrappedListType.numbered_list_item;
	return blocks.map((block, index) => {
		if (isWrappedList(block)) {
			listType = block.type as unknown as WrappedListType;
			list.push(block);
			if (index === blocks.length - 1) {
				return listRender(list, fetchBlocks, listType);
			}
			return;
		} else {
			if (list.length > 0) {
				const contents = listRender(list, fetchBlocks, listType);
				list = [];
				return contents;
			}
		}
		return (
			<Block
				key={block.id}
				block={block}
				fetchBlocks={fetchBlocks}
			/>
		);
	});
}