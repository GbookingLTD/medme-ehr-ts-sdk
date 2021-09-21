import { BusinessInfo } from "../types/index";

export interface IBusinessInfoService {
  getBusinessInfo(cb: (err: any, businesses: BusinessInfo[]) => void): void;
  getBusinessInfoAsync(): Promise<BusinessInfo[]>;
}
