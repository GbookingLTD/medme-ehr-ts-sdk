export class ConnectionError extends Error{
    __proto__: Error;
    constructor(){
        super("Connection cannot be established");
        this.__proto__ = new.target.prototype;
    }
}