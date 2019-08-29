import { JsonRPCService } from "./jsonRpcService";
import { IAuthService, ExchangeTokenResponse } from "../AuthService";
import { PatientInfo } from "../../types/PatientInfo";
import { Handlers } from "../../Handlers";
import { Credentials } from "../Credentials";
import { IJsonRPCRequest } from "./jsonRpcRequest";
import { PatientModel } from "../../models/PatientModel";

export class AuthService extends JsonRPCService implements IAuthService {

    private authCred_: Credentials;
    private authServerEndpoint_: string;
    private ehrServerEndpoint_: string;

    public constructor(authServerEndpoint: string, ehrServerEndpoint: string, request: IJsonRPCRequest, authCred: Credentials) {
        super(null, request);
        this.authCred_ = authCred;
        this.authServerEndpoint_ = authServerEndpoint;
        this.ehrServerEndpoint_ = ehrServerEndpoint;
    }

    /**
     * Метод выполняет запрос к серверу авторизации для генерации и предоставления exchange_token.
     * 
     * @param {Function} cb
     */
    public getExchangeToken(cb: (res: ExchangeTokenResponse) => void): void {
        this.exec(Handlers.HANDLER_GET_EXCHANGE_TOKEN_METHOD, {}, (err: any, payload: object) => {
            if (err) throw new Error("failed to get exchange token: " + JSON.stringify(err));
            let etr = new ExchangeTokenResponse();
            etr.exchangeToken = payload['exchangeToken'];
            cb(etr);
        }, this.authServerEndpoint_, this.authCred_);
    }

    /**
     * Метод выполняет запрос к EHR серверу для аутентификации пользователя по его данным.
     * 
     * @param {string} exchangeToken короткоживущий токен обмена
     * @param {PatientInfo} patientInfo информация о пациенте для сопоставления
     */
    public authenticate(exchangeToken: string, patientInfo: PatientInfo, cb: (patient: PatientModel, userSign: string) => void): void {
        this.exec(Handlers.HANDLER_AUTHENTICATE_METHOD, {exchangeToken, patientProperties: patientInfo}, (err: any, payload: object) => {
            if (err) throw new Error("failed to authenticate: " + JSON.stringify(err));
            let patient = new PatientModel();
            patient.fromJson(payload['patient']);
            if (!payload['userSign'])
                throw new Error("expect userSign");
            cb(patient, payload['userSign']);
        }, this.ehrServerEndpoint_);
    }
}