"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BusinessInfo = /** @class */ (function () {
    function BusinessInfo() {
    }
    BusinessInfo.prototype.fromJson = function (json) {
        this.id = json.id;
        this.name = json.name;
        this.location = json.location;
        this.networkId = json.networkId;
        return this;
    };
    BusinessInfo.prototype.toJson = function () {
        var payload = {};
        payload.id = this.id;
        payload.name = this.name;
        payload.location = this.location;
        payload.networkId = this.networkId;
        return payload;
    };
    return BusinessInfo;
}());
exports.BusinessInfo = BusinessInfo;
