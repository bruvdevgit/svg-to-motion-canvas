import t from 'tap';
import { Substitute } from '@fluffy-spoon/substitute';
import { _Transformer, AddForUserlandConversionFnArgs } from './Transformer';
import { TransformAttributeParser } from './TransformAttributeParser';
import { TransformDefinition } from './transformDefinition/TransformDefinition';
import { Position } from '../../utilities/Position';
import { InitNumericaExpressionFn, NumericalExpression } from '../../utilities/numericalExpression/NumericalExpression';
import { InitTranslateFn } from './transformDefinition/translate/Translate';
import { InitScaleFn } from './transformDefinition/scale/Scale';

t.test('addFromTransformAttribute works', t => {
  const transformAttributeParser = Substitute.for<TransformAttributeParser>();
  const initNumericalExpressionFn = Substitute.for<InitNumericaExpressionFn>();

  interface InitTranslateFnJacket {
    fn: InitTranslateFn
  }
  const initTranslateFnJacket = Substitute.for<InitTranslateFnJacket>();

  interface InitScaleFnJacket {
    fn: InitScaleFn
  }
  const initScaleFnJacket = Substitute.for<InitScaleFnJacket>();

  const matrix = "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)";

  const newTransformDefintion1 = Substitute.for<TransformDefinition>();
  const newTransformDefintion2 = Substitute.for<TransformDefinition>();

  transformAttributeParser.parse(matrix)
    .returns([newTransformDefintion1,
      newTransformDefintion2,]);

  const transformDefintionAlreadyThere = Substitute.for<TransformDefinition>();

  const resultTransformer = new _Transformer({
    transformAttributeParser,
    initNumericalExpressionFn,
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
  }, [transformDefintionAlreadyThere,
    newTransformDefintion1,
    newTransformDefintion2,]);

  const transformer = new _Transformer({
    transformAttributeParser,
    initNumericalExpressionFn,
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
  }, [transformDefintionAlreadyThere]);

  const found = transformer.addFromTransformAttribute(matrix);
  const wanted = resultTransformer;

  t.same(found, wanted);
  t.equal(transformer === wanted, false, 'a new Transformer must be returned');
  t.end();
});

