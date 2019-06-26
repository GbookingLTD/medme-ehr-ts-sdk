
export interface IFlatBuffersModel {
    fromFlatBuffers(fbobj: object): void;
    toFlatBuffers(): object;
}