import {
	Segment
} from "./text";

interface TextTyper {
	addTextSegment(content: string): TextTyper;
	addGradientSegment(content: string): TextTyper;
	build(): Segment[];
}

class EnRichedTextTyper implements TextTyper {
	private segments: Segment[] = [];

	constructor() {}

	addTextSegment(content: string): EnRichedTextTyper {
		this.segments.push({ type: 'text', content });
		return this;
	}

	addNewLine(): EnRichedTextTyper {
		this.segments.push({ type: 'new_line' });
		return this;
	}

	addGradientSegment(content: string): EnRichedTextTyper {
		this.segments.push({ type: 'gradient', content });
		return this;
	}

	build(): Segment[] {
		// const segments = new ServerText(this.segments).get();
		const new_segments = this.segments;
		this.segments = [];
		return new_segments;
	}
}

export default EnRichedTextTyper;
export type {TextTyper};