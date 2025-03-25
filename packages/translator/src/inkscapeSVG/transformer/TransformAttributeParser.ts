import { TransformDefinition } from "./transformDefinition/TransformDefinition";
import {
  initTransformDefinitionFactory, TransformDefinitionFactory
} from "./transformDefinition/TransformDefinitionFactory";

export const TRANSFORM_ATTRIBUTE_MATRIX_VALUE_REGEX =
  /matrix\(([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+),\s*([-\d.]+)\)/;

export interface TransformAttributeParser {
  parse(value: string): TransformDefinition[];
}

// Use https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform
export class _TransformAttributeParser implements TransformAttributeParser {
  constructor(public deps: {
    transformDefinitionFactory: TransformDefinitionFactory,
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

    if (e != 0 || f != 0) {
      transformDefinitions.push(this.deps.transformDefinitionFactory.init({
        translateX: e,
        translateY: f
      }));
    }

    // Compute scale factors
    const scaleX = Math.sqrt(a * a + b * b);
    const scaleY = Math.sqrt(c * c + d * d);

    if (scaleX != 0 || scaleY != 0) {
      transformDefinitions.push(this.deps.transformDefinitionFactory.init({
        scaleX,
        scaleY,
      }));
    }

    // Compute rotation angle in degrees
    const rotation = Math.atan2(b, a) * (180 / Math.PI);

    if (rotation != 0) {
      transformDefinitions.push(this.deps.transformDefinitionFactory.init({
        rotation,
      }));
    }

    // Compute skew values
    const skewX = Math.atan2(c, d) * (180 / Math.PI);

    if (skewX != 0) {
      transformDefinitions.push(this.deps.transformDefinitionFactory.init({
        skewX,
      }));
    }

    return transformDefinitions;
  }
}

export type InitTransformAttributeParserFn = () => TransformAttributeParser;

export const initTransformAttributeParser: InitTransformAttributeParserFn
  = () => new _TransformAttributeParser({
    transformDefinitionFactory: initTransformDefinitionFactory(),
  });
