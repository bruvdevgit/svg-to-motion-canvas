export type ValueOrExpression = Expression | number;

// This class exists because the result of this
// library is code that will be processed on a higher
// layer of execution.
//
// This class then serves the purpose of generating
// in the output code an expression like 1+1 
// instead of its resolution 2.
//
// The purpose of outputting unresolved expressions 
// even though they will be computed the same is to
// give users of this library a hint about where values
// are coming from.
export interface Expression {
  getExpression(): string;
  add(expression: Expression): this;
}

export class _Expression implements Expression {
  constructor(public expression: string) { }

  getExpression(): string {
    return this.expression;
  }

  add(expression: Expression): this {
    throw Error('Not implemented');
  }
}

export type InitExpressionFn
  = (expression: string) => Expression;

export const initExpression: InitExpressionFn
  = (expression: string) => new _Expression(expression);
