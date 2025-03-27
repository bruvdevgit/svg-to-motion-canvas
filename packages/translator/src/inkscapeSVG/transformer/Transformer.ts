import { Position } from "../../utilities/Position";
import {
  initTransformAttributeParser, TransformAttributeParser
} from "./TransformAttributeParser";
import { TransformDefinition } from "./transformDefinition/TransformDefinition";
import {
  TransformDefinitionFactory, initTransformDefinitionFactory
} from "./transformDefinition/TransformDefinitionFactory";

export interface AddForUserlandConversionFnArgs {
  scaleFactor: number, centerPoint: Position<number>
}

export interface Transformer {
  addFromTransformAttribute(value: string): Transformer;
  addForUserlandConversion(args: AddForUserlandConversionFnArgs): Transformer;
  applyToPosition(position: Position<number>): Position<number>;
  applyToScalar(length: number): number;
}

export class _Transformer implements Transformer {
  constructor(public deps: {
    transformAttributeParser: TransformAttributeParser,
    transformDefinitionFactory: TransformDefinitionFactory,
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
    const scaleDefinition = this.deps.transformDefinitionFactory.init({
      scaleX: scaleFactor,
      scaleY: scaleFactor,
    });

    const translateDefinition = this.deps.transformDefinitionFactory.init({
      translateX: centerPoint[0],
      translateY: centerPoint[1],
    });

    return new _Transformer(this.deps,
      [...this.definitions],
      [scaleDefinition, translateDefinition]);
  }

  applyToPosition(pos: Position<number>): Position<number> {
    let position = pos;
    this.definitions.forEach(def => position = def.applyToPosition(position));
    this.lastDefinitions.forEach(def => position = def.applyToPosition(position));
    return position;
  }

  applyToScalar(len: number): number {
    let length = len;
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
    transformDefinitionFactory: initTransformDefinitionFactory(),
  });
