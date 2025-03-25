import {
  TransformDefinition,
  TransformDefinitionFields,
  OptionallyInitTransformDefinitionFn
} from "./TransformDefinition";
import { optionallyInitRotate } from "./rotate/Rotate";
import { optionallyInitScale } from './scale/Scale';
import { optionallyInitSkew } from "./skewX/SkewX";
import { optionallyInitTranslate } from "./translate/Translate";

export interface TransformDefinitionFactory {
  init(fields: TransformDefinitionFields): TransformDefinition;
}

export class _TransformDefinitionFactory
  implements TransformDefinitionFactory {
  constructor(public deps: {
    optionallyInitScaleFn: OptionallyInitTransformDefinitionFn,
    optionallyInitTranslateFn: OptionallyInitTransformDefinitionFn,
    optionallyInitSkewFn: OptionallyInitTransformDefinitionFn,
    optionallyInitRotateFn: OptionallyInitTransformDefinitionFn,
  }) { }

  init(fields: TransformDefinitionFields): TransformDefinition {
    let definition: TransformDefinition | null = null;

    definition = this.deps.optionallyInitScaleFn(fields);
    if (definition != null) {
      return definition;
    }

    definition = this.deps.optionallyInitTranslateFn(fields);
    if (definition != null) {
      return definition;
    }

    definition = this.deps.optionallyInitSkewFn(fields);
    if (definition != null) {
      return definition;
    }

    definition = this.deps.optionallyInitRotateFn(fields);
    if (definition != null) {
      return definition;
    }

    throw new RangeError(`Tried to initialize an unexpected TransformDefition with the fields: ${fields}`);
  }
}

export type InitTransformDefinitionFactoryFn
  = () => TransformDefinitionFactory;

export const initTransformDefinitionFactory
  = () => new _TransformDefinitionFactory({
    optionallyInitScaleFn: optionallyInitScale,
    optionallyInitTranslateFn: optionallyInitTranslate,
    optionallyInitSkewFn: optionallyInitSkew,
    optionallyInitRotateFn: optionallyInitRotate,
  });
