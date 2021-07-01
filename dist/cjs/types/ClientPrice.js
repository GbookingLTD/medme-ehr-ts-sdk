"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPrice = void 0;
var Discount_1 = require("./Discount");
var ClientPrice = /** @class */ (function () {
    function ClientPrice() {
        this.discount = new Discount_1.Discount();
    }
    ClientPrice.prototype.fromJson = function (json) {
        this.currency = json.currency;
        this.originValue = json.originValue;
        this.discountValue = json.discountValue;
        this.value = json.value;
        if (json.discount)
            this.discount.fromJson(json.discount);
        return this;
    };
    ClientPrice.prototype.toJson = function () {
        var payload = {};
        payload.currency = this.currency;
        payload.originValue = this.originValue;
        payload.discountValue = this.discountValue;
        payload.value = this.value;
        payload.discount = this.discount ? this.discount.toJson() : null;
        return payload;
    };
    return ClientPrice;
}());
exports.ClientPrice = ClientPrice;
