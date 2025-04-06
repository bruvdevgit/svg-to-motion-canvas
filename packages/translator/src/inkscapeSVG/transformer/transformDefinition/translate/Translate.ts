import { NumberOrNumericalExpression, NumericalExpression } from "../../../../utilities/numericalExpression/NumericalExpression";
import { Position } from "../../../../utilities/Position";
import { TransformDefinition } from "../TransformDefinition";

export interface TranslateFields {
  translateX: NumberOrNumericalExpression;
  translateY: NumberOrNumericalExpression;
}

export class _Translate implements TransformDefinition {
  translateX: NumberOrNumericalExpression;
  translateY: NumberOrNumericalExpression;

  constructor(fields: TranslateFields) {
    this.translateX = fields.translateX;
    this.translateY = fields.translateY;
  }

  applyToPosition(position: Position<NumericalExpression>): Position<NumericalExpression> {
    const [x, y] = position;
    return [x.add(this.translateX), y.add(this.translateY)];
  }

  applyToScalar(length: NumericalExpression): NumericalExpression {
    return length;
  }
}

export type InitTranslateFn
  = (fields: TranslateFields) => TransformDefinition;

export const initTranslate: InitTranslateFn
  = (fields: TranslateFields) => new _Translate(fields);