t.test('addForUserlandConversion works', t => {
  const transformAttributeParser = Substitute.for<TransformAttributeParser>();

  interface InitNumericaExpressionFnJacket {
    fn: InitNumericaExpressionFn
  }
  const initNumericalExpressionFnJacket
    = Substitute.for<InitNumericaExpressionFnJacket>();

  interface InitTranslateFnJacket {
    fn: InitTranslateFn
  }
  const initTranslateFnJacket = Substitute.for<InitTranslateFnJacket>();

  interface InitScaleFnJacket {
    fn: InitScaleFn
  }
  const initScaleFnJacket = Substitute.for<InitScaleFnJacket>();

  const userlandConversionConfig:
    AddForUserlandConversionFnArgs = {
    scaleFactor: 2.54, centerPoint: [92, -1923]
  }

  const userlandConversionConfigNumericalExpression = {
    centerPoint: [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>()
    ]
  };

  const lastTransformDefinition1 = Substitute.for<TransformDefinition>();
  initScaleFnJacket
    .fn({
      scaleX: userlandConversionConfig
        .scaleFactor,
      scaleY: userlandConversionConfig
        .scaleFactor
    })
    .returns(lastTransformDefinition1);


  initNumericalExpressionFnJacket
    .fn(userlandConversionConfig.centerPoint[0])
    .returns(userlandConversionConfigNumericalExpression
      .centerPoint[0])
  initNumericalExpressionFnJacket
    .fn(userlandConversionConfig.centerPoint[1])
    .returns(userlandConversionConfigNumericalExpression
      .centerPoint[1])

  const lastTransformDefinition2 = Substitute.for<TransformDefinition>();
  initTranslateFnJacket
    .fn({
      translateX: userlandConversionConfigNumericalExpression
        .centerPoint[0],
      translateY: userlandConversionConfigNumericalExpression
        .centerPoint[1]
    })
    .returns(lastTransformDefinition2);


  const resultTransformer = new _Transformer({
    transformAttributeParser,
    initNumericalExpressionFn: initNumericalExpressionFnJacket.fn,
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
  }, [], [
    lastTransformDefinition1,
    lastTransformDefinition2,],);

  const previousLastDefinition = Substitute.for<TransformDefinition>();

  const transformer = new _Transformer({
    transformAttributeParser,
    initNumericalExpressionFn: initNumericalExpressionFnJacket.fn,
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
  }, [], [previousLastDefinition]);

  const found = transformer.addForUserlandConversion({ ...userlandConversionConfig });
  const wanted = resultTransformer;

  // start testing internal calls

  initScaleFnJacket
    .received()
    .fn({
      scaleX: userlandConversionConfig
        .scaleFactor,
      scaleY: userlandConversionConfig
        .scaleFactor
    });

  initNumericalExpressionFnJacket
    .received()
    .fn(userlandConversionConfig.centerPoint[0])
  initNumericalExpressionFnJacket
    .received()
    .fn(userlandConversionConfig.centerPoint[1])

  initTranslateFnJacket
    .received()
    .fn({
      translateX: userlandConversionConfigNumericalExpression
        .centerPoint[0],
      translateY: userlandConversionConfigNumericalExpression
        .centerPoint[1]
    });

  // end testing internal calls

  t.equal((found as _Transformer).lastDefinitions[0], wanted.lastDefinitions[0]);
  t.not((found as _Transformer).lastDefinitions[0], previousLastDefinition);

  // testing one side
  t.equal(wanted.lastDefinitions[1], lastTransformDefinition2);

  // TODO: make this work
  //t.equal((found as _Transformer).lastDefinitions[1], wanted.lastDefinitions[1]);

  t.equal((found as _Transformer).lastDefinitions.length
    === wanted.lastDefinitions.length
    && wanted.lastDefinitions.length == 2, true);

  //t.same((found as _Transformer).lastDefinitions, wanted.lastDefinitions);
  t.equal(transformer == wanted, false,
    'a new Transformer must be returned');
  t.end();
});

