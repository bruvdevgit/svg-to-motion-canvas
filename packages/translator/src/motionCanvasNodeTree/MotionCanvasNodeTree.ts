import { InkscapeSVGConfig } from '../mainConfig/MainConfigSchema';
import { FsWrapper, initFsWrapper } from '../wrappers/FsWrapper';
import { initMotionCanvasCodeRenderer, MotionCanvasCodeRenderer, NodeReference, OutputFileFields } from './MotionCanvasCodeRenderer';
import { MotionCanvasNodesList } from './MotionCanvasNodesList';
import { JSXComponent } from './node/jsxComponent/JSXComponent';
import { Node as MotionCanvasNode } from './node/Node';

export interface MotionCanvasNodeTreeFields {
	nodes: MotionCanvasNodesList;
	canvasHeight: number,
	canvasWidth: number,
}

export interface MotionCanvasNodeTree {
	generateOutputFiles(config: InkscapeSVGConfig): Promise<void>;
}

export class _MotionCanvasNodeTree
	implements MotionCanvasNodeTree, MotionCanvasNodeTreeFields {
	nodes: MotionCanvasNodesList;
	canvasHeight: number = 0;
	canvasWidth: number = 0;

	constructor(public deps: {
		codeRenderer: MotionCanvasCodeRenderer,
		fs: FsWrapper,
	}, fields: MotionCanvasNodeTreeFields) {
		Object.assign(this, fields);
		this.nodes = fields.nodes;
	}

	//generate(config: InkscapeSVGConfig): Promise<void> {
	async generateOutputFiles(config: InkscapeSVGConfig): Promise<void> {
		const viewAdderFunctionName
			= config.output.viewAdderFunctionName;

		const {
			jsxComponents,
			references,
		} = this.nodes.getRenderInfo();

		const mainFileCodeContent = this.deps.codeRenderer.render({
			viewAdderFunctionName,
			components: jsxComponents,
			references,
		} satisfies OutputFileFields);

		const outputDirectoryPath = config.output.directoryPath;

		const outputFilePath = `${outputDirectoryPath}/${viewAdderFunctionName}.tsx`;

		await this.deps.fs.writeFile(outputFilePath, mainFileCodeContent);
	}
}

export type InitMotionCanvasNodeTreeFn = (
	fields: MotionCanvasNodeTreeFields) => MotionCanvasNodeTree;

export const initMotionCanvasNodeTree = (
	fields: MotionCanvasNodeTreeFields) =>
	new _MotionCanvasNodeTree({
		codeRenderer: initMotionCanvasCodeRenderer(),
		fs: initFsWrapper(),
	}, fields);
