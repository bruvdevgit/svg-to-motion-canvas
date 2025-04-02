import { _isNumber, _isNumericalExpression, NumberOrNumericalExpression, Operator } from "../NumericalExpression";
import { initContainerNode, InitContainerNodeFn } from "./ContainerNode";
import { GetStringFnOptions, Node } from "./Node";

export class _LeafNode implements Node {
  constructor(public deps: {
    initContainerNodeFn: InitContainerNodeFn,
  },
    public operator: Operator,
    public value: NumberOrNumericalExpression) { }

  getString(_options: GetStringFnOptions): string {
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

    if (_isNumber(this.value)) {
      str += `${this.value}`;
    }
    else if (_isNumericalExpression(this.value)) {
      str += this.value.getString();
    }
    return str;
  }

  // If this method is called directly on a LeafNode
  // It will create a new ContainerNode and put the
  // owner LeafNode and the new Node as children of
  // that new ContainerNode
  push(node: Node): Node {
    const newContainer = this.deps.initContainerNodeFn(
      this.operator, [this.clone(), node]);
    return newContainer;
  }

  toWrappedInContainerNode(): Node {
    const clone = this.clone();
    clone.setOperator(Operator.FirstTerm);
    return this.deps.initContainerNodeFn(
      this.operator, [clone]);
  }

  clone(): Node {
    return new _LeafNode(
      this.deps, this.operator, this.value);
  }

  updateLastDescendent(num: number, operator?: Operator): void {
    if (operator == Operator.Add) {
      if (_isNumber(this.value)) {
        this.value += num;
      }
      else if (_isNumericalExpression(this.value)) {
        this.value.add(num);
      }
    }
    else if (operator == Operator.Subtract) {
      if (_isNumber(this.value)) {
        this.value -= num;
      }
      else if (_isNumericalExpression(this.value)) {
        this.value.subtract(num);
      }
    }
    else if (operator == Operator.Multiply) {
      if (_isNumber(this.value)) {
        this.value *= num;
      }
      else if (_isNumericalExpression(this.value)) {
        this.value.multiply(num);
      }
    }
    else if (operator == Operator.Divide) {
      if (_isNumber(this.value)) {
        this.value /= num;
      }
      else if (_isNumericalExpression(this.value)) {
        this.value.divide(num);
      }
    }
  }

  setOperator(operator: Operator): void {
    this.operator = operator;
  }

  getLastChild(): Node | null {
    return null;
  }

  isLeafNode(): boolean {
    return true;
  }
  isBranchNode(): boolean {
    return false;
  }
}

export type InitLeafNodeFn
  = (operator: Operator, num: NumberOrNumericalExpression) => Node;

export const initLeafNode: InitLeafNodeFn
  = (operator: Operator, num: NumberOrNumericalExpression
  ) => new _LeafNode({
    initContainerNodeFn: initContainerNode,
  }, operator, num);

