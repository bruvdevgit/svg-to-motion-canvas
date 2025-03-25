import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _TransformDefinitionFactory } from './TransformDefinitionFactory';
import {
  OptionallyInitTransformDefinitionFn, TransformDefinition
} from './TransformDefinition';

t.test('init works', t => {
  interface OptionallyInitTransformDefinitionFnjacket {
    fn: OptionallyInitTransformDefinitionFn
  }

  const transformDefinition = Substitute.for<TransformDefinition>();

  const optionallyInitScaleFn
    = Substitute.for<OptionallyInitTransformDefinitionFnjacket>();
  optionallyInitScaleFn
    .fn({
      scaleX: 3,
    })
    .returns(transformDefinition);

  const optionallyInitTranslateFn
    = Substitute.for<OptionallyInitTransformDefinitionFnjacket>();
  const optionallyInitSkewFn
    = Substitute.for<OptionallyInitTransformDefinitionFnjacket>();
  const optionallyInitRotateFn
    = Substitute.for<OptionallyInitTransformDefinitionFnjacket>();

  const factory = new _TransformDefinitionFactory({
    optionallyInitScaleFn: optionallyInitScaleFn.fn,
    optionallyInitTranslateFn: optionallyInitTranslateFn.fn,
    optionallyInitSkewFn: optionallyInitSkewFn.fn,
    optionallyInitRotateFn: optionallyInitRotateFn.fn,
  });

  const found = factory.init({
    scaleX: 3,
  });

  const wanted = transformDefinition;

  t.equal(found, wanted);
  t.end();
});
