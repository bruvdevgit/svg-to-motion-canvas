export interface TransformerFields {
  scaleX: number,
  scaleY: number,
  rotation: number,
  skewX: number,
  translateX: number,
  translateY: number
}

// parses SVG transform property and applies it
// for SVGElements
export interface Transformer {
}

export class _Transformer implements Transformer {
  constructor(public fields: TransformerFields) {
  }
}

export type InitTransformerFn
  = (fields: TransformerFields) => Transformer;

export const initTransformer: InitTransformerFn
  = (fields: TransformerFields) => new _Transformer(fields);
