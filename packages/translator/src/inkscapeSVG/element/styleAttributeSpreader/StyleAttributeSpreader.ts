import { Comment, Declaration } from "inline-style-parser";
import { initInlineStyleParserWrapper, InlineStyleParserWrapper } from "../../../wrappers/InlineStyleParserWrapper";

export interface StyleAttributeSpreader {
  spread(styleLine: string): Record<string, string>;
}

export class _StyleAttributeSpreader implements StyleAttributeSpreader {
  constructor(public deps: {
    inlineStyleParser: InlineStyleParserWrapper,
  }) { }


  spread(styleLine: string): Record<string, string> {
    const parsed: (Declaration | Comment)[]
      = this.deps.inlineStyleParser.parse(styleLine);

    const styleObjEntries = parsed
      .filter(o => o.type === 'declaration')
      .map(o => {
        const dec = o satisfies Declaration;
        return [dec.property, dec.value]
      });

    return Object.fromEntries(styleObjEntries);
  }
}

export type InitStyleAttributeSpreader
  = () => StyleAttributeSpreader;

export const initStyleAttributeSpreader: InitStyleAttributeSpreader
  = () => new _StyleAttributeSpreader({
    inlineStyleParser: initInlineStyleParserWrapper()
  });
