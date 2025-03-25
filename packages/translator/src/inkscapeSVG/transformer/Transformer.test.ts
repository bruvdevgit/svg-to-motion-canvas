import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _Transformer } from './Transformer';
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
  t.equal(transformer === wanted, true, 'a new Transformer must be returned');
  t.end();
});
