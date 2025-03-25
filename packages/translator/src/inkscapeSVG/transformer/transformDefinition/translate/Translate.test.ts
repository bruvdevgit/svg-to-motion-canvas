import t from 'tap';
import { _Translate, TranslateFields } from './Translate';

t.test('applyToPosition works', t => {
  [{
    translate: [123, -82],
    applyTo: [12, 84],
    wantedResult: [135, 2]
  },].forEach(({ translate, applyTo, wantedResult, }) => {
    const translateDefinition = new _Translate({
      translateX: translate[0],
      translateY: translate[1],
    } satisfies TranslateFields);

    const found = translateDefinition.applyToPosition([applyTo[0], applyTo[1]]);
    const wanted = [wantedResult[0], wantedResult[1]];

    t.same(found, wanted);
  });
  t.end();
});

t.test('applyToScalar works', t => {
  [{
    translate: [123, -82],
    applyTo: 12,
    wantedResult: 12
  },].forEach(({ translate, applyTo, wantedResult, }) => {
    const translateDefinition = new _Translate({
      translateX: translate[0],
      translateY: translate[1],
    } satisfies TranslateFields);

    const found = translateDefinition.applyToScalar(applyTo);
    const wanted = wantedResult;

    t.equal(found, wanted);
  });
  t.end();
});

