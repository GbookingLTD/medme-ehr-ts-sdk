import { JsonRPCService } from "./jsonRpcService";
import { IAuthService, ExchangeTokenResponse } from "../AuthService";
import { PatientInputProperties } from "../../types/PatientInputProperties";
import { Credentials } from "../Credentials";
import { IJsonRPCRequest } from "./jsonRpcRequest";
import { PatientModel } from "../../models/PatientModel";
import { UserSign } from "../../types/UserSign";
export declare class AuthService extends JsonRPCService implements IAuthService {
    private authCred_;
    private authServerEndpoint_;
    private ehrServerEndpoint_;
    private authExchangeTokenMethod_;
    private authExchangeTokenExtra_;
    /**
     * В конструктор передается endpoint сервера авторизации и endpoint сервера мед данных.
     *
     * @param authServerEndpoint endpoint сервера авторизации
     * @param ehrServerEndpoint endpoint сервера мед данных
     * @param request функция, выполняющая запрос
     * @param authCred параметры доступа к обоим серверам
     */
    constructor(ehrServerEndpoint: string, authServerEndpoint: string, cred: Credentials, request: IJsonRPCRequest, exchangeTokenMethod: string, exchangeTokenExtra: object);
    /**
     * Метод выполняет запрос к серверу авторизации для генерации и предоставления exchange_token.
     *
     * @param {Function} cb
     */
    getExchangeToken(cb: (err: any, res: ExchangeTokenResponse) => void): void;
    getExchangeTokenAsync(): Promise<ExchangeTokenResponse>;
    /**
     * Метод выполняет запрос к EHR серверу для аутентификации пользователя по его данным.
     *
     * Авторизация выполняется через ранее полученный exchangeToken.
     *
     * @param {string} exchangeToken короткоживущий токен обмена
     * @param {string} searchStrategy
     * @param {PatientInputProperties} patientProperties информация о пациенте для сопоставления
     * @param {string} medCardId
     * @param {Function} cb
     */
    authenticate(exchangeToken: string, searchStrategy: string, patientProperties: PatientInputProperties, medCardId: string, cb: (err: any, patient: PatientModel, userSign: UserSign) => void): void;
    authenticateAsync(exchangeToken: string, searchStrategy: string, patientProperties: PatientInputProperties, medCardId: string): Promise<{
        patient: PatientModel;
        userSign: UserSign;
    }>;
    /**
     * Удаление сопоставления креденшиалов пользователя и пациента в МИСе.
     * Удаляет так же все активные сессии данного пользователя.
     *
     * @param cb
     */
    removeAuthentication(cb: (err: any) => void): void;
    removeAuthenticationAsync(): Promise<void>;
    /**
     * Удаление пользовательской сессии.
     *
     * @param cb
     */
    removeAuthInfo(cb: (err: any) => void): void;
    removeAuthInfoAsync(): Promise<void>;
}
