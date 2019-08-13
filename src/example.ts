import { Context } from './core/Context';
import { AdditionNode } from './core/nodes';

const ctx = new Context();

const node = new AdditionNode(ctx, {
    inputPorts: {
        what: {
            defaultValue: 60
        }
    }
});

const nodeB = new AdditionNode(ctx, {
    inputPorts: {
        what: {
            defaultValue: 60
        }
    }
});

const connection = node.outputPorts.result.connect(nodeB.inputPorts.a);

const serializedContext = ctx.serialize();
const serializedContextString = JSON.stringify(serializedContext);
const serializedContextObject = JSON.parse(serializedContextString);

const importedContext = Context.import(serializedContextObject);

console.dir(ctx);
console.dir(importedContext);
