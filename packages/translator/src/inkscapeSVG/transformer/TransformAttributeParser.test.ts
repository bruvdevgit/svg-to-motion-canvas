import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _TransformAttributeParser } from './TransformAttributeParser';
import { TransformDefinition } from './transformDefinition/TransformDefinition';
import { InitTranslateFn } from './transformDefinition/translate/Translate';
import { InitScaleFn } from './transformDefinition/scale/Scale';
import { InitSkewXFn } from './transformDefinition/skewX/SkewX';
import { InitRotateFn } from './transformDefinition/rotate/Rotate';

t.test('parse works', t => {
  const translateTransformDefinition = Substitute.for<TransformDefinition>();
  const scaleXTransformDefinition = Substitute.for<TransformDefinition>();

  const scaleX = 3.278713;
  const scaleY = 3.278713;
  //const rotation = 0;
  //const skewX = 0;
  const translateX = 37.280179;
  const translateY = -232.59381;


  interface InitTranslateFnJacket {
    fn: InitTranslateFn
  }
  const initTranslateFnJacket = Substitute.for<InitTranslateFnJacket>();

  interface InitScaleFnJacket {
    fn: InitScaleFn
  }
  const initScaleFnJacket = Substitute.for<InitScaleFnJacket>();

  interface InitSkewXFnJacket {
    fn: InitSkewXFn
  }
  const initSkewXFnJacket = Substitute.for<InitSkewXFnJacket>();

  interface InitRotateFnJacket {
    fn: InitRotateFn
  }
  const initRotateFnJacket = Substitute.for<InitRotateFnJacket>();


  initTranslateFnJacket
    .fn({
      translateX,
      translateY,
    })
    .returns(translateTransformDefinition);
  initScaleFnJacket
    .fn({
      scaleX,
      scaleY,
    })
    .returns(scaleXTransformDefinition);

  const matrix = "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)";

  const transformerParser = new _TransformAttributeParser({
    initTranslateFn: initTranslateFnJacket.fn,
    initScaleFn: initScaleFnJacket.fn,
    initSkewXFn: initSkewXFnJacket.fn,
    initRotateFn: initRotateFnJacket.fn,
  });

  const found = transformerParser.parse(matrix);
  const wanted = [
    translateTransformDefinition,
    scaleXTransformDefinition,
  ];

  // start testing internal calls

  initTranslateFnJacket
    .received()
    .fn({
      translateX,
      translateY,
    });
  initScaleFnJacket
    .received()
    .fn({
      scaleX,
      scaleY,
    });

  // end testing internal calls

  t.same(found, wanted);
  t.end();
});

