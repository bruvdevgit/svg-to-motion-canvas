import { NumberOrNumericalExpression, NumericalExpression } from "../../../../utilities/numericalExpression/NumericalExpression";
import { Position } from "../../../../utilities/Position";
import {
  Options,
  TransformDefinition,
} from "../TransformDefinition";

// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform#rotate
export interface RotateFields {
  rotation: NumberOrNumericalExpression,
}

export class _Rotate implements TransformDefinition {
  rotation: NumberOrNumericalExpression;

  constructor(fields: RotateFields) {
    this.rotation = fields.rotation;
  }

  applyToPosition(_position: Position<NumericalExpression>): Position<NumericalExpression> {
    throw new Error('TODO: implement');
  }

  applyToScalar(_length: NumericalExpression): NumericalExpression {
    throw new Error('TODO: implement');
  }
}

export type InitRotateFn = (fields: RotateFields) => TransformDefinition

export const initRotate: InitRotateFn
  = (fields: RotateFields) => new _Rotate(fields)
