import { IBusinessInfoService } from "../BusinessInfoService";
import { BusinessInfo } from "../../types/index";
import { JsonRPCCredService } from "./jsonRpcService";
export declare class BusinessInfoService extends JsonRPCCredService implements IBusinessInfoService {
    getBusinessInfo(cb: (err: any, businesses: BusinessInfo[]) => void): void;
    getBusinessInfoAsync(): Promise<BusinessInfo[]>;
}
