"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./core/Context");
const nodes_1 = require("./core/nodes");
const ctx = new Context_1.Context();
const node = new nodes_1.AdditionNode(ctx, {
    inputPorts: {
        what: {
            defaultValue: 60
        }
    }
});
const nodeB = new nodes_1.AdditionNode(ctx, {
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
const importedContext = Context_1.Context.import(serializedContextObject);
console.dir(ctx);
console.dir(importedContext);
