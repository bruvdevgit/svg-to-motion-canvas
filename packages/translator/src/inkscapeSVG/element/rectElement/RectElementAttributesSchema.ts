import myzod, { Infer } from "myzod";
import { ObjectOptions, PathOptions } from "myzod/libs/types";
import { TRANSFORM_ATTRIBUTE_MATRIX_VALUE_REGEX } from "../../transformer/TransformAttributeParser";

const _rectElementAttributesSchema = myzod.object({
  'inkscape:label': myzod.string().pattern(/^[A-Za-z]+[A-Za-z0-9\-]*$/).optional(),
  id: myzod.string().pattern(/^[A-Za-z]+[A-Za-z0-9\-]*$/),
  x: myzod.string()
    .withPredicate((val: string) => !Number.isNaN(Number(val)),
      'value must be convertable to a number'),
  y: myzod.string()
    .withPredicate((val: string) => !Number.isNaN(Number(val)),
      'value must be convertable to a number'),
  rx: myzod.string()
    .withPredicate((val: string) => !Number.isNaN(Number(val)),
      'value must be convertable to a number').optional(),
  ry: myzod.string()
    .withPredicate((val: string) => !Number.isNaN(Number(val)),
      'value must be convertable to a number').optional(),
  width: myzod.string()
    .withPredicate((val: string) => !Number.isNaN(Number(val)),
      'value must be convertable to a number'),
  height: myzod.string()
    .withPredicate((val: string) => !Number.isNaN(Number(val)),
      'value must be convertable to a number'),
  style: myzod.object({
    fill: myzod.string(),
    'fill-opacity': myzod.string().optional(),
    stroke: myzod.string(),
    'stroke-width': myzod.string()
      .withPredicate((val: string) => !Number.isNaN(Number(val)),
        'value must be convertable to a number'),
    'stroke-linecap': myzod.string().optional(),
    'stroke-linejoin': myzod.string(),
    'stroke-miterlimit': myzod.string()
      .withPredicate((val: string) => !Number.isNaN(Number(val)),
        'value must be convertable to a number'),
    'stroke-dasharray': myzod.string().optional(),
    'stroke-opacity': myzod.string()
      .withPredicate((val: string) => !Number.isNaN(Number(val)),
        'value must be convertable to a number')
      .optional(),
    'paint-order': myzod.string(),
  }),
  transform: myzod.string()
    .pattern(TRANSFORM_ATTRIBUTE_MATRIX_VALUE_REGEX)
    .optional(),
}).allowUnknownKeys(true);

export type RectElementAttributes = Infer<typeof _rectElementAttributesSchema>;

export interface RectElementAttributesSchema {
  parse(value?: unknown,
    parseOpts?: ObjectOptions<any> & PathOptions): RectElementAttributes;
}

export class _RectElementAttributesSchema implements RectElementAttributesSchema {
  parse(value?: unknown,
    parseOpts?: ObjectOptions<any> & PathOptions): RectElementAttributes {
    return _rectElementAttributesSchema.parse(value, parseOpts);
  }
}

export type InitRectElementAttributesSchemaFn = () => RectElementAttributesSchema;

/* c8 ignore start */
export function initRectElementAttributesSchema(): RectElementAttributesSchema {
  return new _RectElementAttributesSchema();
}
/* c8 ignore end */
