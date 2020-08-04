"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Specialization = /** @class */ (function () {
    function Specialization() {
    }
    Specialization.prototype.fromJson = function (json) {
        this.id = json.id;
        this.name = json.name;
        return this;
    };
    Specialization.prototype.toJson = function () {
        var payload = {};
        payload.id = this.id;
        payload.name = this.name;
        return payload;
    };
    return Specialization;
}());
exports.Specialization = Specialization;
