import { PatientInputProperties } from "../types/PatientInputProperties";
import { IPatientService } from "./PatientService";
import { UserSign } from "../types/UserSign";
import { PatientMessage } from "../messages/PatientMessage";
export declare class ExchangeTokenResponse {
    exchangeToken: string;
}
export declare class AuthInfo {
    user: string;
    token: string;
    ttl: string;
}
/**
 * Интерфейс предоставляет доступ к методам аутентификации пользователя для конечного приложения.
 */
export interface IAuthService {
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
     * @param {string} exchangeToken короткоживущий токен обмена
     * @param {string} searchStrategy
     * @param {PatientInputProperties} patientProperties информация о пациенте для сопоставления
     * @param {string} medCardId
     * @param {Function} cb
     */
    authenticate(exchangeToken: string, searchStrategy: string, patientProperties: PatientInputProperties, medCardId: string, cb: (err: any, patient: PatientMessage, userSign: UserSign) => void): void;
    authenticateAsync(exchangeToken: string, searchStrategy: string, patientProperties: PatientInputProperties, medCardId: string): Promise<{
        patient: PatientMessage;
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
export declare class PatientAuthenticationResult {
    patientAuthenticated: boolean;
    patientFound: boolean;
    patient: PatientMessage;
    userSign: UserSign;
    constructor();
}
/**
 * Перечисление шагов сценария аутентификации пациента.
 */
export declare enum PatientAuthenticationStep {
    patient = 1,
    exchangeToken = 2,
    input = 3,
    authenticate = 4
}
/**
 * Ошибка сценария аутентификации пациента.
 * Инкапсулирует внутри себя ошибку запроса, предоставляет информацию о типе ошибки и
 * информацию о шаге сценария аутентификации, на котором произошла ошибка.
 */
export declare class PatientAuthenticationError extends Error {
    static isAuthorizationError(err: PatientAuthenticationError): boolean;
    static isAuthenticationError(err: PatientAuthenticationError): boolean;
    static isConnectionError(err: PatientAuthenticationError): boolean;
    static isEhrServerDisabled(err: PatientAuthenticationError): boolean;
    static patientAlreadyMatched(err: PatientAuthenticationError): boolean;
    static patientAlreadyLinked(err: PatientAuthenticationError): boolean;
    readonly step: PatientAuthenticationStep;
    readonly internalError: any;
    constructor(aStep: PatientAuthenticationStep, anInternalError: any);
}
export declare class ConnectionError extends Error {
    __proto__: Error;
    constructor();
}
/**
 * Тип колбека для функции ввода аутентификационных данных пользователем.
 */
export declare type AuthenticateInputResultCallback = (err: any, searchStrategy: string, patientProperties: PatientInputProperties, medCardId: string) => void;
/**
 * Функция, реализующая сценарий проверки аутентификации при заходе пользователя в Мед.карту.
 *
 * 1. Запрос на получение данных пациента.
 * 2.1. Если запрос с текущими креденшиалами завершился успешно, возвращаем результат (+статус, что пациент получен стазу)
 * 2.2. Если запрос с текущими креденшиалами завершился ошибкой "пользователь не аутентифицирован", то переходим на п.3
 * 3. Отправляем запрос на обмен токенов на сервер авторизации
 * 4. Получаем через форму ввода от пользователя его аутентификационные данные
 * 5. Выполняем запрос на аутентификацию на EHR сервер. Если запрос завершился успешно, возвращаем результат
 *   (+статус, что пациента аутентифицировали)
 *
 * @param {IPatientService} patientService
 * @param {IAuthService} authService
 * @param {function} patientInput
 * @param {function} cb
 */
export declare function getAuthenticatedPatient(patientService: IPatientService, authService: IAuthService, patientInput: (next: AuthenticateInputResultCallback) => void, cb: (err: any, authenticated?: PatientAuthenticationResult) => void): void;
/**
 * Функция, аналогичная предыдущей, за исключением того, что токен обмена был получен ранее.
 *
 * @param {string} exchangeToken
 * @param {IAuthService} authService
 * @param {function} patientInput
 * @param {function} cb
 */
export declare function getAuthenticatedPatientByExchangeToken(exchangeToken: string, authService: IAuthService, patientInput: (next: AuthenticateInputResultCallback) => void, cb: (err: any, authenticated?: PatientAuthenticationResult) => void): void;
//# sourceMappingURL=AuthService.d.ts.map