t.test('applyToPosition works', t => {
  const transformAttributeParser = Substitute.for<TransformAttributeParser>();
  interface InitTranslateFnJacket {
    fn: InitTranslateFn
  }
  const initTranslateFnJacket = Substitute.for<InitTranslateFnJacket>();

  interface InitScaleFnJacket {
    fn: InitScaleFn
  }
  const initScaleFnJacket = Substitute.for<InitScaleFnJacket>();

  interface InitNumericaExpressionFnJacket {
    fn: InitNumericaExpressionFn
  }
  const initNumericalExpressionFnJacket
    = Substitute.for<InitNumericaExpressionFnJacket>();

  const positionStart: Position<number> = [1, 2];
  const positionSteps: Position<NumericalExpression>[] = [
    [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>(),
    ],
    [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>(),
    ],
    [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>(),
    ],
    [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>(),
    ],
    [
      Substitute.for<NumericalExpression>(),
      Substitute.for<NumericalExpression>(),
    ],
  ];

  initNumericalExpressionFnJacket
    .fn(positionStart[0])
    .returns(positionSteps[0][0]);
  initNumericalExpressionFnJacket
    .fn(positionStart[1])
    .returns(positionSteps[0][1]);

  const transformDefintion1 = Substitute.for<TransformDefinition>();
  const transformDefintion2 = Substitute.for<TransformDefinition>();
  const lastTransformDefinition1 = Substitute.for<TransformDefinition>();
  const lastTransformDefinition2 = Substitute.for<TransformDefinition>();

  transformDefintion1.applyToPosition(positionSteps[0])
    .returns(positionSteps[1]);

  transformDefintion2.applyToPosition(positionSteps[1])
    .returns(positionSteps[2]);

  lastTransformDefinition1.applyToPosition(positionSteps[2])
    .returns(positionSteps[3]);

  lastTransformDefinition2.applyToPosition(positionSteps[3])
    .returns(positionSteps[4]);

  const transformer = new _Transformer({
    transformAttributeParser,
    initNumericalExpressionFn: initNumericalExpressionFnJacket.fn,
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
  }, [transformDefintion1,
    transformDefintion2,],
    [lastTransformDefinition1,
      lastTransformDefinition2]);

  const found = transformer.applyToPosition(positionStart);
  const wanted = positionSteps[4];

  // start testing internal calls

  initNumericalExpressionFnJacket
    .received()
    .fn(positionStart[0]);
  initNumericalExpressionFnJacket
    .received()
    .fn(positionStart[1]);

  transformDefintion1
    .received().applyToPosition(positionSteps[0]);

  transformDefintion2
    .received().applyToPosition(positionSteps[1]);

  lastTransformDefinition1
    .received().applyToPosition(positionSteps[2]);

  lastTransformDefinition2
    .received().applyToPosition(positionSteps[3]);
  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

t.test('applyToScalar works', t => {
  const transformAttributeParser = Substitute.for<TransformAttributeParser>();
  interface InitTranslateFnJacket {
    fn: InitTranslateFn
  }
  const initTranslateFnJacket = Substitute.for<InitTranslateFnJacket>();

  interface InitScaleFnJacket {
    fn: InitScaleFn
  }
  const initScaleFnJacket = Substitute.for<InitScaleFnJacket>();


  interface InitNumericaExpressionFnJacket {
    fn: InitNumericaExpressionFn
  }
  const initNumericalExpressionFnJacket
    = Substitute.for<InitNumericaExpressionFnJacket>();

  const scalarStart: number = -23;
  const scalarSteps: NumericalExpression[] = [
    Substitute.for<NumericalExpression>(),
    Substitute.for<NumericalExpression>(),
    Substitute.for<NumericalExpression>(),
    Substitute.for<NumericalExpression>(),
    Substitute.for<NumericalExpression>(),
  ];

  initNumericalExpressionFnJacket
    .fn(scalarStart)
    .returns(scalarSteps[0]);

  const transformDefintion1 = Substitute.for<TransformDefinition>();
  const transformDefintion2 = Substitute.for<TransformDefinition>();
  const lastTransformDefinition1 = Substitute.for<TransformDefinition>();
  const lastTransformDefinition2 = Substitute.for<TransformDefinition>();

  transformDefintion1.applyToScalar(scalarSteps[0])
    .returns(scalarSteps[1]);

  transformDefintion2.applyToScalar(scalarSteps[1])
    .returns(scalarSteps[2]);

  lastTransformDefinition1.applyToScalar(scalarSteps[2])
    .returns(scalarSteps[3]);

  lastTransformDefinition2.applyToScalar(scalarSteps[3])
    .returns(scalarSteps[4]);

  const transformer = new _Transformer({
    transformAttributeParser,
    initNumericalExpressionFn: initNumericalExpressionFnJacket.fn,
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
  }, [transformDefintion1,
    transformDefintion2,],
    [lastTransformDefinition1,
      lastTransformDefinition2]);

  const found = transformer.applyToScalar(scalarStart);
  const wanted = scalarSteps[4];

  // start testing internal calls

  initNumericalExpressionFnJacket
    .received()
    .fn(scalarStart);

  transformDefintion1
    .received().applyToScalar(scalarSteps[0]);

  transformDefintion2
    .received().applyToScalar(scalarSteps[1]);

  lastTransformDefinition1
    .received().applyToScalar(scalarSteps[2]);

  lastTransformDefinition2
    .received().applyToScalar(scalarSteps[3]);
  // end testing internal calls

  t.same(found, wanted);
  t.end();
});
