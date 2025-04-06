import { initNumbericalExpression, InitNumericaExpressionFn, NumberOrNumericalExpression, NumericalExpression } from "../../../../utilities/numericalExpression/NumericalExpression";
import { Position } from "../../../../utilities/Position";
import { Options, TransformDefinition } from "../TransformDefinition";

// https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform#scale
export interface ScaleFields {
  scaleX: NumberOrNumericalExpression,
  scaleY?: NumberOrNumericalExpression,
}

// NOTE: this class hasn't been implemented 
// to actually use scaleY yet!
export class _Scale implements TransformDefinition {
  scaleX: NumberOrNumericalExpression;
  scaleY: NumberOrNumericalExpression | undefined;

  constructor({ scaleX, scaleY }: ScaleFields) {
    this.scaleX = scaleX;

    if (scaleY != null)
      this.scaleY = scaleY;

  }

  applyToPosition([x, y]: Position<NumericalExpression>): Position<NumericalExpression> {
    return [x.multiply(this.scaleX), y.multiply(this.scaleX)];
  }

  applyToScalar(length: NumericalExpression): NumericalExpression {
    return length.multiply(this.scaleX);
  }
}

export type InitScaleFn
  = (fields: ScaleFields) => TransformDefinition;

export const initScale: InitScaleFn
  = (fields: ScaleFields) => new _Scale(fields);
