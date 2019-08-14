(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "uuid", "lodash"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const uuid_1 = require("uuid");
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
    exports.Connection = Connection;
});
