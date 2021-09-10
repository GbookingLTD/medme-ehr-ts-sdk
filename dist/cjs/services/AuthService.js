"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthenticatedPatient = exports.ConnectionError = exports.PatientAuthenticationError = exports.PatientAuthenticationStep = exports.PatientAuthenticationResult = exports.AuthInfo = exports.ExchangeTokenResponse = void 0;
var RpcErrorCodes_1 = require("./RpcErrorCodes");
var ExchangeTokenResponse = /** @class */ (function () {
    function ExchangeTokenResponse() {
    }
    return ExchangeTokenResponse;
}());
exports.ExchangeTokenResponse = ExchangeTokenResponse;
var AuthInfo = /** @class */ (function () {
    function AuthInfo() {
    }
    return AuthInfo;
}());
exports.AuthInfo = AuthInfo;
var PatientAuthenticationResult = /** @class */ (function () {
    function PatientAuthenticationResult() {
        this.patientAuthenticated = false;
        this.patientFound = false;
        this.patient = null;
        this.userSign = null;
    }
    return PatientAuthenticationResult;
}());
exports.PatientAuthenticationResult = PatientAuthenticationResult;
/**
 * Перечисление шагов сценария аутентификации пациента.
 */
var PatientAuthenticationStep;
(function (PatientAuthenticationStep) {
    PatientAuthenticationStep[PatientAuthenticationStep["patient"] = 1] = "patient";
    PatientAuthenticationStep[PatientAuthenticationStep["exchangeToken"] = 2] = "exchangeToken";
    PatientAuthenticationStep[PatientAuthenticationStep["input"] = 3] = "input";
    PatientAuthenticationStep[PatientAuthenticationStep["authenticate"] = 4] = "authenticate";
})(PatientAuthenticationStep = exports.PatientAuthenticationStep || (exports.PatientAuthenticationStep = {}));
/**
 * Ошибка сценария аутентификации пациента.
 * Инкапсулирует внутри себя ошибку запроса, предоставляет информацию о типе ошибки и
 * информацию о шаге сценария аутентификации, на котором произошла ошибка.
 */
var PatientAuthenticationError = /** @class */ (function (_super) {
    __extends(PatientAuthenticationError, _super);
    function PatientAuthenticationError(aStep, anInternalError) {
        var _this = _super.call(this, "Patient authentication error") || this;
        _this.step = aStep;
        _this.internalError = anInternalError;
        return _this;
    }
    PatientAuthenticationError.isAuthorizationError = function (err) {
        return err.internalError && RpcErrorCodes_1.isAuthorizationError(err.internalError);
    };
    PatientAuthenticationError.isAuthenticationError = function (err) {
        return (err.step === PatientAuthenticationStep.authenticate &&
            err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientNotAuthenticated);
    };
    PatientAuthenticationError.isConnectionError = function (err) {
        return err.internalError && err.internalError instanceof ConnectionError;
    };
    PatientAuthenticationError.isEhrServerDisabled = function (err) {
        return (err.step === PatientAuthenticationStep.patient &&
            this.isConnectionError(err));
    };
    PatientAuthenticationError.patientAlreadyMatched = function (err) {
        return (err.step === PatientAuthenticationStep.authenticate &&
            err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientAlreadyMatched);
    };
    PatientAuthenticationError.patientAlreadyLinked = function (err) {
        return (err.step === PatientAuthenticationStep.authenticate &&
            err.internalError.code === RpcErrorCodes_1.RpcErrorCodes.PatientAlreadyLinked);
    };
    return PatientAuthenticationError;
}(Error));
exports.PatientAuthenticationError = PatientAuthenticationError;
var ConnectionError = /** @class */ (function (_super) {
    __extends(ConnectionError, _super);
    function ConnectionError() {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "Connection cannot be established") || this;
        // https://github.com/Microsoft/TypeScript/issues/13965
        _this.__proto__ = _newTarget.prototype;
        return _this;
    }
    return ConnectionError;
}(Error));
exports.ConnectionError = ConnectionError;
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
function getAuthenticatedPatient(patientService, authService, patientInput, cb) {
    patientService.getPatient(function (err, patient, userSign) {
        if (err && RpcErrorCodes_1.isAuthorizationError(err))
            return authService.getExchangeToken(function (err, res) {
                if (err)
                    return cb(new PatientAuthenticationError(PatientAuthenticationStep.exchangeToken, err), null);
                var exchangeToken = res.exchangeToken;
                patientInput(function (err, searchStrategy, patientProperties, medCardId) {
                    if (err)
                        return cb(new PatientAuthenticationError(PatientAuthenticationStep.input, err), null);
                    authService.authenticate(exchangeToken, searchStrategy, patientProperties, medCardId, function (err, patient, userSign) {
                        // Возможные типы ошибок:
                        // - пользователь не найден (ошибка аутентификации) - сообщение пользователю
                        // - пользователь уже аутентифицирован - перелогиниться
                        if (err)
                            return cb(new PatientAuthenticationError(PatientAuthenticationStep.authenticate, err), null);
                        var authenticated = new PatientAuthenticationResult();
                        authenticated.patient = patient;
                        authenticated.patientAuthenticated = true;
                        authenticated.userSign = userSign;
                        cb(null, authenticated);
                    });
                });
            });
        // Если возникла какая-то другая ошибка при получении пациента - возвращаем сообщение об ошибке
        if (err)
            return cb(new PatientAuthenticationError(PatientAuthenticationStep.patient, err), null);
        var authenticated = new PatientAuthenticationResult();
        authenticated.patient = patient;
        authenticated.patientFound = true;
        authenticated.userSign = userSign;
        return cb(null, authenticated);
    });
}
exports.getAuthenticatedPatient = getAuthenticatedPatient;
