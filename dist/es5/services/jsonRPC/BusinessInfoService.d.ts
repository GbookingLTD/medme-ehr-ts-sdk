import { IBusinessInfoService } from "../BusinessInfoService";
import { BusinessInfo, Specialization } from "../../types/index";
import { JsonRPCCredService } from "./jsonRpcService";
export declare class BusinessInfoService extends JsonRPCCredService implements IBusinessInfoService {
    getBusinessInfo(cb: (err: any, businesses: BusinessInfo[]) => void): void;
    getBusinessInfoAsync(): Promise<BusinessInfo[]>;
    getSpecializationsByPattern(pattern: string, cb: (err: any, specializations: Specialization[]) => void): void;
    getSpecializationsByPatternAsync(pattern: string): Promise<Specialization[]>;
}
