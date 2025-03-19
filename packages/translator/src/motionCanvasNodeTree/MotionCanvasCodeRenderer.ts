import { JSXComponent } from './node/jsxComponent/JSXComponent';

export interface NodeReference {
	variableName: string;
	type: string;
}

export interface OutputFileFields {
	viewAdderFunctionName: string,
	canvasHeight: number,
	canvasWidth: number,
	heightAntecedent?: number,
	widthAntecedent?: number,
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

// the zero position (origin) is the center
const ZERO_POSITION = [-${f.canvasWidth} / 2, -${f.canvasHeight} / 2];

function scaleCoord(p: number) {
	// y = mx where m = ((height-width)/(vBoxHeight-vBoxWidth))
	return p * ((${f.canvasHeight} - ${f.canvasWidth}) / (${f.heightAntecedent} - ${f.widthAntecedent}));
}

function coordX(x: number) {
	return ZERO_POSITION[0] + scaleCoord(x);
}

function coordY(y: number) {
	return ZERO_POSITION[1] + scaleCoord(y);
}

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
