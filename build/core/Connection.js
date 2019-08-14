"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const mobx_1 = require("mobx");
const _ = require("lodash");
class Connection {
    /**
     * Connection Instance Constructor
     */
    constructor(context, props) {
        _.defaults(props, {
            id: uuid_1.v4()
        });
        this.context = context;
        this.id = props.id;
        this.fromPort = props.fromPort;
        this.toPort = props.toPort;
        this.toPort.value = this.fromPort.value;
    }
    /**
     * Destroys the Connection
     */
    destroy() {
        this.context.removeConnection(this);
        this.toPort.value = this.toPort.defaultValue;
    }
    /**
     * Serializes the Connection to JSON format
     */
    serialize() {
        return {
            id: this.id,
            fromPortId: this.fromPort.id,
            toPortId: this.toPort.id
        };
    }
}
__decorate([
    mobx_1.observable
], Connection.prototype, "id", void 0);
__decorate([
    mobx_1.observable
], Connection.prototype, "fromPort", void 0);
__decorate([
    mobx_1.observable
], Connection.prototype, "toPort", void 0);
__decorate([
    mobx_1.observable
], Connection.prototype, "context", void 0);
__decorate([
    mobx_1.action
], Connection.prototype, "destroy", null);
exports.Connection = Connection;
