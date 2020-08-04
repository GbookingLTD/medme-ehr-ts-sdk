var Discount = /** @class */ (function () {
    function Discount() {
    }
    Discount.prototype.fromJson = function (json) {
        this.discountType = json.discountType;
        this.discountPercent = json.discountPercent;
        return this;
    };
    Discount.prototype.toJson = function () {
        var payload = {};
        payload.discountType = this.discountType;
        payload.discountPercent = this.discountPercent;
        return payload;
    };
    return Discount;
}());
export { Discount };
