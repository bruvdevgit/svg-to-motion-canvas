import { NumberOrNumericalExpression } from "./numericalExpression/NumericalExpression";

export type Position<T extends NumberOrNumericalExpression> = [T, T];
