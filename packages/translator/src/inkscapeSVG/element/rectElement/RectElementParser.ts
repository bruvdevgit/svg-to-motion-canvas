import { INode } from "svgson";
import { RectElementAttributesSchema } from './RectElementAttributesSchema';
import { initRectElement, InitRectElementFn, RectElement, RectElementFields } from './RectElement';
import { ElementParser, ParseFnArgs } from '../ElementParser';
import { initRectElementAttributesSchema } from './RectElementAttributesSchema';
import { InitElementParserFn } from '../ElementParser';
import { initStyleAttributeParser, StyleAttributeParser } from '../../styleAttribute/StyleAttributeParser';
import { Element as InkscapeSVGElement } from '../Element';
import { ElementParserFactory } from '../ElementParserFactory';
import { Transformer } from '../../transformer/Transformer';

export class _RectElementParser implements ElementParser {
  constructor(public deps: {
    svgRectElementSchema: RectElementAttributesSchema,
    initRectElementFn: InitRectElementFn,
    svgElementStyleAttributeParser: StyleAttributeParser,
    elementParserFactory: ElementParserFactory,
  }) {
  }

  parse({ iNode, transformer: transformerFromUptree }: ParseFnArgs): RectElement {
    const {
      'inkscape:label': label,
      id,
      x,
      y,
      ry,
      rx,
      width,
      height,
      style,
      transform,
    } = this.deps.svgRectElementSchema.parse(iNode.attributes);

    const {
      fill,
      fillOpacity,
      stroke,
      strokeWidth,
      strokeLinecap,
      strokeLinejoin,
      strokeMiterlimit,
      strokeDasharray,
      strokeOpacity,
      paintOrder,
    } = this.deps.svgElementStyleAttributeParser.parse(style);

    let transformer: Transformer = transformerFromUptree;
    if (transform != null) {
      transformer = transformer.addFromTransformAttribute(transform);
    }

    let children: InkscapeSVGElement[] = iNode.children
      .map((iNode: INode) => {
        const parser = this.deps.elementParserFactory.init(iNode);
        return parser.parse({
          iNode,
          transformer
        });
      });

    let props: RectElementFields = {
      id,
      label,
      x: +x,
      y: +y,
      ...(rx != null ? { rx: Number(rx) } : {}),
      ...(ry != null ? { ry: Number(ry) } : {}),
      width: +width,
      height: +height,
      fill,
      fillOpacity,
      stroke,
      strokeWidth,
      strokeLinecap,
      strokeLinejoin,
      strokeMiterlimit,
      strokeDasharray,
      strokeOpacity,
      paintOrder,
      children,
      transformer,
    };

    return this.deps.initRectElementFn(props);
  }
}

/* c8 ignore start */
export const initRectElementParser: InitElementParserFn
  = (elementParserFactory: ElementParserFactory,
  ) => new _RectElementParser({
    svgRectElementSchema: initRectElementAttributesSchema(),
    initRectElementFn: initRectElement,
    svgElementStyleAttributeParser: initStyleAttributeParser(),
    elementParserFactory,
  });
/* c8 ignore stop */

