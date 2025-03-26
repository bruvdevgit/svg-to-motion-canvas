import { INode } from "svgson";
import { GroupElementAttributesSchema } from './GroupElementAttributesSchema';
import { initGroupElement, InitGroupElementFn, GroupElement, GroupElementFields } from './GroupElement';
import { ElementParser, ParseFnArgs } from '../ElementParser';
import { initGroupElementAttributesSchema } from './GroupElementAttributesSchema';
import { InitElementParserFn } from '../ElementParser';
import { Element as InkscapeSVGElement } from '../Element';
import { ElementParserFactory } from '../ElementParserFactory';
import { Transformer } from '../../transformer/Transformer';

export class _GroupElementParser implements ElementParser {
  constructor(public deps: {
    svgGroupElementSchema: GroupElementAttributesSchema,
    initGroupElementFn: InitGroupElementFn,
    elementParserFactory: ElementParserFactory,
  }) {
  }

  parse({ iNode, transformer: transformerFromUptree }: ParseFnArgs): GroupElement {
    const {
      id,
      transform,
    } = this.deps.svgGroupElementSchema.parse(iNode.attributes);

    let transformer: Transformer = transformerFromUptree;
    if (transform != null) {
      transformer = transformer.addFromTransformAttribute(transform);
    }

    let children: InkscapeSVGElement[] = iNode.children
      .map((iNode: INode) => {
        const parser = this.deps.elementParserFactory.init(iNode);
        return parser.parse({
          iNode,
          transformer,
        });
      });

    let props: GroupElementFields = {
      id,
      children,
    };

    return this.deps.initGroupElementFn(props);
  }
}

/* c8 ignore start */
export const initGroupElementParser: InitElementParserFn
  = (elementParserFactory: ElementParserFactory) => new _GroupElementParser({
    svgGroupElementSchema: initGroupElementAttributesSchema(),
    initGroupElementFn: initGroupElement,
    elementParserFactory,
  });
/* c8 ignore stop */

