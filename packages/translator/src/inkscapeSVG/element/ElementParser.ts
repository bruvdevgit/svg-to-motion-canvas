import { INode } from "svgson";
import { Element } from './Element';
import { ElementParserFactory } from "./ElementParserFactory";
import { Transformer } from "../transformer/Transformer";

export interface ParseFnArgs {
  iNode: INode;
  transformer: Transformer;
}

export interface ElementParser {
  parse(args: ParseFnArgs): Element;
}

export type InitElementParserFn =
  (elementParserFactory: ElementParserFactory) => ElementParser;

