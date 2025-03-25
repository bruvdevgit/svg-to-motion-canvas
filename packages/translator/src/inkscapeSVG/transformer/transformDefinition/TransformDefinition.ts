import { RotateFields } from "./rotate/Rotate";
import { ScaleFields } from "./scale/Scale";
import { SkewXFields } from "./skewX/SkewX";
import { TranslateFields } from "./translate/Translate";

export type TransformDefinitionFields =
  ScaleFields
  | SkewXFields
  | RotateFields
  | TranslateFields;

export interface TransformDefinition {
  applyToPosition(position: [number, number]): [number, number];
  applyToScalar(length: number): number;
}

export type OptionallyInitTransformDefinitionFn
  = (fields: TransformDefinitionFields) => TransformDefinition | null;

