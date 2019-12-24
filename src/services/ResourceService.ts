export interface IResourceService {

    getLastValidationErrors(): string[];

    getLastValidationErrorsOfList(): string[][];
}