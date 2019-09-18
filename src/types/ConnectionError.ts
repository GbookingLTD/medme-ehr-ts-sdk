export class ConnectionError extends Error{
    __proto__: Error;
    constructor(){
        super("Connection cannot be established");
        // https://github.com/Microsoft/TypeScript/issues/13965
        this.__proto__ = new.target.prototype;
    }
}