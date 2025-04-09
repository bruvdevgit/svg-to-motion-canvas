import t from 'tap'
import { _RectElementParser } from './RectElementParser';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { RectElementAttributes, RectElementAttributesSchema } from './RectElementAttributesSchema';
import { InitRectElementFn, RectElement, RectElementFields } from './RectElement';
import { ElementParserFactory } from '../ElementParserFactory';
import { ElementParser, ParseFnArgs } from '../ElementParser';
import { Element } from '../Element';
import { Transformer } from '../../transformer/Transformer';
import { INode } from 'svgson';
import { StyleAttributeSpreader } from '../styleAttributeSpreader/StyleAttributeSpreader';

const rects: {
  svgsonNode: INode,
  attributes: RectElementAttributes,
  props: RectElementFields,
}[] = [
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#2ca02c;fill-opacity:1;stroke:#1300ff;stroke-width:1.23096;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect1",
          "width": "82.803673",
          "height": "25.728548",
          "x": "9.0465326",
          "y": "10.700179",
          "inkscape:label": "green-fill-and-stroke-rect-x-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect1",
        "width": 82.803673,
        "height": 25.728548,
        "x": 9.0465326,
        "y": 10.700179,
        label: "green-fill-and-stroke-rect-x-long-sharp-corners",
        "fill": "#2ca02c",
        "fillOpacity": 1,
        "stroke": "#1300ff",
        "strokeWidth": 1.23096,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": [],
      },
      attributes: {
        "id": "rect1",
        "style": {
          "fill": "#2ca02c",
          "fill-opacity": "1",
          "stroke": "#1300ff",
          "stroke-width": "1.23096",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "82.803673",
        "height": "25.728548",
        "x": "9.0465326",
        "y": "10.700179",
        "inkscape:label": "green-fill-and-stroke-rect-x-long-sharp-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#2ca02c;fill-opacity:1;stroke:none;stroke-width:1.23096;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect18",
          "width": "82.803673",
          "height": "25.728548",
          "x": "103.76017",
          "y": "26.485786",
          "inkscape:label": "green-fill-only-rect-x-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect18",
        "width": 82.803673,
        "height": 25.728548,
        "x": 103.76017,
        "y": 26.485786,
        label: "green-fill-only-rect-x-long-sharp-corners",
        "fill": "#2ca02c",
        "fillOpacity": 1,
        "stroke": "none",
        "strokeWidth": 1.23096,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect18",
        "style": {
          "fill": "#2ca02c",
          "fill-opacity": "1",
          "stroke": "none",
          "stroke-width": "1.23096",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "82.803673",
        "height": "25.728548",
        "x": "103.76017",
        "y": "26.485786",
        "inkscape:label": "green-fill-only-rect-x-long-sharp-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#d40000;fill-opacity:1;stroke:none;stroke-width:1.73211;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect19",
          "width": "81.960045",
          "height": "81.960045",
          "x": "103.59733",
          "y": "94.122421",
          "ry": "0",
          "inkscape:label": "red-fill-only-rect-square-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect19",
        "width": 81.960045,
        "height": 81.960045,
        "x": 103.59733,
        "y": 94.122421,
        "ry": 0,
        label: "red-fill-only-rect-square-sharp-corners",
        "fill": "#d40000",
        "fillOpacity": 1,
        "stroke": "none",
        "strokeWidth": 1.73211,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect19",
        "style": {
          "fill": "#d40000",
          "fill-opacity": "1",
          "stroke": "none",
          "stroke-width": "1.73211",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "81.960045",
        "height": "81.960045",
        "x": "103.59733",
        "y": "94.122421",
        "ry": "0",
        "inkscape:label": "red-fill-only-rect-square-sharp-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#c87137;fill-opacity:1;stroke:none;stroke-width:0.942981;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect21",
          "width": "44.620049",
          "height": "44.620049",
          "x": "102.03346",
          "y": "233.83994",
          "ry": "22.310024",
          "inkscape:label": "brown-fill-only-rect-square-circular"
        },
        "children": []
      },
      props: {
        "id": "rect21",
        "width": 44.620049,
        "height": 44.620049,
        "x": 102.03346,
        "y": 233.83994,
        "ry": 22.310024,
        label: "brown-fill-only-rect-square-circular",
        "fill": "#c87137",
        "fillOpacity": 1,
        "stroke": "none",
        "strokeWidth": 0.942981,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect21",
        "style": {
          "fill": "#c87137",
          "fill-opacity": "1",
          "stroke": "none",
          "stroke-width": "0.942981",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "44.620049",
        "height": "44.620049",
        "x": "102.03346",
        "y": "233.83994",
        "ry": "22.310024",
        "inkscape:label": "brown-fill-only-rect-square-circular"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#c83782;fill-opacity:1;stroke:none;stroke-width:1.18864;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect22",
          "width": "84.983978",
          "height": "20.706318",
          "x": "101.67195",
          "y": "62.121624",
          "ry": "10.353159",
          "inkscape:label": "purple-fill-only-rect-x-long-rounded-corners"
        },
        "children": []
      },
      props: {
        "id": "rect22",
        "width": 84.983978,
        "height": 20.706318,
        "x": 101.67195,
        "y": 62.121624,
        "ry": 10.353159,
        label: "purple-fill-only-rect-x-long-rounded-corners",
        "fill": "#c83782",
        "fillOpacity": 1,
        "stroke": "none",
        "strokeWidth": 1.18864,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect22",
        "style": {
          "fill": "#c83782",
          "fill-opacity": "1",
          "stroke": "none",
          "stroke-width": "1.18864",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "84.983978",
        "height": "20.706318",
        "x": "101.67195",
        "y": "62.121624",
        "ry": "10.353159",
        "inkscape:label": "purple-fill-only-rect-x-long-rounded-corners"
      },
    },
    {
      svgsonNode: {
        "name": "rect",
        "type": "element",
        "value": "",
        "attributes": {
          "style": "fill:#37bbc8;fill-opacity:1;stroke:none;stroke-width:1.328;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
          "id": "rect23",
          "width": "33.072918",
          "height": "93.430992",
          "x": "151.47566",
          "y": "184.45245",
          "ry": "0",
          "inkscape:label": "blue-fill-only-rect-y-long-sharp-corners"
        },
        "children": []
      },
      props: {
        "id": "rect23",
        "width": 33.072918,
        "height": 93.430992,
        "x": 151.47566,
        "y": 184.45245,
        "ry": 0,
        label: "blue-fill-only-rect-y-long-sharp-corners",
        "fill": "#37bbc8",
        "fillOpacity": 1,
        "stroke": "none",
        "strokeWidth": 1.328,
        "strokeLinecap": "round",
        "strokeLinejoin": "round",
        "strokeMiterlimit": 0,
        "strokeDasharray": "none",
        "strokeOpacity": 1,
        "paintOrder": "fill markers stroke",
        "children": []
      },
      attributes: {
        "id": "rect23",
        "style": {
          "fill": "#37bbc8",
          "fill-opacity": "1",
          "stroke": "none",
          "stroke-width": "1.328",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "stroke-miterlimit": "0",
          "stroke-dasharray": "none",
          "stroke-opacity": "1",
          "paint-order": "fill markers stroke"
        },
        "width": "33.072918",
        "height": "93.430992",
        "x": "151.47566",
        "y": "184.45245",
        "ry": "0",
        "inkscape:label": "blue-fill-only-rect-y-long-sharp-corners"
      },
    }
  ];

t.test('parse correctly parses', t => {
  for (let i = 0; i < rects.length; i++) {
    const styleAttributeSpreader = Substitute.for<StyleAttributeSpreader>();
    styleAttributeSpreader
      .spread(rects[i].svgsonNode.attributes.style)
      .returns(rects[i].attributes.style);

    const svgRectElementSchema = Substitute.for<RectElementAttributesSchema>();
    svgRectElementSchema
      .parse(rects[i].attributes as RectElementAttributes)
      .returns(rects[i].attributes);

    const rectElement = Substitute.for<RectElement>();

    const transformer = Substitute.for<Transformer>();

    // A "Jacket" is a concept I made up:
    // It's an object that's made just to have the function
    // of interest as its one and only method. Then,
    // because I can have that object implement an interface,
    // I can use @fluffy-spoon/substitute to mock the function
    // of interest.
    interface InitRectElementFnJacket {
      fn: InitRectElementFn,
    }
    const initRectElementFnJacket = Substitute.for<InitRectElementFnJacket>();
    initRectElementFnJacket
      .fn({ ...rects[i].props, transformer: transformer as Transformer } as RectElementFields)
      .returns(rectElement);

    const elementParserFactory = Substitute.for<ElementParserFactory>();

    const rectElementParser = new _RectElementParser({
      svgRectElementSchema,
      initRectElementFn: initRectElementFnJacket.fn,
      styleAttributeSpreader,
      elementParserFactory,
    });

    const found: RectElement = rectElementParser.parse({
      iNode: rects[i].svgsonNode,
      transformer: transformer as Transformer
    } satisfies ParseFnArgs);
    const wanted: RectElement = rectElement;

    // - start verify internal function calls -

    styleAttributeSpreader
      .received()
      .spread(rects[i].svgsonNode.attributes.style);

    svgRectElementSchema
      .received()
      .parse(rects[i].attributes as RectElementAttributes)

    initRectElementFnJacket
      .received()
      .fn({ ...rects[i].props, transformer: transformer as Transformer } as RectElementFields);


    // - end verify internal function calls -

    t.same(found, wanted, `at i=${i}`);
  }

  t.end();
});


t.test('parse correctly parses with sub-children', t => {
  // start the provisions for the children
  const children = rects.slice(1);
  const childrenINodes = children.map(child => child.svgsonNode);
  const childrenParser = Substitute.for<ElementParser>();

  // the same parser for all the children because
  // the parser factory has all nodes of the same
  // type share a parser.
  const childrenParsers = Array(children.length).fill(childrenParser);
  const childrenInkscapeSVGElements = children
    .map(_ => Substitute.for<Element>());

  const elementParserFactory = Substitute.for<ElementParserFactory>();

  childrenINodes.forEach((node, i) => elementParserFactory
    .init(node)
    .returns(childrenParsers[i]));

  const transformer = Substitute.for<Transformer>();

  childrenParsers
    .forEach((parser, i) => parser
      .parse({ iNode: childrenINodes[i], transformer } satisfies ParseFnArgs)
      .returns(childrenInkscapeSVGElements[i]));

  // end the provisions for the children

  const styleAttributeSpreader = Substitute.for<StyleAttributeSpreader>();
  styleAttributeSpreader
    .spread(rects[0].svgsonNode.attributes.style)
    .returns(rects[0].attributes.style);
  const svgRectElementSchema = Substitute.for<RectElementAttributesSchema>();
  svgRectElementSchema
    .parse(rects[0].attributes as RectElementAttributes)
    .returns(rects[0].attributes);


  const rectElement = Substitute.for<RectElement>();

  // A "Jacket" is a concept I made up:
  // It's an object that's made just to have the function
  // of interest as its one and only method. Then,
  // because I can have that object implement an interface,
  // I can use @fluffy-spoon/substitute to mock the function
  // of interest.
  interface InitRectElementFnJacket {
    fn: InitRectElementFn,
  }
  const initRectElementFnJacket = Substitute.for<InitRectElementFnJacket>();
  initRectElementFnJacket
    .fn({ ...rects[0].props, children: childrenInkscapeSVGElements, transformer })
    .returns(rectElement);


  const rectElementParser = new _RectElementParser({
    svgRectElementSchema,
    initRectElementFn: initRectElementFnJacket.fn,
    elementParserFactory,
    styleAttributeSpreader,
  });

  const found: RectElement = rectElementParser.parse({
    iNode: {
      ...rects[0].svgsonNode, children: childrenINodes
    },
    transformer,
  });
  const wanted: RectElement = rectElement;

  // - start verify internal function calls -
  styleAttributeSpreader
    .received()
    .spread(rects[0].svgsonNode.attributes.style);

  childrenINodes.forEach((node, i) => elementParserFactory
    .received()
    .init(node)
  );

  childrenParsers
    .forEach((parser, i) => parser
      .received()
      .parse({ iNode: childrenINodes[i], transformer } satisfies ParseFnArgs)
    );

  initRectElementFnJacket.received()
    .fn({ ...rects[0].props, children: childrenInkscapeSVGElements, transformer });

  svgRectElementSchema
    .received()
    .parse(rects[0].attributes);

  // - end verify internal function calls -

  t.same(found, wanted,);

  t.end();
});

////TODO: implement
//t.test('parse correctly parses when there\'s a transform attribute', t => {
//});
