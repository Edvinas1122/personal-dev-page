import ParseError from "../utils/error";
import BlocksView from "./blocks";
import { notionBlock } from "./blocksRender";


export default function ListRender({
	list,
	fetchBlocks
}: {
	list: notionBlock
	fetchBlocks: (blockId: string) => Promise<any>
}) {
	if (list.object !== 'list' || list.results === undefined) {
		return (
			<ParseError
			/>
		);
	}

	return (
		<>
			<BlocksView
				blocks={list.results}
				fetchBlocks={fetchBlocks}
			/>
		</>
	);
}