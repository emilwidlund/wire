"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var mobx_1 = require("mobx");
var _ = require("lodash");
var Connection = /** @class */ (function () {
    /**
     * Connection Instance Constructor
     */
    function Connection(context, props) {
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
    Connection.prototype.destroy = function () {
        this.context.removeConnection(this);
        this.toPort.value = this.toPort.defaultValue;
    };
    /**
     * Serializes the Connection to JSON format
     */
    Connection.prototype.serialize = function () {
        return {
            id: this.id,
            fromPortId: this.fromPort.id,
            toPortId: this.toPort.id
        };
    };
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
    return Connection;
}());
exports.Connection = Connection;
