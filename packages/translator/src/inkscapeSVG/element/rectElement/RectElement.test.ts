import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _RectElement, RectElementFields } from './RectElement';
import { InitRectNode, RectNode, RectNodeFields } from '../../../motionCanvasNodeTree/node/rectNode/RectNode';
import { Node as MotionCanvasNode } from '../../../motionCanvasNodeTree/node/Node';
import { Element } from '../Element';
import { Transformer } from '../../transformer/Transformer';
import { Position } from '../../../utilities/Position';
import { INode } from 'svgson';
import { RectElementAttributes } from './RectElementAttributesSchema';
import { StyleAttributes } from '../../styleAttribute/StyleAttributeParser';
import { InitNumericaExpressionFn, NumericalExpression } from '../../../utilities/numericalExpression/NumericalExpression';



t.test('constructor correctly assigns props to same-name fields', t => {
  const rects: {
    props: RectElementFields,
  }[] = [
      {
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
      },
      {
        props: {
          "id": "rect2",
          label: "red-fill-and-stroke-rect-square-sharp-corners",
          "width": 81.960045,
          "height": 81.960045,
          "x": 8.8836927,
          "y": 78.336815,
          "ry": 0,
          "fill": "#d40000",
          "fillOpacity": 1,
          "stroke": "#1300ff",
          "strokeWidth": 1.73211,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          children: [],
        },
      },
      {
        props: {
          "id": "rect3",
          "width": 44.620049,
          "height": 44.620049,
          "x": 7.3198247,
          "y": 167.9606,
          "ry": 10.748698,
          label: "yellow-fill-and-stroke-rect-square-rounded-corners",
          "fill": "#ffcc00",
          "fillOpacity": 1,
          "stroke": "#1300ff",
          "strokeWidth": 0.942981,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect4",
          "width": 44.620049,
          "height": 44.620049,
          "x": 7.3198218,
          "y": 218.05432,
          "ry": 22.310024,
          label: "brown-fill-and-stroke-rect-square-circular",
          "fill": "#c87137",
          "fillOpacity": 1,
          "stroke": "#1300ff",
          "strokeWidth": 0.942981,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect5",
          "width": 84.983978,
          "height": 20.706318,
          "x": 6.9583092,
          "y": 46.336018,
          "ry": 10.353159,
          label: "purple-fill-and-stroke-rect-x-long-rounded-corners",
          "fill": "#c83782",
          "fillOpacity": 1,
          "stroke": "#1300ff",
          "strokeWidth": 1.18864,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect6",
          "width": 33.072918,
          "height": 93.430992,
          "x": 56.762016,
          "y": 168.66684,
          "ry": 0,
          label: "blue-fill-and-stroke-rect-y-long-sharp-corners",
          "fill": "#37bbc8",
          "fillOpacity": 1,
          "stroke": "#1300ff",
          "strokeWidth": 1.328,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect7",
          "width": 85.706055,
          "height": 25.70767,
          "x": 195.82663,
          "y": 10.639688,
          label: "green-stroke-only-rect-x-long-sharp-corners",
          "fill": "none",
          "fillOpacity": 1,
          "stroke": "#2ca02c",
          "strokeWidth": 1.25184,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect8",
          "width": 56.121857,
          "height": 56.121857,
          "x": 207.88141,
          "y": 93.417191,
          "ry": 0,
          label: "red-stroke-only-rect-square-sharp-corners",
          "fill": "none",
          "fillOpacity": 1,
          "stroke": "#d40000",
          "strokeWidth": 10.55608125,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect9",
          "width": 31.228392,
          "height": 31.228392,
          "x": 199.78725,
          "y": 176.33945,
          "ry": 7.5227299,
          label: "yellow-stroke-only-rect-square-rounded-corners",
          "fill": "none",
          "fillOpacity": 1,
          "stroke": "#ffcc00",
          "strokeWidth": 13.1177,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect10",
          "width": 26.646238,
          "height": 26.646238,
          "x": 202.51251,
          "y": 227.94759,
          "ry": 13.323119,
          "rx": 13.323119,
          label: "brown-stroke-only-rect-square-circular",
          "fill": "none",
          "fillOpacity": 1,
          "stroke": "#c87137",
          "strokeWidth": 19.5042,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect11",
          "width": 83.472107,
          "height": 21.465435,
          "x": 196.5302,
          "y": 45.627014,
          "ry": 10.732718,
          label: "purple-stroke-only-rect-x-long-rounded-corners",
          "fill": "none",
          "fillOpacity": 1,
          "stroke": "#c83782",
          "strokeWidth": 4.14621,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
        props: {
          "id": "rect12",
          "width": 17.821806,
          "height": 75.46225,
          "x": 255.37695,
          "y": 181.09677,
          "ry": 0,
          label: "blue-stroke-only-rect-y-long-sharp-corners",
          "fill": "none",
          "fillOpacity": 1,
          "stroke": "#37bbc8",
          "strokeWidth": 22.449,
          "strokeLinecap": "round",
          "strokeLinejoin": "round",
          "strokeMiterlimit": 0,
          "strokeDasharray": "none",
          "strokeOpacity": 1,
          "paintOrder": "fill markers stroke",
          "children": []
        },
      },
      {
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
      },
      {
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
      },
      {
        props: {
          "id": "rect20",
          "width": 44.620049,
          "height": 44.620049,
          "x": 102.03346,
          "y": 183.74622,
          "ry": 10.748698,
          label: "yellow-fill-only-rect-square-rounded-corners",
          "fill": "#ffcc00",
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ];

  for (let i = 0; i < rects.length; i++) {

    interface InitRectNodeJacket {
      fn: InitRectNode
    }
    const initMotionCanvasRectNodeFnJacket = Substitute.for<InitRectNodeJacket>();

    interface InitNumericaExpressionFnJacket {
      fn: InitNumericaExpressionFn
    }
    const initNumericaExpressionJacket = Substitute.for<InitNumericaExpressionFnJacket>();

    const rectElement = new _RectElement({
      initMotionCanvasRectNodeFn: initMotionCanvasRectNodeFnJacket.fn,
      initNumericalExpressionFn: initNumericaExpressionJacket.fn,
    }, rects[i].props);

    // all the fields found on `rects[i].props`
    // are also found on `rectElement`
    for (let [k, v] of Object.entries(rects[i].props)) {
      const key = (rectElement as any)[k];
      t.equal(key, v, `at i=${i}: expected ${key} to equal ${v}`);
    }
  }

  t.end();
});

t.test('toMotionCanvasNodes correctly translates to MotionCanvasNode', t => {
  interface InitRectNodeJacket {
    fn: InitRectNode
  }
  const initMotionCanvasRectNodeFnJacket = Substitute.for<InitRectNodeJacket>();

  const childElement1 = Substitute.for<Element>();
  const childElement1MotionCanvasNode = Substitute.for<MotionCanvasNode>();
  childElement1.toMotionCanvasNodes().returns([childElement1MotionCanvasNode]);

  const childElement2 = Substitute.for<Element>();
  const childElement2MotionCanvasNode1 = Substitute.for<MotionCanvasNode>();
  const childElement2MotionCanvasNode2 = Substitute.for<MotionCanvasNode>();
  childElement2.toMotionCanvasNodes().returns([childElement2MotionCanvasNode1, childElement2MotionCanvasNode2]);

  const childElement3 = Substitute.for<Element>();
  const childElement3MotionCanvasNode = Substitute.for<MotionCanvasNode>();
  childElement3.toMotionCanvasNodes().returns([childElement3MotionCanvasNode]);


  const rectNodeFields = {
    refName: "green-fill-and-stroke-rect-x-long-sharp-corners",
    width: Substitute.for<NumericalExpression>(),
    height: Substitute.for<NumericalExpression>(),
    topLeft: [Substitute.for<NumericalExpression>(), Substitute.for<NumericalExpression>()],
    fill: "#2ca02c",
    stroke: "#1300ff",
    lineWidth: Substitute.for<NumericalExpression>(),
    children: [childElement1MotionCanvasNode,
      childElement2MotionCanvasNode1,
      childElement2MotionCanvasNode2,
      childElement3MotionCanvasNode] as MotionCanvasNode[],
  } as RectNodeFields;


  interface InitNumericaExpressionFnJacket {
    fn: InitNumericaExpressionFn
  }
  const initNumericaExpressionJacket = Substitute.for<InitNumericaExpressionFnJacket>();
  initNumericaExpressionJacket
    .fn(82.803673)
    .returns(rectNodeFields.width!);
  initNumericaExpressionJacket
    .fn(25.728548)
    .returns(rectNodeFields.height!);
  initNumericaExpressionJacket
    .fn(9.0465326)
    .returns(rectNodeFields.topLeft![0]);
  initNumericaExpressionJacket
    .fn(10.700179)
    .returns(rectNodeFields.topLeft![1]);
  initNumericaExpressionJacket
    .fn(1.23096)
    .returns(rectNodeFields.lineWidth!);


  initMotionCanvasRectNodeFnJacket
    .fn({ ...rectNodeFields })
    .returns({ ...rectNodeFields } as RectNode);


  const rectElement = new _RectElement({
    initMotionCanvasRectNodeFn: initMotionCanvasRectNodeFnJacket.fn,
    initNumericalExpressionFn: initNumericaExpressionJacket.fn,
  }, {
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
    "children": [childElement1, childElement2, childElement3],
  } as RectElementFields);

  const found = rectElement.toMotionCanvasNodes();
  const wanted = [{ ...rectNodeFields } as RectNode];

  // start internal test

  initNumericaExpressionJacket
    .received()
    .fn(82.803673);
  initNumericaExpressionJacket
    .received()
    .fn(25.728548);
  initNumericaExpressionJacket
    .received()
    .fn(9.0465326);
  initNumericaExpressionJacket
    .received()
    .fn(10.700179);
  initNumericaExpressionJacket
    .received()
    .fn(1.23096);

  initMotionCanvasRectNodeFnJacket
    .received()
    .fn({ ...rectNodeFields });

  // end internal test

  t.same(found, wanted);
  t.pass();
  t.end();
});


t.test('toMotionCanvasNodes correctly translates to MotionCanvasNode when there\'s a transformer', t => {
  interface InitRectNodeJacket {
    fn: InitRectNode
  }
  const initMotionCanvasRectNodeFnJacket = Substitute.for<InitRectNodeJacket>();

  const childElement1 = Substitute.for<Element>();
  const childElement1MotionCanvasNode = Substitute.for<MotionCanvasNode>();
  childElement1.toMotionCanvasNodes().returns([childElement1MotionCanvasNode]);

  const childElement2 = Substitute.for<Element>();
  const childElement2MotionCanvasNode1 = Substitute.for<MotionCanvasNode>();
  const childElement2MotionCanvasNode2 = Substitute.for<MotionCanvasNode>();
  childElement2.toMotionCanvasNodes().returns([childElement2MotionCanvasNode1, childElement2MotionCanvasNode2]);

  const childElement3 = Substitute.for<Element>();
  const childElement3MotionCanvasNode = Substitute.for<MotionCanvasNode>();
  childElement3.toMotionCanvasNodes().returns([childElement3MotionCanvasNode]);

  const rectNodeFields = {
    refName: "green-fill-and-stroke-rect-x-long-sharp-corners",
    width: Substitute.for<NumericalExpression>(),
    height: Substitute.for<NumericalExpression>(),
    topLeft: [Substitute.for<NumericalExpression>(), Substitute.for<NumericalExpression>()],
    fill: "#2ca02c",
    stroke: "#1300ff",
    lineWidth: Substitute.for<NumericalExpression>(),
    children: [childElement1MotionCanvasNode,
      childElement2MotionCanvasNode1,
      childElement2MotionCanvasNode2,
      childElement3MotionCanvasNode] as MotionCanvasNode[],
  } as RectNodeFields;


  const transformer = Substitute.for<Transformer>();

  const transformedRectNodeFields = {
    width: rectNodeFields.width,
    height: rectNodeFields.height,
    topLeft: [
      rectNodeFields.topLeft![0],
      rectNodeFields.topLeft![1]
    ] as Position<NumericalExpression>,
    lineWidth: rectNodeFields.lineWidth,
  };

  transformer
    .applyToScalar(82.803673)
    .returns(transformedRectNodeFields.width!);
  transformer
    .applyToScalar(25.728548)
    .returns(transformedRectNodeFields.height!);
  transformer
    .applyToPosition([9.0465326, 10.700179])
    .returns(transformedRectNodeFields.topLeft);
  transformer
    .applyToScalar(1.23096)
    .returns(transformedRectNodeFields.lineWidth!);

  interface InitNumericaExpressionFnJacket {
    fn: InitNumericaExpressionFn
  }
  const initNumericaExpressionJacket = Substitute.for<InitNumericaExpressionFnJacket>();

  initMotionCanvasRectNodeFnJacket
    .fn({ ...rectNodeFields, ...transformedRectNodeFields } as RectNodeFields)
    .returns({ ...rectNodeFields, ...transformedRectNodeFields } as RectNode);


  const rectElement = new _RectElement({
    initMotionCanvasRectNodeFn: initMotionCanvasRectNodeFnJacket.fn,
    initNumericalExpressionFn: initNumericaExpressionJacket.fn,
  }, {
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
    "children": [childElement1, childElement2, childElement3],
    transformer,
  } as RectElementFields);

  const found = rectElement.toMotionCanvasNodes();
  const wanted = [{ ...rectNodeFields, ...transformedRectNodeFields } as RectNode];

  // start internal test

  transformer
    .received()
    .applyToScalar(82.803673);
  transformer
    .received()
    .applyToScalar(25.728548);
  transformer
    .received()
    .applyToPosition([9.0465326, 10.700179]);
  transformer
    .received()
    .applyToScalar(1.23096);

  initMotionCanvasRectNodeFnJacket
    .received()
    .fn({ ...rectNodeFields, ...transformedRectNodeFields } as RectNode);

  // end internal test

  t.same(found, wanted);
  t.pass();
  t.end();
});
