
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

### Example
```typescript
// Import the Context class & the built-in AdditionNode that comes with Wire by default
import {Context} from 'wire';
import {AdditionNode} from 'wire/nodes';

// Create a context which holds nodes & associated connections
const context: Context = new Context();

// Create two simple nodes that adds values
const nodeA = new AdditionNode(context);
const nodeB = new AdditionNode(context);

// Connect nodeA's output port "result" with nodeB's input port "a"
nodeA.outputPorts.result.connect(nodeB.inputPorts.a);
```
