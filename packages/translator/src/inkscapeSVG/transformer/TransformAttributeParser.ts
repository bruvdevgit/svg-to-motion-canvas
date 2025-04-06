import { initRotate, InitRotateFn } from "./transformDefinition/rotate/Rotate";
import { initScale, InitScaleFn } from "./transformDefinition/scale/Scale";
import { initSkewX, InitSkewXFn } from "./transformDefinition/skewX/SkewX";
import { TransformDefinition } from "./transformDefinition/TransformDefinition";
import { initTranslate, InitTranslateFn } from "./transformDefinition/translate/Translate";

export const TRANSFORM_ATTRIBUTE_MATRIX_VALUE_REGEX =
  /matrix\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/;

export interface TransformAttributeParser {
  parse(value: string): TransformDefinition[];
}

// Use https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform
export class _TransformAttributeParser implements TransformAttributeParser {
  constructor(public deps: {
    initTranslateFn: InitTranslateFn,
    initScaleFn: InitScaleFn,
    initRotateFn: InitRotateFn,
    initSkewXFn: InitSkewXFn,
  }) {
  }

  //TODO: use 
  // `/home/haxwell/projects/active/the_arte_aroma_website/research/testing-decoding-transform-matrix`
  // and AI to write the unit tests
  parse(value: string): TransformDefinition[] {
    let transformDefinitions: TransformDefinition[] = [];
    const match = value.match(TRANSFORM_ATTRIBUTE_MATRIX_VALUE_REGEX);

    if (!match) {
      throw new Error(`Expected the attribute to be a matrix formatted particularly, instead got this value: ${value}`);
    }

    let [_, a, b, c, d, e, f] = match.map(Number);

    // Compute scale factors
    const scaleX = Math.sqrt(a * a + b * b);
    const scaleY = Math.sqrt(c * c + d * d);

    if (scaleX != 0 || scaleY != 0) {
      transformDefinitions.push(this.deps.initScaleFn({
        scaleX,
        scaleY,
      }));
    }

    if (e != 0 || f != 0) {
      transformDefinitions.push(this.deps.initTranslateFn({
        translateX: e,
        translateY: f
      }));
    }


    // Compute rotation angle in degrees
    const rotation = Math.atan2(b, a) * (180 / Math.PI);

    if (rotation != 0) {
      transformDefinitions.push(this.deps.initRotateFn({
        rotation,
      }));
    }

    // Compute skew values
    const skewX = Math.atan2(c, d) * (180 / Math.PI);

    if (skewX != 0) {
      transformDefinitions.push(this.deps.initSkewXFn({
        skewX,
      }));
    }

    return transformDefinitions;
  }
}

export type InitTransformAttributeParserFn = () => TransformAttributeParser;

export const initTransformAttributeParser: InitTransformAttributeParserFn
  = () => new _TransformAttributeParser({
    initTranslateFn: initTranslate,
    initScaleFn: initScale,
    initRotateFn: initRotate,
    initSkewXFn: initSkewX,
  });
