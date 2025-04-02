import t from 'tap';
import { _Prop as _Prop, PropFields } from './Prop';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { CamelCaseWrapper } from '../../../../wrappers/CamelCaseWrapper';

const data: { fields: PropFields, indentPrefix: string, stringified: string }[] = [
  {
    fields: {
      key: 'ref',
      value: 'greenFillAndStrokeRectXLongSharpCorners',
      removeQuotesFromValue: true,
    },
    indentPrefix: '\t',
    stringified: '\tref= {greenFillAndStrokeRectXLongSharpCorners}',
  },
  {
    fields: {
      key: 'ref',
      value: 'greenFillAndStrokeRectXLongSharpCorners',
      removeQuotesFromValue: true,
    },
    indentPrefix: '\t',
    stringified: '\tref= {greenFillAndStrokeRectXLongSharpCorners}',
  },
  {
    fields: {
      key: 'width',
      value: 'scaleCoord(82.803673)',
      removeQuotesFromValue: true,
    },
    indentPrefix: '\t',
    stringified:
      '\twidth= {scaleCoord(82.803673)}',
  },
  {
    fields: {
      key: 'height',
      value: 'scaleCoord(25.728548)',
      removeQuotesFromValue: true,
    },
    indentPrefix: '\t',
    stringified:
      '\theight= {scaleCoord(25.728548)}',
  },
  {
    fields: {
      key: 'topLeft',
      value: ['coordX(9.0465326)', 'coordY(10.700179)'],
      removeQuotesFromValue: true,
    },
    indentPrefix: '\t',
    stringified:
      '\ttopLeft= {[coordX(9.0465326), coordY(10.700179), ]}',
  },
  {
    fields: {
      key: 'fill',
      value: '#2ca02c',
    },
    indentPrefix: '\t',
    stringified:
      '\tfill= {"#2ca02c"}',
  },
  {
    fields: {
      key: 'stroke',
      value: '#1300ff',
    },
    indentPrefix: '\t',
    stringified:
      '\tstroke= {"#1300ff"}',
  },
  {
    fields: {
      key: 'lineWidth',
      value: 'scaleCoord(1.23096)',
      removeQuotesFromValue: true,
    },
    indentPrefix: '\t',
    stringified:
      '\tlineWidth= {scaleCoord(1.23096)}',
  },
];

t.test('toStringLines correctly creates strings for lines of props', t => {

  for (let i = 0; i < data.length; i++) {
    const { fields, stringified } = data[i];

    const camelCaseWrapper = Substitute.for<CamelCaseWrapper>();

    const props = new _Prop({
      camelCaseWrapper,
    }, fields);
    const found = props.toStringLine('\t');
    const expected = stringified;

    t.equal(found, expected, `mismatch at i=${i}`);
  }

  t.end();
});

t.test('toStringLines correctly creates strings for lines of camel-case-ified props', t => {
  const camelCaseWrapper = Substitute.for<CamelCaseWrapper>();
  camelCaseWrapper
    .parse('green-fill-and-stroke-rect-x-long-sharp-corners')
    .returns('greenFillAndStrokeRectXLongSharpCorners');

  const props = new _Prop({
    camelCaseWrapper,
  }, {
    key: 'ref',
    value: 'green-fill-and-stroke-rect-x-long-sharp-corners',
    removeQuotesFromValue: true,
    turnValueToCamelCase: true,
  });
  const found = props.toStringLine('\t');
  const expected = '\tref= {greenFillAndStrokeRectXLongSharpCorners}';

  // start test internal calls
  camelCaseWrapper
    .received()
    .parse('green-fill-and-stroke-rect-x-long-sharp-corners');

  // end test internal calls
  t.equal(found, expected);
  t.end();
});
