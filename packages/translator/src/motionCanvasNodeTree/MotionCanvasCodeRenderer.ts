import { JSXComponent } from './node/jsxComponent/JSXComponent';

export interface NodeReference {
	variableName: string;
	type: string;
}

export interface OutputFileFields {
	viewAdderFunctionName: string,
	components: JSXComponent[],
	references: NodeReference[],
}

export interface MotionCanvasCodeRenderer {
	render(f: OutputFileFields): string;
}

export class _MotionCanvasCodeRenderer implements MotionCanvasCodeRenderer {

	render(f: OutputFileFields): string {
		const result = `
import { Rect, Node } from "@motion-canvas/2d";
import { createRef } from '@motion-canvas/core';

export function ${f.viewAdderFunctionName}(node: Node) {
${f.references.map(ref =>
			`	const ${ref.variableName} = createRef<${ref.type}>();`).join('\n')}

	node.add(<>
${f.components.map(comp => comp.toFileContentString('\t', 2)).join('\n')}
	</>);

	return {
${f.references.map(ref => `		${ref.variableName},`).join('\n')}
	};
}
`;
		return result;
	}
}

export type InitMotionCanvasCodeRendererFn = () => MotionCanvasCodeRenderer;

export const initMotionCanvasCodeRenderer = () => new _MotionCanvasCodeRenderer();
