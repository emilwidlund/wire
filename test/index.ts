import { Context, PortValueType } from '../src/core';

const ctx = new Context();

const node = ctx.createNode({
    name: 'What',
    outputPorts: {
        test: {
            name: 'Test',
            valueType: PortValueType.NUMBER,
            defaultValue: 1
        }
    }
});

const nodeTwo = ctx.createNode({
    name: 'Whut',
    inputPorts: {
        test: {
            name: 'Test',
            valueType: PortValueType.NUMBER,
            defaultValue: 2
        }
    },
    outputPorts: {
        test: {
            name: 'Test'
        }
    }
});

const nodeThree = ctx.createNode({
    name: 'Whahah',
    inputPorts: {
        test: {
            name: 'Test',
            defaultValue: 1
        }
    }
});

const connection = node.outputPorts.test.connect(nodeTwo.inputPorts.test);
const connectionTwo = nodeTwo.outputPorts.test.connect(nodeThree.inputPorts.test);

const contextData = ctx.serialize();
const contextObject = JSON.parse(contextData);

const restoredContext = Context.import(contextObject);

// console.log(restoredContext.nodes.get(node.id).outputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeTwo.id).inputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeTwo.id).outputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeThree.id).inputPorts.test.value);

// console.log('DESTROY CON 1');

// restoredContext.connections.get(connection.id).destroy();

// console.log(restoredContext.nodes.get(node.id).outputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeTwo.id).inputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeTwo.id).outputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeThree.id).inputPorts.test.value);

// console.log('DESTROY CON 2');

// restoredContext.connections.get(connectionTwo.id).destroy();

// console.log(restoredContext.nodes.get(node.id).outputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeTwo.id).inputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeTwo.id).outputPorts.test.value);
// console.log(restoredContext.nodes.get(nodeThree.id).inputPorts.test.value);
