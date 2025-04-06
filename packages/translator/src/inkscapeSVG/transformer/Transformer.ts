import { initNumbericalExpression, InitNumericaExpressionFn, NumericalExpression } from "../../utilities/numericalExpression/NumericalExpression";
import { Position } from "../../utilities/Position";
import {
  initTransformAttributeParser, TransformAttributeParser
} from "./TransformAttributeParser";
import { initScale, InitScaleFn } from "./transformDefinition/scale/Scale";
import { TransformDefinition } from "./transformDefinition/TransformDefinition";
import { initTranslate, InitTranslateFn } from "./transformDefinition/translate/Translate";

export interface AddForUserlandConversionFnArgs {
  scaleFactor: number,
  centerPoint: Position<number>
}

export interface Transformer {
  addFromTransformAttribute(value: string): Transformer;
  addForUserlandConversion(args: AddForUserlandConversionFnArgs): Transformer;
  applyToPosition(pos: Position<number>): Position<NumericalExpression>;
  applyToScalar(len: number): NumericalExpression;
}

export class _Transformer implements Transformer {
  constructor(public deps: {
    transformAttributeParser: TransformAttributeParser,
    initNumericalExpressionFn: InitNumericaExpressionFn,
    initTranslateFn: InitTranslateFn,
    initScaleFn: InitScaleFn,
  }, public definitions: TransformDefinition[] = [],
    // these must be applied last
    public lastDefinitions: TransformDefinition[] = []
  ) { }

  addFromTransformAttribute(value: string): Transformer {
    const definitions = this.deps.transformAttributeParser.parse(value);
    return new _Transformer(this.deps,
      [...this.definitions, ...definitions],
      [...this.lastDefinitions]);
  }

  addForUserlandConversion({ scaleFactor, centerPoint
  }: AddForUserlandConversionFnArgs): Transformer {
    // The order of adding scaleDefintion first
    // and translateDefinition second matters
    const scaleDefinition = this.deps.initScaleFn({
      scaleX: this.deps.initNumericalExpressionFn(scaleFactor),
      scaleY: this.deps.initNumericalExpressionFn(scaleFactor),
    });

    const translateDefinition = this.deps.initTranslateFn({
      translateX: this.deps.initNumericalExpressionFn(centerPoint[0]),
      translateY: this.deps.initNumericalExpressionFn(centerPoint[1]),
    });

    return new _Transformer(this.deps,
      [...this.definitions],
      [scaleDefinition, translateDefinition]);
  }

  applyToPosition(pos: Position<number>): Position<NumericalExpression> {
    let position: Position<NumericalExpression> = [
      this.deps.initNumericalExpressionFn(pos[0]),
      this.deps.initNumericalExpressionFn(pos[1]),
    ];

    this.definitions.forEach(def => position = def.applyToPosition(position));
    this.lastDefinitions.forEach(def => position = def.applyToPosition(position));
    return position;
  }

  applyToScalar(len: number): NumericalExpression {
    let length: NumericalExpression = this.deps.initNumericalExpressionFn(len);
    this.definitions.forEach(def => length = def.applyToScalar(length));
    this.lastDefinitions.forEach(def => length = def.applyToScalar(length));
    return length;
  }
}

export type InitTransformerFn
  = () => Transformer;

export const initTransformer: InitTransformerFn
  = () => new _Transformer({
    transformAttributeParser: initTransformAttributeParser(),
    initNumericalExpressionFn: initNumbericalExpression,
    initTranslateFn: initTranslate,
    initScaleFn: initScale,
  });
