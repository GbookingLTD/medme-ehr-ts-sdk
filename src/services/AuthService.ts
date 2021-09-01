import { PatientInputProperties } from "../types/PatientInputProperties";
import { PatientModel } from "../models/PatientModel";
import { IPatientService } from "./PatientService";
import { RpcErrorCodes, isAuthorizationError } from "./RpcErrorCodes";
import { UserSign } from "../types/UserSign";

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
  authenticate(
    exchangeToken: string,
    searchStrategy: string,
    patientProperties: PatientInputProperties,
    medCardId: string,
    cb: (err: any, patient: PatientModel, userSign: UserSign) => void
  ): void;
  authenticateAsync(
    exchangeToken: string,
    searchStrategy: string,
    patientProperties: PatientInputProperties,
    medCardId: string
  ): Promise<{ patient: PatientModel; userSign: UserSign }>;

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

export class PatientAuthenticationResult {
  public patientAuthenticated: boolean;
  public patientFound: boolean;
  public patient: PatientModel;
  public userSign: UserSign;
  public constructor() {
    this.patientAuthenticated = false;
    this.patientFound = false;
    this.patient = null;
    this.userSign = null;
  }
}

/**
 * Перечисление шагов сценария аутентификации пациента.
 */
export enum PatientAuthenticationStep {
  patient = 1,
  exchangeToken,
  input,
  authenticate,
}

/**
 * Ошибка сценария аутентификации пациента.
 * Инкапсулирует внутри себя ошибку запроса, предоставляет информацию о типе ошибки и
 * информацию о шаге сценария аутентификации, на котором произошла ошибка.
 */
export class PatientAuthenticationError extends Error {
  public static isAuthorizationError(err: PatientAuthenticationError): boolean {
    return err.internalError && isAuthorizationError(err.internalError);
  }

  public static isAuthenticationError(
    err: PatientAuthenticationError
  ): boolean {
    return (
      err.step === PatientAuthenticationStep.authenticate &&
      err.internalError.code === RpcErrorCodes.PatientNotAuthenticated
    );
  }

  public static isConnectionError(err: PatientAuthenticationError): boolean {
    return err.internalError && err.internalError instanceof ConnectionError;
  }

  public static isEhrServerDisabled(err: PatientAuthenticationError): boolean {
    return (
      err.step === PatientAuthenticationStep.patient &&
      this.isConnectionError(err)
    );
  }

  public static patientAlreadyMatched(
    err: PatientAuthenticationError
  ): boolean {
    return (
      err.step === PatientAuthenticationStep.authenticate &&
      err.internalError.code === RpcErrorCodes.PatientAlreadyMatched
    );
  }

  public static patientAlreadyLinked(err: PatientAuthenticationError): boolean {
    return (
      err.step === PatientAuthenticationStep.authenticate &&
      err.internalError.code === RpcErrorCodes.PatientAlreadyLinked
    );
  }

  public readonly step: PatientAuthenticationStep;
  public readonly internalError: any;

  public constructor(aStep: PatientAuthenticationStep, anInternalError: any) {
    super("Patient authentication error");
    this.step = aStep;
    this.internalError = anInternalError;
  }
}

export class ConnectionError extends Error {
  __proto__: Error;
  constructor() {
    super("Connection cannot be established");
    // https://github.com/Microsoft/TypeScript/issues/13965
    this.__proto__ = new.target.prototype;
  }
}

/**
 * Тип колбека для функции ввода аутентификационных данных пользователем.
 */
export type AuthenticateInputResultCallback = (
  err: any,
  searchStrategy: string,
  patientProperties: PatientInputProperties,
  medCardId: string
) => void;

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
export function getAuthenticatedPatient(
  patientService: IPatientService,
  authService: IAuthService,
  patientInput: (next: AuthenticateInputResultCallback) => void,
  cb: (err: any, authenticated?: PatientAuthenticationResult) => void
) {
  patientService.getPatient(
    (err: any, patient?: PatientModel, userSign?: string) => {
      if (err && isAuthorizationError(err))
        return authService.getExchangeToken(
          (err: any, res: ExchangeTokenResponse) => {
            if (err)
              return cb(
                new PatientAuthenticationError(
                  PatientAuthenticationStep.exchangeToken,
                  err
                ),
                null
              );

            let exchangeToken = res.exchangeToken;
            patientInput(
              (
                err: any,
                searchStrategy: string,
                patientProperties: PatientInputProperties,
                medCardId: string
              ) => {
                if (err)
                  return cb(
                    new PatientAuthenticationError(
                      PatientAuthenticationStep.input,
                      err
                    ),
                    null
                  );

                authService.authenticate(
                  exchangeToken,
                  searchStrategy,
                  patientProperties,
                  medCardId,
                  (err: any, patient: PatientModel, userSign: UserSign) => {
                    // Возможные типы ошибок:
                    // - пользователь не найден (ошибка аутентификации) - сообщение пользователю
                    // - пользователь уже аутентифицирован - перелогиниться
                    if (err)
                      return cb(
                        new PatientAuthenticationError(
                          PatientAuthenticationStep.authenticate,
                          err
                        ),
                        null
                      );

                    let authenticated = new PatientAuthenticationResult();
                    authenticated.patient = patient;
                    authenticated.patientAuthenticated = true;
                    authenticated.userSign = userSign;
                    cb(null, authenticated);
                  }
                );
              }
            );
          }
        );

      // Если возникла какая-то другая ошибка при получении пациента - возвращаем сообщение об ошибке
      if (err)
        return cb(
          new PatientAuthenticationError(
            PatientAuthenticationStep.patient,
            err
          ),
          null
        );

      let authenticated = new PatientAuthenticationResult();
      authenticated.patient = patient;
      authenticated.patientFound = true;
      authenticated.userSign = userSign;
      return cb(null, authenticated);
    }
  );
}
