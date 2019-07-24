import { PatientInfo } from "../types/PatientInfo";
import { PatientModel } from "../models/PatientModel";
import { IPatientService } from "./PatientService";

export class ExchangeTokenResponse {
    public exchangeToken: string;
}

export class AuthInfo {
    public user: string;
    public token: string;
    public ttl: string;
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
    getExchangeToken(cb: (res: ExchangeTokenResponse) => void): void;

    /**
     * Метод выполняет запрос к EHR серверу для аутентификации пользователя по его данным.
     * 
     * @param {string} exchangeToken короткоживущий токен обмена
     * @param {PatientInfo} patientInfo информация о пациенте для сопоставления
     */
    authenticate(exchangeToken: string, patientInfo: PatientInfo, cb: (patient: PatientModel) => void): void;
    
}

/**
 * Интерфейс предоставляет доступ к методам аутентификации пользователя для сервера авторизации.
 */
export interface IBackgroundAuthService {

    /**
     * Запрос сохранение данных авторизации на EHR сервер.
     * 
     * @param authInfo 
     */
    saveAuthInfo(authInfo: AuthInfo): void;

    /**
     * Запрос на сохранение токена обмена по EHR сервер.
     * 
     * @param exchangeToken 
     * @param authInfo 
     */
    saveExchangeToken(exchangeToken: string, authInfo: AuthInfo): void;

}

export class AuthenticatedPatient {
    public patientAuthenticated: boolean;
    public patientFound: boolean;
    public patient: PatientModel;
    public constructor() {
        this.patientAuthenticated = false;
        this.patientFound = false;
        this.patient = null;
    }
}

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
 * @param {IAuthService} patientInputPromise
 * @param {Promise<PatientInfo>} patientInput
 * @param {function} cb
 */
export function getPatientOrLogin(patientService: IPatientService, authService: IAuthService, 
        patientInput: Promise<PatientInfo>, cb: (authenticated: AuthenticatedPatient) => void) {
    patientService.getPatient((err: any, patient?: PatientModel) => {
        if (err.notAuthenticate) {
            return authService.getExchangeToken((res: ExchangeTokenResponse) => {
                let exchangeToken = res.exchangeToken;
                patientInput.then((patientInfo: PatientInfo) => {
                    authService.authenticate(exchangeToken, patientInfo, (patient: PatientModel) => {
                        let authenticated = new AuthenticatedPatient();
                        authenticated.patient = patient;
                        authenticated.patientAuthenticated = true;
                        cb(authenticated);
                    });
                });
            });
        }

        let authenticated = new AuthenticatedPatient();
        authenticated.patient = patient;
        authenticated.patientFound = true;
        cb(authenticated);
    });
}