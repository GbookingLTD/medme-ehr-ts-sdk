import { Handlers } from "../../Handlers";
import { IBusinessInfoService } from "../BusinessInfoService";
import { BusinessInfo } from "../../types/index";
import { JsonRPCCredService } from "./jsonRpcService";

export class BusinessInfoService
  extends JsonRPCCredService
  implements IBusinessInfoService
{
  getBusinessInfo(cb: (err: any, businesses: BusinessInfo[]) => void) {
    let params = {};
    this.exec(
      Handlers.HANDLER_GET_BUSINESS_INFO_METHOD,
      params,
      (err: any, payload: object) => {
        if (err) return cb(err, null);

        this.lastValidationErrorsOfList_ = payload["validationErrors"];
        cb(null, payload["businesses"]);
      }
    );
  }

  getBusinessInfoAsync(): Promise<BusinessInfo[]> {
    const service = this;
    return new Promise((res, rej) => {
      service.getBusinessInfo((err: any, businesses: BusinessInfo[]) => {
        if (err) return rej(err);

        res(businesses);
      });
    });
  }
}
