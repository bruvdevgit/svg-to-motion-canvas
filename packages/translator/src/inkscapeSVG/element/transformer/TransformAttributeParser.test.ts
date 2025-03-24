import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { INode } from 'svgson';
import { _TransformAttributeParser } from './TransformAttributeParser';
import { InitTransformerFn, Transformer, TransformerFields } from './Transformer';

t.test('parser works', t => {
  interface InitTransformerFnJacket {
    fn: InitTransformerFn
  }
  const initTransformerFnJacket = Substitute.for<InitTransformerFnJacket>();

  const resultTransformer = Substitute.for<Transformer>();

  const transformerParser = new _TransformAttributeParser({
    initTransformerFn: initTransformerFnJacket.fn,
  });

  initTransformerFnJacket
    .fn({
      scaleX: 3.278713,
      scaleY: 3.278713,
      rotation: 0,
      skewX: 0,
      translateX: 37.280179,
      translateY: -232.59381
    } satisfies TransformerFields)
    .returns(resultTransformer);

  const matrix = "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)";
  const found = transformerParser.parse(matrix);
  const wanted = resultTransformer;

  t.equal(found, wanted);
  t.end();
});

