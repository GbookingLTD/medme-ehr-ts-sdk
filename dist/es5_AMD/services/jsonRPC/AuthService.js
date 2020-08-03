var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./jsonRpcService", "../AuthService", "../../Handlers", "../../models/PatientModel"], function (require, exports, jsonRpcService_1, AuthService_1, Handlers_1, PatientModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AuthService = void 0;
    var AuthService = /** @class */ (function (_super) {
        __extends(AuthService, _super);
        /**
         * В конструктор передается endpoint сервера авторизации и endpoint сервера мед данных.
         *
         * @param authServerEndpoint endpoint сервера авторизации
         * @param ehrServerEndpoint endpoint сервера мед данных
         * @param request функция, выполняющая запрос
         * @param authCred параметры доступа к обоим серверам
         */
        function AuthService(ehrServerEndpoint, authServerEndpoint, cred, request, exchangeTokenMethod, exchangeTokenExtra) {
            var _this = _super.call(this, null, request) || this;
            _this.ehrServerEndpoint_ = ehrServerEndpoint;
            _this.authServerEndpoint_ = authServerEndpoint;
            _this.authCred_ = cred;
            _this.authExchangeTokenMethod_ = exchangeTokenMethod;
            _this.authExchangeTokenExtra_ = exchangeTokenExtra;
            return _this;
        }
        /**
         * Метод выполняет запрос к серверу авторизации для генерации и предоставления exchange_token.
         *
         * @param {Function} cb
         */
        AuthService.prototype.getExchangeToken = function (cb) {
            this.exec(this.authExchangeTokenMethod_, this.authExchangeTokenExtra_, function (err, payload) {
                if (err)
                    return cb(err, null);
                var etr = new AuthService_1.ExchangeTokenResponse();
                etr.exchangeToken = payload['exchangeToken'];
                return cb(null, etr);
            }, this.authServerEndpoint_, this.authCred_);
        };
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
        AuthService.prototype.authenticate = function (exchangeToken, searchStrategy, patientProperties, medCardId, cb) {
            if (["PHONE", "MEDCARD"].indexOf(searchStrategy) < 0)
                throw Error("Argument searchStrategy is out of range.");
            var requestData = {
                exchangeToken: exchangeToken,
                searchStrategy: searchStrategy,
                patientProperties: patientProperties,
                medCardId: medCardId
            };
            this.exec(Handlers_1.Handlers.HANDLER_AUTHENTICATE_METHOD, requestData, function (err, payload) {
                if (err)
                    return cb(err, null, null);
                var patient = new PatientModel_1.PatientModel();
                patient.fromJson(payload['patient']);
                if (!payload['userSign'])
                    throw new Error("expect userSign");
                return cb(null, patient, payload['userSign']);
            }, this.ehrServerEndpoint_);
        };
        /**
         * Удаление сопоставления креденшиалов пользователя и пациента в МИСе.
         * Удаляет так же все активные сессии данного пользователя.
         *
         * @param cb
         */
        AuthService.prototype.removeAuthentication = function (cb) {
            this.exec(Handlers_1.Handlers.HANDLER_REMOVE_AUTHENTICATION_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
        };
        /**
         * Удаление пользовательской сессии.
         *
         * @param cb
         */
        AuthService.prototype.removeAuthInfo = function (cb) {
            this.exec(Handlers_1.Handlers.HANDLER_REMOVE_AUTH_INFO_METHOD, {}, cb, this.ehrServerEndpoint_, this.authCred_);
        };
        return AuthService;
    }(jsonRpcService_1.JsonRPCService));
    exports.AuthService = AuthService;
});
