import t from 'tap';
import { Arg, Substitute, SubstituteOf } from '@fluffy-spoon/substitute';
import { RectNode, RectNodeFields, _RectNode } from './RectNode';
import { JSXComponentFactory } from '../jsxComponent/JSXComponentFactory';
import { PropFactory as JSXComponentPropFactory } from '../jsxComponent/prop/PropFactory';
import { JSXComponent } from '../jsxComponent/JSXComponent';
import { Prop as JSXComponentProp } from '../jsxComponent/prop/Prop';
import { PropFields as JSXComponentPropFields } from '../jsxComponent/prop/Prop';
import { CamelCaseWrapper } from '../../../wrappers/CamelCaseWrapper';
import { NodeReference } from '../../MotionCanvasCodeRenderer';
import { Node } from '../Node';
import { NumericalExpression } from '../../../utilities/numericalExpression/NumericalExpression';

//TODO: write a spec like this but with different fields excluded
t.test('toJSXComponent correctly builds JSXComponent with no children', t => {
  const jsxComponentFactory = Substitute.for<JSXComponentFactory>();
  const jsxComponentPropFactory = Substitute.for<JSXComponentPropFactory>();
  const camelCaseWrapper = Substitute.for<CamelCaseWrapper>();

  const fields: RectNodeFields = {
    refName: 'brown-fill-and-stroke-rect-square-circular',
    width: Substitute.for<NumericalExpression>(),
    height: Substitute.for<NumericalExpression>(),
    topLeft: [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>()
    ],
    fill: '#c87137',
    stroke: 'none',
    lineWidth: Substitute.for<NumericalExpression>(),
    radius: Substitute.for<NumericalExpression>(),
    children: [] as RectNode[]
  };

  (fields.width! as SubstituteOf<NumericalExpression>)
    .getString()
    .returns('width str');

  (fields.height! as SubstituteOf<NumericalExpression>)
    .getString()
    .returns('height str');

  (fields.topLeft![0] as SubstituteOf<NumericalExpression>)
    .getString()
    .returns('topLeft[0] str');

  (fields.topLeft![1] as SubstituteOf<NumericalExpression>)
    .getString()
    .returns('topLeft[1] str');

  (fields.lineWidth! as SubstituteOf<NumericalExpression>)
    .getString()
    .returns('lineWidth str');

  (fields.radius! as SubstituteOf<NumericalExpression>)
    .getString()
    .returns('radius str');

  const items: {
    field: JSXComponentPropFields,
    prop: SubstituteOf<JSXComponentProp>
  }[] = [
      {
        field: {
          key: 'ref',
          value: 'brown-fill-and-stroke-rect-square-circular',
          removeQuotesFromValue: true,
          turnValueToCamelCase: true,
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
      {
        field: {
          key: 'width',
          value: 'width str',
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
      {
        field: {
          key: 'height',
          value: 'height str',
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
      {
        field: {
          key: 'topLeft',
          value: ['topLeft[0] str', 'topLeft[1] str'],
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
      {
        field: {
          key: 'fill',
          value: '#c87137',
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
      {
        field: {
          key: 'lineWidth',
          value: 'lineWidth str',
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
      {
        field: {
          key: 'radius',
          value: 'radius str',
        } as JSXComponentPropFields,
        prop: Substitute.for<JSXComponentProp>(),
      },
    ];

  for (let i = 0; i < items.length; i++) {
    jsxComponentPropFactory
      .init({ ...items[i].field })
      .returns({ ...items[i].prop });
  }

  const resultJSXComponent = {
    commentLabel: 'brown-fill-and-stroke-rect-square-circular',
    name: "Rect",
    props: items.map(item => item.prop),
    children: [],
    toFileContentString: () => 'return',
    getReferenceVariableName: () => 'return2',
  } as JSXComponent;

  jsxComponentFactory
    .init({
      commentLabel: 'brown-fill-and-stroke-rect-square-circular',
      name: "Rect",
      props: [...items.map(item => ({ ...item.prop }))],
      children: [],
    })
    .returns({ ...resultJSXComponent });

  const rectNode = new _RectNode(
    {
      camelCaseWrapper,
      jsxComponentFactory,
      jsxComponentPropFactory,
    },
    fields,
  );

  const found = rectNode.toJSXComponent();
  const wanted = { ...resultJSXComponent };

  // start test internal calls
  for (let i = 0; i < items.length; i++) {
    jsxComponentPropFactory
      .received()
      .init({ ...items[i].field });
  };

  jsxComponentFactory
    .received()
    .init({
      commentLabel: 'brown-fill-and-stroke-rect-square-circular',
      name: "Rect",
      props: [...items.map(item => ({ ...item.prop }))],
      children: [],
    });

  // end test internal calls

  t.same(found, wanted);
  t.end();
});

t.test('getReference correctly gives the reference with no children', t => {
  const jsxComponentFactory = Substitute.for<JSXComponentFactory>();
  const jsxComponentPropFactory = Substitute.for<JSXComponentPropFactory>();
  const camelCaseWrapper = Substitute.for<CamelCaseWrapper>();

  camelCaseWrapper
    .parse('brown-fill-and-stroke-rect-square-circular')
    .returns('brownFillAndStrokeRectSquareCircular');

  const fields: RectNodeFields = {
    refName: 'brown-fill-and-stroke-rect-square-circular',
    width: Substitute.for<NumericalExpression>(),
    height: Substitute.for<NumericalExpression>(),
    topLeft: [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>()
    ],
    fill: '#c87137',
    stroke: '#1300ff',
    lineWidth: Substitute.for<NumericalExpression>(),
    radius: Substitute.for<NumericalExpression>(),
    children: [] as RectNode[]
  };

  const rectNode = new _RectNode(
    {
      camelCaseWrapper,
      jsxComponentFactory,
      jsxComponentPropFactory,
    },
    fields
  );

  const found = rectNode.getReferences();
  const wanted = [{
    variableName: 'brownFillAndStrokeRectSquareCircular',
    type: 'Rect',
  } as NodeReference];


  // start call tests

  camelCaseWrapper
    .received()
    .parse('brown-fill-and-stroke-rect-square-circular');

  // stop call tests

  t.same(found, wanted);
  t.end();
});


t.test('getReference correctly gives the reference recursively with children', t => {
  // start preparing children

  const child1 = Substitute.for<Node>();
  child1.getReferences().returns([
    {
      variableName: 'child1Variable',
      type: 'Child1Type',
    } as NodeReference,
  ]);

  const child2 = Substitute.for<Node>();
  child2.getReferences().returns([
    {
      variableName: 'child2Variable',
      type: 'Child2Type',
    } as NodeReference,
    {
      variableName: 'child2Variable2',
      type: 'Child2Type2',
    } as NodeReference,
  ]);

  const child3 = Substitute.for<Node>();
  child3.getReferences().returns([
    {
      variableName: 'child3Variable',
      type: 'Child3Type',
    } as NodeReference,
    {
      variableName: 'child3Variable2',
      type: 'Child3Type2',
    } as NodeReference,
    {
      variableName: 'child3Variable3',
      type: 'Child3Type3',
    } as NodeReference,
  ]);

  // done preparing children


  const fields: RectNodeFields = {
    refName: 'brown-fill-and-stroke-rect-square-circular',
    width: Substitute.for<NumericalExpression>(),
    height: Substitute.for<NumericalExpression>(),
    topLeft: [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>()
    ],
    fill: '#c87137',
    stroke: '#1300ff',
    lineWidth: Substitute.for<NumericalExpression>(),
    radius: Substitute.for<NumericalExpression>(),
    children: [child1, child2, child3] as Node[],
  };

  const jsxComponentFactory = Substitute.for<JSXComponentFactory>();
  const jsxComponentPropFactory = Substitute.for<JSXComponentPropFactory>();
  const camelCaseWrapper = Substitute.for<CamelCaseWrapper>();

  camelCaseWrapper
    .parse('brown-fill-and-stroke-rect-square-circular')
    .returns('brownFillAndStrokeRectSquareCircular');

  const rectNode = new _RectNode(
    {
      camelCaseWrapper,
      jsxComponentFactory,
      jsxComponentPropFactory,
    },
    fields
  );

  const found = rectNode.getReferences();
  const wanted = [
    {
      variableName: 'brownFillAndStrokeRectSquareCircular',
      type: 'Rect',
    } as NodeReference,
    {
      variableName: 'child1Variable',
      type: 'Child1Type',
    } as NodeReference,
    {
      variableName: 'child2Variable',
      type: 'Child2Type',
    } as NodeReference,
    {
      variableName: 'child2Variable2',
      type: 'Child2Type2',
    } as NodeReference,
    {
      variableName: 'child3Variable',
      type: 'Child3Type',
    } as NodeReference,
    {
      variableName: 'child3Variable2',
      type: 'Child3Type2',
    } as NodeReference,
    {
      variableName: 'child3Variable3',
      type: 'Child3Type3',
    } as NodeReference,
  ];


  // start call tests

  camelCaseWrapper
    .received()
    .parse('brown-fill-and-stroke-rect-square-circular');

  // stop call tests

  t.same(found, wanted);
  t.end();
});
