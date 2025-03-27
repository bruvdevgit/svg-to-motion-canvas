import { Position } from "../../../../utilities/Position";
import {
  OptionallyInitTransformDefinitionFn,
  TransformDefinition,
  TransformDefinitionFields
} from "../TransformDefinition";

// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform#rotate
export interface RotateFields {
  rotation: number,
}

export class _Rotate implements TransformDefinition {
  rotation: number;

  constructor(fields: RotateFields) {
    this.rotation = fields.rotation;
  }

  applyToPosition(_position: Position<number>): Position<number> {
    throw new Error('TODO: implement');
  }

  applyToScalar(_length: number): number {
    throw new Error('TODO: implement');
  }
}

export function isRotateFields(fields: TransformDefinitionFields)
  : fields is RotateFields {
  return !Number.isNaN(Number((fields as RotateFields).rotation));
}

export const optionallyInitRotate: OptionallyInitTransformDefinitionFn
  = (fields: TransformDefinitionFields) => {
    if (isRotateFields(fields)) {
      return new _Rotate(fields);
    }
    else {
      return null;
    }
  }
