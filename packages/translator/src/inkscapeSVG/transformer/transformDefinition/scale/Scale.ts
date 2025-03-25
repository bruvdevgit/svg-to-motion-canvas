import { OptionallyInitTransformDefinitionFn, TransformDefinition, TransformDefinitionFields } from "../TransformDefinition";

// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform#scale
export interface ScaleFields {
  scaleX: number,
  scaleY?: number,
}

export class _Scale implements TransformDefinition {
  scaleX: number;
  scaleY: number | undefined;

  constructor({ scaleX, scaleY }: ScaleFields) {
    this.scaleX = scaleX;
    if (scaleY != undefined && scaleY != scaleX) {
      throw new Error(`initializing Scale TransformDefinition with scaleY != scaleX hasn't been accomodated`);
    }
    this.scaleY = scaleY;
  }

  applyToPosition([x, y]: [number, number]): [number, number] {
    return [x * this.scaleX, y * this.scaleX];
  }

  applyToScalar(length: number): number {
    return length * this.scaleX;
  }
}

export function isScaleFields(fields: TransformDefinitionFields)
  : fields is ScaleFields {
  const { scaleX, scaleY } = fields as ScaleFields;
  return !Number.isNaN(Number(scaleX))
    && scaleY == undefined ? true : !Number.isNaN(Number(scaleY));
}

export const optionallyInitScale: OptionallyInitTransformDefinitionFn
  = (fields: TransformDefinitionFields) => {
    if (isScaleFields(fields)) {
      return new _Scale(fields);
    }
    else {
      return null;
    }
  }
