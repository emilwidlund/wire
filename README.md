![Wire](banner.png)

# Wire

### What is Wire?

Wire is a TypeScript framework designed to shuffle data in a unidirectional way.
It is primarily built to abstract data-flow in Node/Graph Editors & Visual Programming tools.

#### Nodes

Nodes are the most important entities in Wire. They are conceptually very similar to functions. A node consists of
input ports (much like a function's arguments), output ports (much like a function's return value) and a set of lifecycle
methods. The primary purpose of a Node is to process & digest data of different kinds.

#### Connections

Connections are links that transports values between nodes' input & output ports. Passing values between Nodes using
connections is super easy, and built to be reactive & blazing fast.

### Examples

#### Basic usage

```typescript
// Import the Context class & the built-in AdditionNode that comes with Wire by default
import { Context } from 'wire';
import { AdditionNode } from 'wire/nodes';

// Create a context which holds nodes & associated connections
const context: Context = new Context();

// Create two simple nodes that adds values
const nodeA = new AdditionNode(context);
const nodeB = new AdditionNode(context);

// Connect nodeA's output port "result" with nodeB's input port "a"
nodeA.outputPorts.result.connect(nodeB.inputPorts.a);
```

#### Defining a custom node

```typescript
import * as _ from 'lodash';

import { Node, NodeProps, NodeInputPorts, NodeOutputPorts, InputPort, OutputPort, Context } from 'wire';

export interface AdditionNodeInputPorts extends NodeInputPorts {
    a: InputPort<number>;
    b: InputPort<number>;
}

export interface AdditionNodeOutputPorts extends NodeOutputPorts {
    result: OutputPort<number>;
}

export class AdditionNode extends Node {
    inputPorts: AdditionNodeInputPorts;
    outputPorts: AdditionNodeOutputPorts;

    constructor(context: Context, props: NodeProps = {}) {
        _.defaultsDeep(props, {
            inputPorts: {
                a: {
                    defaultValue: 0
                },
                b: {
                    defaultValue: 0
                }
            },
            outputPorts: {
                result: {
                    defaultValue: 0
                }
            }
        });

        super(context, props);
    }

    compute() {
        const values: number[] = Object.values(this.inputPorts).map(ip => ip.value);
        const result: number = values.reduce((acc: number, val: number) => acc + val, 0);

        this.outputPorts.result.value = result;
    }
}
```

#### Serializing & Importing a Context

```typescript
import { Context } from 'wire';
import { AdditionNode } from 'wire/nodes';

const context: Context = new Context();

const nodeA = new AdditionNode(context);
const nodeB = new AdditionNode(context);

nodeA.outputPorts.result.connect(nodeB.inputPorts.a);

// Serialize Context
const object = context.serialize();

// Store Context
const JSONContext = JSON.stringify(object);
localStorage.setItem('wire_context', JSONContext);

// Import Context from JSON
const importedContextFromStorage = localStorage.getItem('wire_context');
const importedContextObject = JSON.parse(importedContextFromStorage);

// In order for Wire to "rebuild" your custom nodes, you need to pass those node classes in an object when importing
const importedContext = Context.import(importedContextObject, { CustomNodeA, CustomNodeB });

// The context is now successfully restored
```
