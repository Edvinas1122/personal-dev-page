import displayRichText, {richText} from "./rich_text/rich_text";
import handleBlock from "../../render/blocksRender";
import listRender from "../../render/listRender";

interface NumberedListItem {
	rich_text: richText[];
}

export default function handleNumberedListItem({
	bulleted_list_item,
	numbered_list_item,
	children
}: {
	bulleted_list_item?: NumberedListItem
	numbered_list_item?: NumberedListItem
	children?: any
}): any {
	console.log(numbered_list_item);
	const list_item = numbered_list_item || bulleted_list_item;
	if (list_item === undefined) {
		throw new Error("list_item is undefined");
	}

	const richText = displayRichText(list_item.rich_text);
	return (
		<li key={list_item.rich_text[0].plain_text} className={"notion-numbered_list-item"}>
			{richText}
			{children && children}
		</li>
	);
}
