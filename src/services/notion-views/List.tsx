import ParseError from "./utils/error";
import BlocksView from "./render/blocks";


const NotionList = ({
	page,
	fetchBlocks
}: {
	page: any
	fetchBlocks: (id: string) => Promise<any>
}) => {

	const list = page.page;

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