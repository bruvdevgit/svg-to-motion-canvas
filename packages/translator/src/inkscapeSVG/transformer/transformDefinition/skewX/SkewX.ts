import { OptionallyInitTransformDefinitionFn, TransformDefinition, TransformDefinitionFields } from "../TransformDefinition";

// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform#skewx
export interface SkewXFields {
  skewX: number,
}

export class _SkewX implements TransformDefinition {
  skewX: number;

  constructor(fields: SkewXFields) {
    this.skewX = fields.skewX;
  }

  applyToPosition(_position: [number, number]): [number, number] {
    throw new Error('TODO: implement');
  }

  applyToScalar(_length: number): number {
    throw new Error('TODO: implement');
  }
}

export function isSkewXFields(fields: TransformDefinitionFields)
  : fields is SkewXFields {
  return !Number.isNaN(Number((fields as SkewXFields).skewX));
}

export const optionallyInitSkew: OptionallyInitTransformDefinitionFn
  = (fields: TransformDefinitionFields) => {
    if (isSkewXFields(fields)) {
      return new _SkewX(fields);
    }
    else {
      return null;
    }
  }
