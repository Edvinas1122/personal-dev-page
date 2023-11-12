import ParseError from "./utils/error";
import BlocksView from "./render/blocks";


const NotionList = ({
	page
}: {
	page: any
}) => {

	const list = page.page;
	const fetchBlocks = (block_id: string) => page.getChildrenBlocks(block_id);

	if (list === undefined) {
		return (
			<ParseError />
		);
	}

	return (
		<>
			<BlocksView
				blocks={list}
				fetchBlocks={fetchBlocks}
			/>
		</>
	);
}

export default NotionList;