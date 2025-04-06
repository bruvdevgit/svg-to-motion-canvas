import { NumericalExpression } from "../../../utilities/numericalExpression/NumericalExpression";
import { Position } from "../../../utilities/Position";

export interface Options {
  dontResolveWhenApplying: boolean
}

export interface TransformDefinition {
  applyToPosition(position: Position<NumericalExpression>): Position<NumericalExpression>;
  applyToScalar(length: NumericalExpression): NumericalExpression;
}

