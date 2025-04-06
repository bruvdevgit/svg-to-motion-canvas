import t from 'tap';
import { _InkscapeSVG, InkscapeSVGFields, ViewBox } from './InkscapeSVG';
import { InitMotionCanvasNodeTreeFn, MotionCanvasNodeTree, MotionCanvasNodeTreeFields } from '../motionCanvasNodeTree/MotionCanvasNodeTree';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _RectElement, RectElementFields } from './element/rectElement/RectElement';
import { InitMotionCanvasNodesListFn, MotionCanvasNodesList } from '../motionCanvasNodeTree/MotionCanvasNodesList';
import { InitRectNode, RectNode } from '../motionCanvasNodeTree/node/rectNode/RectNode';
import { Element } from './element/Element';
import { Node } from '../motionCanvasNodeTree/node/Node';


//const producedMotionCanvasRectNodes = [
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//  Substitute.for<RectNode>(),
//];
//
//const rectInkscapeSVGElements = [
//  Substitute.for<Element>(),
//  Substitute.for<Element>(),
//  Substitute.for<Element>(),
//  Substitute.for<Element>(),
//  Substitute.for<Element>(),
//  Substitute.for<Element>(),
//  Substitute.for<Element>(),
//];
//

const inkscapeSVGElements = [
  {
    element: Substitute.for<Element>(),
    motionCanvasNodes: [
      Substitute.for<RectNode>(),
      Substitute.for<RectNode>(),
      Substitute.for<RectNode>(),
      Substitute.for<RectNode>(),
    ],
  },
  {
    element: Substitute.for<Element>(),
    motionCanvasNodes: [
      Substitute.for<RectNode>(),
    ],
  },
]


const rectInkscapeSVG: InkscapeSVGFields = {
  width: 1920,
  height: 1080,
  viewBox: {
    minX: 0,
    minY: 0,
    width: 508,
    height: 285.75,
  } as ViewBox,
  elements: [
    ...(inkscapeSVGElements.map(elem => elem.element))
  ],
};

t.test('constructor correctly assigns props to same-name fields', t => {

  interface InitMotionCanvasNodeTreeFnJacket {
    fn: InitMotionCanvasNodeTreeFn
  }
  const initMotionCanvasNodeTreeJacket
    = Substitute.for<InitMotionCanvasNodeTreeFnJacket>();

  interface InitMotionCanvasNodesListFnJacket {
    fn: InitMotionCanvasNodesListFn
  }
  const initMotionCanvasNodesListFnJacket
    = Substitute.for<InitMotionCanvasNodesListFnJacket>();

  const inkscapeSVG = new _InkscapeSVG({
    initMotionCanvasNodeTreeFn: initMotionCanvasNodeTreeJacket.fn,
    initMotionCanvasNodesList: initMotionCanvasNodesListFnJacket.fn,
  }, rectInkscapeSVG);

  // all the fields found on `rects[i].props`
  // are also found on `rectElement`
  for (let [k, v] of Object.entries(rectInkscapeSVG)) {
    const key = (inkscapeSVG as any)[k];
    t.equal(key, v, `expected ${key} to equal ${v}`);
  }
  t.end();
});

t.test('toMotionCanvasNodeTree correctly creates using initMotionCanvasNodeTreeFn', t => {
  for (let i = 0; i < inkscapeSVGElements.length; i++) {
    const { element, motionCanvasNodes } = inkscapeSVGElements[i];
    element
      .toMotionCanvasNodes()
      .returns(motionCanvasNodes);
  }

  const producedMotionCanvasNodes: Node[]
    = inkscapeSVGElements
      .map(e => e.motionCanvasNodes).flat();

  interface InitMotionCanvasNodeTreeFnJacket {
    fn: InitMotionCanvasNodeTreeFn
  }
  const initMotionCanvasNodeTreeJacket
    = Substitute.for<InitMotionCanvasNodeTreeFnJacket>();

  interface InitMotionCanvasNodesListFnJacket {
    fn: InitMotionCanvasNodesListFn
  }
  const initMotionCanvasNodesListFnJacket
    = Substitute.for<InitMotionCanvasNodesListFnJacket>();

  const nodesList = Substitute.for<MotionCanvasNodesList>();

  initMotionCanvasNodesListFnJacket
    .fn(producedMotionCanvasNodes)
    .returns(nodesList);

  const motionCanvasNodeTree = Substitute.for<MotionCanvasNodeTree>();

  const nodeTreeFields: MotionCanvasNodeTreeFields = {
    nodes: nodesList,
    canvasHeight: 1080,
    canvasWidth: 1920,
  };

  initMotionCanvasNodeTreeJacket
    .fn(nodeTreeFields)
    .returns(motionCanvasNodeTree);

  const inkscapeSVG = new _InkscapeSVG({
    initMotionCanvasNodeTreeFn: initMotionCanvasNodeTreeJacket.fn,
    initMotionCanvasNodesList: initMotionCanvasNodesListFnJacket.fn,
  }, rectInkscapeSVG);

  const found = inkscapeSVG.toMotionCanvasNodeTree();
  const wanted = motionCanvasNodeTree;

  // start testing internal calls

  initMotionCanvasNodesListFnJacket
    .received()
    .fn(producedMotionCanvasNodes);

  initMotionCanvasNodeTreeJacket
    .received()
    .fn(nodeTreeFields);

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});
