import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _Transformer, AddForUserlandConversionFnArgs } from './Transformer';
import { TransformAttributeParser } from './TransformAttributeParser';
import { TransformDefinitionFactory } from './transformDefinition/TransformDefinitionFactory';
import { TransformDefinition } from './transformDefinition/TransformDefinition';

t.test('addFromTransformAttribute works', t => {
  const transformAttributeParser = Substitute.for<TransformAttributeParser>();
  const transformDefinitionFactory = Substitute.for<TransformDefinitionFactory>();

  const matrix = "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)";

  const newTransformDefintion1 = Substitute.for<TransformDefinition>();
  const newTransformDefintion2 = Substitute.for<TransformDefinition>();

  transformAttributeParser.parse(matrix)
    .returns([newTransformDefintion1,
      newTransformDefintion2,]);

  const transformDefintionAlreadyThere = Substitute.for<TransformDefinition>();

  const resultTransformer = new _Transformer({
    transformAttributeParser,
    transformDefinitionFactory,
  }, [transformDefintionAlreadyThere,
    newTransformDefintion1,
    newTransformDefintion2,]);

  const transformer = new _Transformer({
    transformAttributeParser,
    transformDefinitionFactory,
  }, [transformDefintionAlreadyThere]);

  const found = transformer.addFromTransformAttribute(matrix);
  const wanted = resultTransformer;

  t.same(found, wanted);
  t.equal(transformer === wanted, false, 'a new Transformer must be returned');
  t.end();
});

t.test('addForUserlandConversion works', t => {
  const transformAttributeParser = Substitute.for<TransformAttributeParser>();
  const transformDefinitionFactory = Substitute.for<TransformDefinitionFactory>();

  const userlandConversionConfig:
    AddForUserlandConversionFnArgs = {
    scaleFactor: 2.54, centerPoint: [92, -1923]
  }

  const lastTransformDefinition1 = Substitute.for<TransformDefinition>();
  transformDefinitionFactory.init({
    scaleX: userlandConversionConfig.scaleFactor,
    scaleY: userlandConversionConfig.scaleFactor,
  })
    .returns(lastTransformDefinition1);

  const lastTransformDefinition2 = Substitute.for<TransformDefinition>();
  transformDefinitionFactory.init({
    translateX: userlandConversionConfig.scaleFactor[0],
    translateY: userlandConversionConfig.scaleFactor[1],
  })
    .returns(lastTransformDefinition2);

  const resultTransformer = new _Transformer({
    transformAttributeParser,
    transformDefinitionFactory,
  }, [], [
    lastTransformDefinition1,
    lastTransformDefinition2,],);

  const previousLastDefinition = Substitute.for<TransformDefinition>();

  const transformer = new _Transformer({
    transformAttributeParser,
    transformDefinitionFactory,
  }, [], [previousLastDefinition]);

  const found = transformer.addForUserlandConversion({ ...userlandConversionConfig });
  const wanted = resultTransformer;

  // start testing internal calls
  transformDefinitionFactory
    .received()
    .init({
      scaleX: userlandConversionConfig.scaleFactor,
      scaleY: userlandConversionConfig.scaleFactor,
    });

  transformDefinitionFactory
    .received()
    .init({
      translateX: userlandConversionConfig.scaleFactor[0],
      translateY: userlandConversionConfig.scaleFactor[1],
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
  const transformDefinitionFactory = Substitute.for<TransformDefinitionFactory>();

  const positionSteps: [number, number][] = [
    [1, 2], [-3, 11], [12, 42], [-1299, 0], [-99, -99]
  ];

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
    transformDefinitionFactory,
  }, [transformDefintion1,
    transformDefintion2,],
    [lastTransformDefinition1,
      lastTransformDefinition2]);

  const found = transformer.applyToPosition(positionSteps[0]);
  const wanted = positionSteps[4];

  // start testing internal calls

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
  const transformDefinitionFactory = Substitute.for<TransformDefinitionFactory>();

  const positionSteps: number[] = [2, -3, 42, 0, -99,];

  const transformDefintion1 = Substitute.for<TransformDefinition>();
  const transformDefintion2 = Substitute.for<TransformDefinition>();
  const lastTransformDefinition1 = Substitute.for<TransformDefinition>();
  const lastTransformDefinition2 = Substitute.for<TransformDefinition>();

  transformDefintion1.applyToScalar(positionSteps[0])
    .returns(positionSteps[1]);

  transformDefintion2.applyToScalar(positionSteps[1])
    .returns(positionSteps[2]);

  lastTransformDefinition1.applyToScalar(positionSteps[2])
    .returns(positionSteps[3]);

  lastTransformDefinition2.applyToScalar(positionSteps[3])
    .returns(positionSteps[4]);

  const transformer = new _Transformer({
    transformAttributeParser,
    transformDefinitionFactory,
  }, [transformDefintion1,
    transformDefintion2,],
    [lastTransformDefinition1,
      lastTransformDefinition2]);

  const found = transformer.applyToScalar(positionSteps[0]);
  const wanted = positionSteps[4];

  // start testing internal calls

  transformDefintion1
    .received().applyToScalar(positionSteps[0]);

  transformDefintion2
    .received().applyToScalar(positionSteps[1]);

  lastTransformDefinition1
    .received().applyToScalar(positionSteps[2]);

  lastTransformDefinition2
    .received().applyToScalar(positionSteps[3]);
  // end testing internal calls

  t.same(found, wanted);
  t.end();
});
