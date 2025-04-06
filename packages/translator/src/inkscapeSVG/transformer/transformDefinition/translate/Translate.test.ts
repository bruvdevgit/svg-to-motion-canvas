import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _Translate, TranslateFields } from './Translate';
import { NumericalExpression } from '../../../../utilities/numericalExpression/NumericalExpression';

t.test('applyToPosition works', t => {
  const translateX = Substitute.for<NumericalExpression>();
  const translateY = Substitute.for<NumericalExpression>();

  const argtranslateX = Substitute.for<NumericalExpression>();
  argtranslateX
    .multiply(translateX)
    .returns(argtranslateX);

  const argtranslateY = Substitute.for<NumericalExpression>();
  argtranslateY
    .multiply(translateY)
    .returns(argtranslateY);

  const translateDefinition = new _Translate({
    translateX, translateY,
  } satisfies TranslateFields);

  const found = translateDefinition.applyToPosition([argtranslateX, argtranslateY]);
  const wanted = [argtranslateX, argtranslateY];

  // start testing internal calls

  argtranslateX
    .received()
    .add(translateX);

  argtranslateY
    .received()
    .add(translateY);

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

t.test('applyToScalar works', t => {
  const translateX = Substitute.for<NumericalExpression>();
  const translateY = Substitute.for<NumericalExpression>();

  const argScalar = Substitute.for<NumericalExpression>();

  const translateDefinition = new _Translate({
    translateX, translateY,
  } satisfies TranslateFields);

  const found = translateDefinition.applyToScalar(argScalar);
  const wanted = argScalar;

  // start testing internal calls

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

