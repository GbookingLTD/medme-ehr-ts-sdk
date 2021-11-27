import { BusinessInfo, Specialization } from "../types/index";
export interface IBusinessInfoService {
    getBusinessInfo(cb: (err: any, businesses: BusinessInfo[]) => void): void;
    getBusinessInfoAsync(): Promise<BusinessInfo[]>;
    getSpecializationsByPattern(pattern: string, cb: (err: any, specializations: Specialization[]) => void): void;
    getSpecializationsByPatternAsync(pattern: string): Promise<Specialization[]>;
}
