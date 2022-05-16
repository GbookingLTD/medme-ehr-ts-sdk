import { ClientPrice } from "./ClientPrice";
var Service = /** @class */ (function () {
    function Service() {
        this.price = new ClientPrice();
    }
    Service.prototype.fromJson = function (json) {
        this.id = json.id;
        this.name = json.name;
        if (json.price)
            this.price.fromJson(json.price);
        this.duration = json.duration;
        return this;
    };
    Service.prototype.toJson = function () {
        var payload = {};
        payload.id = this.id;
        payload.name = this.name;
        payload.price = this.price ? this.price.toJson() : null;
        payload.duration = this.duration;
        return payload;
    };
    return Service;
}());
export { Service };
//# sourceMappingURL=Service.js.map