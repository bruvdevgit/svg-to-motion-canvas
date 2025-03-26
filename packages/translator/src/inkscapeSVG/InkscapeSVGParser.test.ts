import t from 'tap'
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { rectSVGString, rectSVGSvgson, rectInkscapeSVG } from './testData';
import { SvgsonWrapper } from '../wrappers/SvgsonWrapper';
import { InitInkscapeSVGFn, InkscapeSVG, InkscapeSVGFields } from './InkscapeSVG';
import { InkscapeSVGAttributesSchema } from './InkscapeSVGAttributesSchema';
import { ElementParserFactory } from './element/ElementParserFactory';
import { _InkscapeSVGParser } from './InkscapeSVGParser';
import { INode } from 'svgson';
import { ElementParser } from './element/ElementParser';
import { Transformer } from './transformer/Transformer';

t.test('parse correctly parses', t => {
  const svgson = Substitute.for<SvgsonWrapper>();
  interface InitInkscapeSVGFnJacket {
    fn: InitInkscapeSVGFn
  }
  const initInkscapeSVGFnJacket = Substitute.for<InitInkscapeSVGFnJacket>();
  const initInkscapeSVGFn = initInkscapeSVGFnJacket.fn;
  const svgAttributesSchema = Substitute.for<InkscapeSVGAttributesSchema>();
  const elementParserFactory = Substitute.for<ElementParserFactory>();
  const transformer = Substitute.for<Transformer>();

  svgson
    .parseSync(rectSVGString)
    .returns(rectSVGSvgson);

  svgAttributesSchema
    .parse(rectSVGSvgson.attributes)
    .returns({
      height: rectSVGSvgson.attributes.height,
      width: rectSVGSvgson.attributes.width,
      viewBox: rectSVGSvgson.attributes.viewBox,
    });

  const rectSVGSvgsonElements: INode[] = rectSVGSvgson
    .children[2]
    .children satisfies INode[];

  const newTransformer = Substitute.for<Transformer>();

  transformer
    .addForUserlandConversion({ scaleFactor: 3.779527559055118, centerPoint: [-1920 / 2, -1080 / 2] })
    .returns(newTransformer);

  let rectElementParser = Substitute.for<ElementParser>();
  for (let i = 0; i < rectSVGSvgsonElements.length; i++) {
    const element = rectSVGSvgsonElements[i];

    elementParserFactory
      .init(element)
      .returns(rectElementParser);

    rectElementParser
      .parse({ iNode: element satisfies INode, transformer: newTransformer })
      .returns(rectInkscapeSVG.elements[i]);

  }

  initInkscapeSVGFnJacket
    .fn({
      elements: rectInkscapeSVG.elements,
      height: rectInkscapeSVG.height,
      width: rectInkscapeSVG.width,
      viewBox: rectInkscapeSVG.viewBox,
    } as InkscapeSVGFields)
    .returns(rectInkscapeSVG as InkscapeSVG);


  const inkscapeSVGParser = new _InkscapeSVGParser({
    svgson,
    initInkscapeSVGFn,
    svgAttributesSchema,
    elementParserFactory,
    transformer,
  });

  let found = inkscapeSVGParser.parse(rectSVGString);
  const wanted = rectInkscapeSVG;

  // - start verify internal function calls -
  svgson
    .received()
    .parseSync(rectSVGString);

  svgAttributesSchema
    .received()
    .parse(rectSVGSvgson.attributes);

  transformer
    .received()
    .addForUserlandConversion({ scaleFactor: 3.779527559055118, centerPoint: [-1920 / 2, -1080 / 2] });

  for (let i = 0; i < rectSVGSvgsonElements.length; i++) {
    const element = rectSVGSvgsonElements[i];
    elementParserFactory.received().init(element);
    rectElementParser.received()
      .parse({ iNode: element satisfies INode, transformer: newTransformer });
  }
  // - end verify internal function calls -

  t.same(found, wanted);

  t.end();
});
