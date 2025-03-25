import t from 'tap';
import { _Scale, ScaleFields } from './Scale';

t.test('applyToPosition works', t => {
  [{
    scale: [3, 3],
    applyTo: [192, -93],
    wantedResult: [576, -279]
  },].forEach(({ scale, applyTo, wantedResult, }) => {
    const translateDefinition = new _Scale({
      scaleX: scale[0],
      scaleY: scale[1],
    } satisfies ScaleFields);

    const found = translateDefinition.applyToPosition([applyTo[0], applyTo[1]]);
    const wanted = [wantedResult[0], wantedResult[1]];

    t.same(found, wanted);
  });
  t.end();
});

t.test('applyToScalar works', t => {
  [{
    scale: [3, 3],
    applyTo: 135,
    wantedResult: 405
  },].forEach(({ scale, applyTo, wantedResult, }) => {
    const translateDefinition = new _Scale({
      scaleX: scale[0],
      scaleY: scale[1],
    } satisfies ScaleFields);

    const found = translateDefinition.applyToScalar(applyTo);
    const wanted = wantedResult;

    t.equal(found, wanted);
  });
  t.end();
});

