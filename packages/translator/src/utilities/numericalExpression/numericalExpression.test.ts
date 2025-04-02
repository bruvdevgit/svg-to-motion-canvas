import t from 'tap';
import { Arg, Substitute } from '@fluffy-spoon/substitute';
import { _NumericalExpression, NumericalExpression, Operator } from './NumericalExpression';
import { _ContainerNode, initContainerNode, InitContainerNodeFn } from './node/ContainerNode';
import { _LeafNode, initLeafNode, InitLeafNodeFn } from './node/LeafNode';

t.test('toString method works', t => {
  const deps = {
    initContainerNodeFn: initContainerNode,
    initLeafNodeFn: initLeafNode,
  };

  const containerNodeDeps = {
    initContainerNode: initContainerNode,
  }

  let numericalExpression: NumericalExpression
    = new _NumericalExpression(deps, 0, new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.FirstTerm, 5));

  t.equal(numericalExpression.getString(), '5');

  numericalExpression = new _NumericalExpression(deps, 0, new _ContainerNode(
    containerNodeDeps,
    Operator.FirstTerm, [
    new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.FirstTerm, 10),
    new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.Add, 5),
  ]));

  t.equal(numericalExpression.getString(), '10 + 5');


  numericalExpression = new _NumericalExpression(deps, 0, new _ContainerNode(
    containerNodeDeps,
    Operator.FirstTerm, [
    new _ContainerNode(
      containerNodeDeps,
      Operator.FirstTerm, [
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.FirstTerm, 10),
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.Add, 5),
    ]),
    new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.Add, 25),
  ]));
  t.equal(numericalExpression.getString(), '(10 + 5) + 25');


  numericalExpression = new _NumericalExpression(deps, 0, new _ContainerNode(
    containerNodeDeps, Operator.FirstTerm, [
    new _ContainerNode(
      containerNodeDeps, Operator.FirstTerm, [
      new _ContainerNode(
        containerNodeDeps, Operator.FirstTerm, [
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.FirstTerm, 10),
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.Add, 5),
      ]),
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.Add, 32),
    ]),
    new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.Multiply, 2),
  ]));
  t.equal(numericalExpression.getString(), '((10 + 5) + 32) * 2');

  numericalExpression = new _NumericalExpression(deps, 0, new _ContainerNode(
    containerNodeDeps, Operator.FirstTerm, [
    new _ContainerNode(
      containerNodeDeps, Operator.FirstTerm, [
      new _ContainerNode(
        containerNodeDeps, Operator.FirstTerm, [
        new _ContainerNode(
          containerNodeDeps, Operator.FirstTerm, [
          new _LeafNode({
            initContainerNodeFn: initContainerNode,
          }, Operator.FirstTerm, 10),
          new _LeafNode({
            initContainerNodeFn: initContainerNode,
          }, Operator.Add, 5),
        ]),
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.Add, 32),
      ]),
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.Multiply, 0.5),
    ]),
    new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.Subtract, 20),
  ]));
  t.equal(numericalExpression.getString(), '(((10 + 5) + 32) * 0.5) - 20');


  numericalExpression = new _NumericalExpression(deps, 0, new _ContainerNode(
    containerNodeDeps, Operator.FirstTerm, [
    new _ContainerNode(
      containerNodeDeps, Operator.FirstTerm, [
      new _ContainerNode(
        containerNodeDeps, Operator.FirstTerm, [
        new _ContainerNode(
          containerNodeDeps, Operator.FirstTerm, [
          new _ContainerNode(
            containerNodeDeps, Operator.FirstTerm, [
            new _LeafNode({
              initContainerNodeFn: initContainerNode,
            }, Operator.FirstTerm, 10),
            new _LeafNode({
              initContainerNodeFn: initContainerNode,
            }, Operator.Add, 5),
          ]),
          new _LeafNode({
            initContainerNodeFn: initContainerNode,
          }, Operator.Add, 32),
        ]),
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.Multiply, 0.5),
      ]),
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.Subtract, 20),
    ]),
    new _ContainerNode(
      containerNodeDeps, Operator.Divide, [
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.FirstTerm, 3),
      new _LeafNode({
        initContainerNodeFn: initContainerNode,
      }, Operator.Multiply, 1.2),
    ]),
  ]));
  t.equal(numericalExpression.getString(), '((((10 + 5) + 32) * 0.5) - 20) / (3 * 1.2)');


  numericalExpression = new _NumericalExpression(deps, 0, new _ContainerNode(
    containerNodeDeps, Operator.FirstTerm, [
    new _ContainerNode(
      containerNodeDeps, Operator.FirstTerm, [
      new _ContainerNode(
        containerNodeDeps, Operator.FirstTerm, [
        new _ContainerNode(
          containerNodeDeps, Operator.FirstTerm, [
          new _ContainerNode(
            containerNodeDeps, Operator.FirstTerm, [
            new _ContainerNode(
              containerNodeDeps, Operator.FirstTerm, [
              new _LeafNode({
                initContainerNodeFn: initContainerNode,
              }, Operator.FirstTerm, 10),
              new _LeafNode({
                initContainerNodeFn: initContainerNode,
              }, Operator.Add, 5),
            ]),
            new _LeafNode({
              initContainerNodeFn: initContainerNode,
            }, Operator.Add, 32),
          ]),
          new _LeafNode({
            initContainerNodeFn: initContainerNode,
          }, Operator.Multiply, 0.5),
        ]),
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.Subtract, 20),
      ]),
      new _ContainerNode(
        containerNodeDeps, Operator.Divide, [
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.FirstTerm, 3),
        new _LeafNode({
          initContainerNodeFn: initContainerNode,
        }, Operator.Multiply, 1.2),
      ]),
    ]),
    new _LeafNode({
      initContainerNodeFn: initContainerNode,
    }, Operator.Add, 10),
  ]));
  t.equal(numericalExpression.getString(), '(((((10 + 5) + 32) * 0.5) - 20) / (3 * 1.2)) + 10');

  t.end();
});

