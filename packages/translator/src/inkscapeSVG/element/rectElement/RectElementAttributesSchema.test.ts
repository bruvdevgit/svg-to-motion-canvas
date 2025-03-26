import t from 'tap';
import { _RectElementAttributesSchema } from './RectElementAttributesSchema';
import { rects } from './testData';

function removeUndefinedFields(obj: Object) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != undefined));
}

t.test('parse correctly processes valid data', t => {
  const styleAttributesSchema = new _RectElementAttributesSchema();
  for (let i = 0; i < rects.length; i++) {
    const attributesSchema = rects[i].svgsonNode.attributes;

    const found = removeUndefinedFields(styleAttributesSchema.parse(attributesSchema));
    t.same(found,
      attributesSchema, `at idx: ${i}`);
  }

  t.end();
});

t.test('parse correctly processes valid including transform', t => {
  const attributesSchema = {
    "id": "rect1",
    "style": "fill:#2ca02c;fill-opacity:1;stroke:#1300ff;stroke-width:1.23096;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:0;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke",
    "width": "82.803673",
    "height": "25.728548",
    "x": "9.0465326",
    "y": "10.700179",
    "inkscape:label": "green-fill-and-stroke-rect-x-long-sharp-corners",
    "transform": "matrix(3.278713,0,0,3.278713,37.280179,-232.59381)",
  };

  const styleAttributesSchema = new _RectElementAttributesSchema();

  const found = removeUndefinedFields(styleAttributesSchema.parse(attributesSchema));
  const wanted = attributesSchema;
  t.same(found, wanted);
  t.end();
});
