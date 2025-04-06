import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _Scale, ScaleFields } from './Scale';
import { NumericalExpression } from '../../../../utilities/numericalExpression/NumericalExpression';
import { Options } from '../TransformDefinition';

t.test('applyToPosition works', t => {
  const scaleX = Substitute.for<NumericalExpression>();
  const scaleY = Substitute.for<NumericalExpression>();

  const argScaleX = Substitute.for<NumericalExpression>();
  argScaleX
    .multiply(scaleX)
    .returns(argScaleX);

  const argScaleY = Substitute.for<NumericalExpression>();
  argScaleY
    .multiply(scaleX)
    .returns(argScaleY);

  const translateDefinition = new _Scale({
    scaleX, scaleY,
  } satisfies ScaleFields);

  const found = translateDefinition.applyToPosition([argScaleX, argScaleY]);
  const wanted = [argScaleX, argScaleY];

  // start testing internal calls

  argScaleX
    .received()
    .multiply(scaleX);

  argScaleY
    .received()
    .multiply(scaleX);

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

t.test('applyToScalar works', t => {
  const scaleX = Substitute.for<NumericalExpression>();
  const scaleY = Substitute.for<NumericalExpression>();

  const argScalar = Substitute.for<NumericalExpression>();
  argScalar
    .multiply(scaleX)
    .returns(argScalar);

  const translateDefinition = new _Scale({
    scaleX, scaleY,
  } satisfies ScaleFields);

  const found = translateDefinition.applyToScalar(argScalar);
  const wanted = argScalar;

  // start testing internal calls

  argScalar
    .received()
    .multiply(scaleX);

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