t.test('arithmetic methods work', t => {
  const deps = {
    initContainerNodeFn: initContainerNode,
    initLeafNodeFn: initLeafNode,
  };

  let numericalExpression: NumericalExpression
    = new _NumericalExpression(deps, 5);

  t.equal(numericalExpression.getString(), '5');

  numericalExpression = numericalExpression.add(5);
  t.equal(numericalExpression.getString(), '10');

  numericalExpression = numericalExpression.add(new _NumericalExpression(deps, 5));
  // don't try to reduce
  t.equal(numericalExpression.getString(), '10 + 5');

  numericalExpression = numericalExpression.add(new _NumericalExpression(deps, 25));
  // don't try to reduce
  t.equal(numericalExpression.getString(), '(10 + 5) + 25');

  numericalExpression = numericalExpression.add(7);
  // ((10 + 5) + 25) + 7 == (10 + 5) + 25 + 7 == (10 + 5) + 32
  t.equal(numericalExpression.getString(), '(10 + 5) + 32');

  numericalExpression = numericalExpression.multiply(new _NumericalExpression(deps, 2));
  // don't try to reduce
  t.equal(numericalExpression.getString(), '((10 + 5) + 32) * 2');

  numericalExpression = numericalExpression.divide(4);
  // (((10 + 5) + 32) * 2) / 4 == ((10 + 5) + 32) * 0.5
  t.equal(numericalExpression.getString(), '((10 + 5) + 32) * 0.5');

  numericalExpression = numericalExpression.subtract(new _NumericalExpression(deps, 20));
  // don't try to reduce
  t.equal(numericalExpression.getString(), '(((10 + 5) + 32) * 0.5) - 20');

  const otherExpression = (new _NumericalExpression(deps, 3))
    .multiply(new _NumericalExpression(deps, 1.2));
  numericalExpression = numericalExpression.divide(otherExpression);
  // don't try to reduce
  t.equal(numericalExpression.getString(), '((((10 + 5) + 32) * 0.5) - 20) / (3 * 1.2)');

  numericalExpression = numericalExpression.add(5);
  // don't try reduce because the last added is a NumericalExpression
  t.equal(numericalExpression.getString(), '(((((10 + 5) + 32) * 0.5) - 20) / (3 * 1.2)) + 5');

  numericalExpression = numericalExpression.multiply(2);
  // briefly: 5 * 2 == 10
  t.equal(numericalExpression.getString(), '(((((10 + 5) + 32) * 0.5) - 20) / (3 * 1.2)) + 10');

  numericalExpression = numericalExpression.multiply(new _NumericalExpression(deps, 2));
  // don't try to reduce
  t.equal(numericalExpression.getString(), '((((((10 + 5) + 32) * 0.5) - 20) / (3 * 1.2)) + 10) * 2');

  t.end();
});

