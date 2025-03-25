import { OptionallyInitTransformDefinitionFn, TransformDefinition, TransformDefinitionFields } from "../TransformDefinition";

export interface TranslateFields {
  translateX: number;
  translateY: number;
}

export class _Translate implements TransformDefinition {
  translateX: number;
  translateY: number;

  constructor(fields: TranslateFields) {
    this.translateX = fields.translateX;
    this.translateY = fields.translateY;
  }

  applyToPosition(position: [number, number]): [number, number] {
    const [x, y] = position;
    return [this.translateX + x, this.translateY + y];
  }

  applyToScalar(length: number): number {
    return length;
  }
}

export function isTranslateFields(fields: TransformDefinitionFields)
  : fields is TranslateFields {
  return !Number.isNaN(Number((fields as TranslateFields).translateX))
    && !Number.isNaN(Number((fields as TranslateFields).translateY));
}

export const optionallyInitTranslate: OptionallyInitTransformDefinitionFn
  = (fields: TransformDefinitionFields) => {
    if (isTranslateFields(fields)) {
      return new _Translate(fields);
    }
    else {
      return null;
    }
  }
