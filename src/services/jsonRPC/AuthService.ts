import { JsonRPCService } from "./jsonRpcService";
import { IAuthService, ExchangeTokenResponse } from "../AuthService";
import { PatientInputProperties } from "../../types/PatientInputProperties";
import { Handlers } from "../../Handlers";
import { Credentials } from "../Credentials";
import { IJsonRPCRequest } from "./jsonRpcRequest";
import { PatientModel } from "../../models/PatientModel";
import {UserSign} from "../../types/UserSign";

export class AuthService extends JsonRPCService implements IAuthService {

    private authCred_: Credentials;
    private authServerEndpoint_: string;
    private ehrServerEndpoint_: string;
    private authExchangeTokenMethod_: string;
    private authExchangeTokenExtra_: object;

    /**
     * В конструктор передается endpoint сервера авторизации и endpoint сервера мед данных.
     * 
     * @param authServerEndpoint endpoint сервера авторизации
     * @param ehrServerEndpoint endpoint сервера мед данных
     * @param request функция, выполняющая запрос
     * @param authCred параметры доступа к обоим серверам
     */
    public constructor(ehrServerEndpoint: string, authServerEndpoint: string, cred: Credentials, request: IJsonRPCRequest,
            exchangeTokenMethod: string, exchangeTokenExtra: object) {
        super(null, request);
        this.ehrServerEndpoint_ = ehrServerEndpoint;
        this.authServerEndpoint_ = authServerEndpoint;
        this.authCred_ = cred;
        this.authExchangeTokenMethod_ = exchangeTokenMethod;
        this.authExchangeTokenExtra_ = exchangeTokenExtra;
    }

    /**
     * Метод выполняет запрос к серверу авторизации для генерации и предоставления exchange_token.
     * 
     * @param {Function} cb
     */
    public getExchangeToken(cb: (err: any, res: ExchangeTokenResponse) => void): void {
        this.exec(this.authExchangeTokenMethod_, this.authExchangeTokenExtra_, (err: any, payload: object) => {
            if (err)
                return cb(err, null);

            let etr = new ExchangeTokenResponse();
            etr.exchangeToken = payload['exchangeToken'];
            return cb(null, etr);
        }, this.authServerEndpoint_, this.authCred_);
    }

    /**
     * Метод выполняет запрос к EHR серверу для аутентификации пользователя по его данным.
     * 
     * Авторизация выполняется через ранее полученный exchangeToken.
     * 
     * @param {string} exchangeToken короткоживущий токен обмена
     * @param {PatientInputProperties} patientProperties информация о пациенте для сопоставления
     */
    public authenticate(exchangeToken: string, patientProperties: PatientInputProperties, 
                        cb: (err: any, patient: PatientModel, userSign: UserSign) => void): void {
        this.exec(Handlers.HANDLER_AUTHENTICATE_METHOD, {exchangeToken, patientProperties: patientProperties}, (err: any, payload: object) => {
            if (err)
                return cb(err, null, null);

            let patient = new PatientModel();
            patient.fromJson(payload['patient']);
            if (!payload['userSign'])
                throw new Error("expect userSign");
            return cb(null, patient, payload['userSign']);
        }, this.ehrServerEndpoint_);
    }

    /**
     * Удаление сопоставления креденшиалов пользователя и пациента в МИСе.
     * Удаляет так же все активные сессии данного пользователя.
     * 
     * @param cb 
     */
    public removeAuthentication(cb: (err: any) => void): void {
        this.exec(Handlers.HANDLER_REMOVE_AUTHENTICATION_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
    }

    /**
     * Удаление пользовательской сессии.
     * 
     * @param cb 
     */
    public removeAuthInfo(cb: (err: any) => void): void {
        this.exec(Handlers.HANDLER_REMOVE_AUTH_INFO_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
    }
}