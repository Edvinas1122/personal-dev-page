import {
	notionBlock
} from "./render/blocksRender";
import {
	handleHeading
} from "./objects/block/heading";

function OnPage({
	blocks,
	nav_props,
	list_props
}: {
	blocks: notionBlock[],
	nav_props?: {[key: string]: any}
	list_props?: {[key: string]: any}
}) {

	const headers = blocks
		.filter((block) => {
			return (
					block.type === "heading_1" 
					|| block.type === "heading_2" 
					|| block.type === "heading_3"
				);
		});

	const headerLevel = (headerType: string) => {
		switch(headerType) {
			case "heading_1": return 1;
			case "heading_2": return 2;
			case "heading_3": return 3;
			default: return 0;
		}
	};

	const markedHeaders = headers.map((header, index) => {
		const currentLevel = headerLevel(header.type);
		const nextHeader = headers[index + 1];
		const nextLevel = nextHeader ? headerLevel(nextHeader.type) : 0;

		return {
			...header,
			has_children: nextLevel > currentLevel
		};
	});

	
    const countChildren = (blocks: notionBlock[], start_from_index: number, level: number) => {
        let children_count = 0;
        for (let i = start_from_index; i < blocks.length; i++) {
			const type = blocks[i].type;
            if (headerLevel(type) <= level) {
				break;
            }
			children_count++;
        }
        return children_count;
    }
	
    function renderList(startIndex: number, count: number) {
		const items = new Array();

        for (let i = startIndex; i < startIndex + count; i++) {
            const header = markedHeaders[i];
            const childrenCount = countChildren(
				markedHeaders, i + 1, headerLevel(header.type));

			const item = handleHeading({
				heading: header[header.type]
			});
			const children = childrenCount 
				? (<ul key={header.id + "_children"}>
						{renderList(i + 1, childrenCount)}
					</ul>) : null;
			items.push(
				<li key={header.id}>
					<a
						href={"#" + header[header.type].rich_text[0].plain_text}
					>
						{item}
					</a>
					{children}
				</li>
			);
            i += childrenCount;
        }

        return items;
    }

    return (
		<>
        <nav {...nav_props}>
            <ul {...list_props}>
                {renderList(0, markedHeaders.length)}
            </ul>
        </nav>
		</>
    );

}

export default OnPage