"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Context_1 = require("./core/Context");
var nodes_1 = require("./core/nodes");
var ctx = new Context_1.Context();
var node = new nodes_1.AdditionNode(ctx, {
    inputPorts: {
        what: {
            defaultValue: 60
        }
    }
});
var nodeB = new nodes_1.AdditionNode(ctx, {
    inputPorts: {
        what: {
            defaultValue: 60
        }
    }
});
var connection = node.outputPorts.result.connect(nodeB.inputPorts.a);
var serializedContext = ctx.serialize();
var serializedContextString = JSON.stringify(serializedContext);
var serializedContextObject = JSON.parse(serializedContextString);
var importedContext = Context_1.Context.import(serializedContextObject);
console.dir(ctx);
console.dir(importedContext);
