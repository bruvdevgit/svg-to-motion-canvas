import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { INode } from 'svgson';
import { _TransformAttributeParser } from './TransformAttributeParser';
import { InitTransformerFn, Transformer, } from './Transformer';
import { TransformDefinitionFactory } from './transformDefinition/TransformDefinitionFactory';
import { TransformDefinition } from './transformDefinition/TransformDefinition';

t.test('parse works', t => {
  const translateTransformDefinition = Substitute.for<TransformDefinition>();
  const scaleXTransformDefinition = Substitute.for<TransformDefinition>();

  const scaleX = 3.278713;
  const scaleY = 3.278713;
  //const rotation = 0;
  //const skewX = 0;
  const translateX = 37.280179;
  const translateY = -232.59381;

  const transformDefinitionFactory = Substitute.for<TransformDefinitionFactory>();
  transformDefinitionFactory
    .init({
      translateX,
      translateY,
    })
    .returns(translateTransformDefinition);
  transformDefinitionFactory
    .init({
      scaleX,
      scaleY,
    })
    .returns(scaleXTransformDefinition);

  const matrix = "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)";

  const transformerParser = new _TransformAttributeParser({
    transformDefinitionFactory,
  });

  const found = transformerParser.parse(matrix);
  const wanted = [
    translateTransformDefinition,
    scaleXTransformDefinition,
  ];

  // start testing internal calls

  transformDefinitionFactory
    .received()
    .init({
      translateX,
      translateY,
    });
  transformDefinitionFactory
    .received()
    .init({
      scaleX,
      scaleY,
    });

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

