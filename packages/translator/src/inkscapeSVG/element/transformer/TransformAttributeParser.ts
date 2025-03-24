
import { initTransformer, InitTransformerFn, Transformer, TransformerFields } from "./Transformer";

export interface TransformAttributeParser {
  parse(value: string): Transformer;
}

// Use https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform
export class _TransformAttributeParser implements TransformAttributeParser {
  constructor(public deps: {
    initTransformerFn: InitTransformerFn,
  }) {
  }

  //TODO: use 
  // `/home/haxwell/projects/active/the_arte_aroma_website/research/testing-decoding-transform-matrix`
  // and AI to write the unit tests
  parse(value: string): Transformer {
    const match = value.match(/matrix\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/);

    if (!match) {
      throw new Error(`Expected the attribute to be a matrix formatted particularly, instead got this value: ${value}`);
    }

    let [_, a, b, c, d, e, f] = match.map(Number);

    // Compute scale factors
    const scaleX = Math.sqrt(a * a + b * b);
    const scaleY = Math.sqrt(c * c + d * d);

    // Compute rotation angle in degrees
    const rotation = Math.atan2(b, a) * (180 / Math.PI);

    // Compute skew values
    const skewX = Math.atan2(c, d) * (180 / Math.PI);

    return this.deps.initTransformerFn({
      scaleX,
      scaleY,
      rotation,
      skewX,
      translateX: e,
      translateY: f
    } satisfies TransformerFields);
  }
}

export type InitTransformAttributeParserFn = () => TransformAttributeParser;

export const initTransformAttributeParser: InitTransformAttributeParserFn
  = () => new _TransformAttributeParser({
    initTransformerFn: initTransformer,
  });
