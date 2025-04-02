import { GetStringFnOptions, Node } from "./Node";
import { Operator } from "../NumericalExpression";

export class _ContainerNode implements Node {
  constructor(public deps: {
    initContainerNode: InitContainerNodeFn,
  },
    public operator: Operator,
    public children: Node[]) { }
  //GetStringFnOptions
  getString(options?: GetStringFnOptions): string {
    const excludeBrackets = options?.excludeBrackets ?? this.children.length <= 1;
    let result = this.children.map(child =>
      child.getString()).join(' ');

    let str = '';
    if (this.operator != Operator.FirstTerm) {
      if (this.operator == Operator.Add) {
        str += '+';
      }
      else if (this.operator == Operator.Subtract) {
        str += '-';
      }
      else if (this.operator == Operator.Multiply) {
        str += '*';
      }
      else if (this.operator == Operator.Divide) {
        str += '/';
      }
      str += ' ';
    }
    str += `${excludeBrackets ? '' : '('}${result}${excludeBrackets ? '' : ')'}`;
    return str;
  }

  push(node: Node): Node {
    this.children.push(node);
    return this.clone();
  }

  getLastChild(): Node | null {
    if (this.children.length == 0) {
      return null;
    }
    return this.children.at(-1)!;
  }


  toWrappedInContainerNode(): Node {
    const clone = this.clone();
    clone.setOperator(Operator.FirstTerm);
    return new _ContainerNode(this.deps, this.operator, [clone]);
  }

  clone(): Node {
    return new _ContainerNode(
      this.deps, this.operator, this.children.map(child => child.clone()));
  }

  setOperator(operator: Operator): void {
    this.operator = operator;
  }

  updateLastDescendent(
    value: number, operator?: Operator): void {
    if (this.children.length == 0) {
      return;
    }

    let lastChild = this.children.at(-1)!;

    lastChild.updateLastDescendent(value, operator);
  }

  isLeafNode(): boolean {
    return false;
  }
  isBranchNode(): boolean {
    return true;
  }
}

export type InitContainerNodeFn = (operator: Operator, children: Node[]) => Node;

export const initContainerNode: InitContainerNodeFn
  = (operator: Operator, children: Node[]) =>
    new _ContainerNode({
      initContainerNode: initContainerNode,
    }, operator, children);
