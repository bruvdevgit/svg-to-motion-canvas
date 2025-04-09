import { INode } from "svgson";
import { RectElementAttributesSchema } from './RectElementAttributesSchema';
import { initRectElement, InitRectElementFn, RectElement, RectElementFields } from './RectElement';
import { ElementParser, ParseFnArgs } from '../ElementParser';
import { initRectElementAttributesSchema } from './RectElementAttributesSchema';
import { InitElementParserFn } from '../ElementParser';
import { Element as InkscapeSVGElement } from '../Element';
import { ElementParserFactory } from '../ElementParserFactory';
import { Transformer } from '../../transformer/Transformer';
import { initStyleAttributeSpreader, StyleAttributeSpreader } from "../styleAttributeSpreader/StyleAttributeSpreader";

export class _RectElementParser implements ElementParser {
  constructor(public deps: {
    svgRectElementSchema: RectElementAttributesSchema,
    initRectElementFn: InitRectElementFn,
    elementParserFactory: ElementParserFactory,
    styleAttributeSpreader: StyleAttributeSpreader,
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
    } = this.deps.svgRectElementSchema.parse({
      ...iNode.attributes,
      style: this.deps.styleAttributeSpreader.spread(iNode.attributes.style)
    });

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
      fill: style.fill,
      fillOpacity: Number(style['fill-opacity']),
      stroke: style.stroke,
      strokeWidth: Number(style['stroke-width']),
      strokeLinecap: style['stroke-linecap'],
      strokeLinejoin: style['stroke-linejoin'],
      strokeMiterlimit: Number(style['stroke-miterlimit']),
      strokeDasharray: style['stroke-dasharray'],
      strokeOpacity: Number(style['stroke-opacity']),
      paintOrder: style['paint-order'],
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
    elementParserFactory,
    styleAttributeSpreader: initStyleAttributeSpreader(),
  });
/* c8 ignore stop */

