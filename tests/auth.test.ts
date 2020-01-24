"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import {
    IAuthService,
    ExchangeTokenResponse,
    getAuthenticatedPatient,
    AuthInfo,
    PatientAuthenticationError, ConnectionError
} from '../src/services/AuthService';
import { Credentials } from '../src/services/Credentials';
import { PatientInfo } from '../src/types/PatientInfo';
import { Gender } from '../src/types/Gender';
import { PatientModel } from '../src/models/PatientModel';
import { login, AUTH_SERVER_ENDPOINT, EHR_SERVER_ENDPOINT } from './login';
import {rejects} from "assert";
import {IJsonRpcHeader, IJsonRPCRequest, IJsonRpcResponseCallback} from "../src/services/jsonRPC/jsonRpcRequest";
import {RpcErrorCodes, isAuthorizationError} from "../src/services/RpcErrorCodes";
import {PatientInputProperties} from "../src/types";
import {AuthService} from "../src/services/jsonRPC/AuthService";
import {requestCred} from "../src/services/jsonRPC/jsonrpc_cred";

describe('Auth', function() {
    // Для выполения запросов аутентификации мы должны получить от сервера авторизации user, token.
    //
    // В одном из сценариев, когда пользователь аутентифицирован на EHR сервер,
    // сервер авторизации должен отправить user, token на EHR сервер. 
    // Когда пользователь не аутентифицирован - должен не отправлять (отдельный запрос на exchange_token).
    // 
    // В случае тестового сервера авторизации в запросе на получение user, token отправляем параметр "user_is_authenticate".
    // Если user_is_authenticate=1 - данные авторизации идут в EHR.
    // На реальном сервере авторизации этот параметр должен быть сохранен во внутреннем состоянии сервера.

    function getExchangeToken(service: IAuthService, cb: (err: any, res: ExchangeTokenResponse) => void) {
        service.getExchangeToken(function(err, res) {
            cb(err, res);
        });
    }

    function authenticate(service: IAuthService, exchangeToken: string, searchStrategy: string, patientInfo: PatientInputProperties, medCardId: string, cb: (err?: any) => void) {
        service.authenticate(exchangeToken, searchStrategy, patientInfo, medCardId, function(err: any, patient: PatientModel, userSign: string) {
            if (err)
                return cb(err);

            if (!userSign)
                return cb("userSign expected");

            checkPatient(patient);
            cb();
        });
    }

    /**
     * Authenticate patient by patient properties. 
     * 
     * @param authCred
     * @param done
     */
    function exchangeTokenAuthenticateByPhone(authCred: Credentials, done: (err?: any) => void) {
        let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT, 
            AUTH_SERVER_ENDPOINT,
            authCred, 
            JsonRPC.Transports.xhr,
            "auth.exchange_token",
            []);
        getExchangeToken(authService, function(err: any, res: ExchangeTokenResponse) {
            if (err)
                return done("expected exchange token");

            if (!(res && res.exchangeToken))
                return done("expected exchangeToken");

            let exchangeToken: string = res.exchangeToken;
            if (!exchangeToken)
                return done("expected finished previous test");

            let patientProperties = new PatientInputProperties();
            patientProperties.name = "John";
            patientProperties.surname = "Smith";
            patientProperties.middleName = "";
            patientProperties.date = new Date(Date.parse("2000-01-01 00:00:00Z"));
            patientProperties.phone = "1111111111";
            patientProperties.gender = Gender.Male;
            authenticate(authService, exchangeToken, "PHONE", patientProperties, "", done);
        });
    }

    /**
     * Authenticate patient by patient properties. 
     * 
     * @param authCred
     * @param done
     */
    function exchangeTokenAuthenticateByMedCard(authCred: Credentials, done: (err?: any) => void) {
        let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT, 
            AUTH_SERVER_ENDPOINT,
            authCred, 
            JsonRPC.Transports.xhr,
            "auth.exchange_token",
            []);
        getExchangeToken(authService, function(err: any, res: ExchangeTokenResponse) {
            if (err)
                return done("expected exchange token");

            if (!(res && res.exchangeToken))
                return done("expected exchangeToken");

            let exchangeToken: string = res.exchangeToken;
            if (!exchangeToken)
                return done("expected finished previous test");

            let patientProperties = new PatientInputProperties();
            patientProperties.name = "John";
            patientProperties.surname = "Smith";
            patientProperties.middleName = "";
            patientProperties.date = new Date(Date.parse("2000-01-01 00:00:00Z"));
            patientProperties.phone = "1111111111";
            patientProperties.gender = Gender.Male;
            authenticate(authService, exchangeToken, "MEDCARD", patientProperties, "123", done);
        });
    }

    const isSameDates = function(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }
      

    function checkPatient(patient: PatientModel) {
        assert.equal(patient.id, "1");
        assert.equal(patient.name, "John");
        assert.equal(patient.surname, "Smith");
        assert.equal(isSameDates(patient.birthdate, new Date(Date.parse("2000-01-01 00:00:00Z"))), true);
        assert.equal(patient.gender, Gender.Male);
        assert.deepStrictEqual(patient.phones, ["1111111111"]);
    }

    function checkLinkedError(err, done: (err?: any) => void){
        if (err)
        {
            if(err.code == RpcErrorCodes.PatientAlreadyLinked)
                return done();
            else
                return done(err);
        }
    }

    describe('jsonRPC', function() {
        // Сценарий аутентификации:
        // 1. Получаем от тестового сервера user, token (user_is_authenticate=0)
        // 2. Отправляем запрос на exchange_token
        // 3. Отправляем запрос на аутентификацию
        // Запрос на аутентификацию должен пройти успешно - привязывать одного и того же 
        // EHR пациента к новому пользователю (параметр user).
        it('authenticateByPhone', function(done) {
            const userPublicID = "user999";
            login(userPublicID, undefined, function(err: any, authCred: Credentials) {
                if (err) return done(err);

                let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT,
                    AUTH_SERVER_ENDPOINT,
                    authCred,
                    JsonRPC.Transports.xhr,
                    "auth.exchange_token__not_used",
                    []);
                authService.removeAuthInfo(function(err) {
                    if (err) return done(err);
                    exchangeTokenAuthenticateByPhone(authCred, done);
                });
            });
        });
        it('authenticateByMedCard', function(done) {
            const userPublicID = "user999";
            // TODO Remove matching by user public id
            login(userPublicID, undefined, function(err: any, authCred: Credentials) {
                if (err) return done(err);

                exchangeTokenAuthenticateByMedCard(authCred, done);
            });
        });

        // Сценарий логина аутентифицированного пользователя:
        // 1. Получаем от тестового сервера user, token (user_is_authenticate=1).
        //    Он должен отправить эти данные на EHR сервер.
        // 2. Сделать запрос на получение данных пациента - данные должны вернуться успешно.
        it('loginWithExistsUser', function(done) {
            login("user123", 'user_sign_222', function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, JsonRPC.Transports.xhr);
                patientService.getPatient(function(patErr?: any, patient?: PatientModel, userSign?: string) {
                    if (patErr) return done(patErr);
                    checkPatient(patient);
                    done();
                });
            });
        });

        it('patientLinkConflict', function(done) {
            login("User" + Date.now(), undefined, function(err: any, authCred: Credentials) {
                if (err) return done(err);

                exchangeTokenAuthenticateByPhone(authCred, function (err) {
                    if (err)
                        return checkLinkedError(err, done);

                    exchangeTokenAuthenticateByPhone(authCred, function (err) {
                        if (err)
                            return checkLinkedError(err, done);

                        done('Linked error must be thrown');
                    })
                });
            });
        });
    })

    describe('getAuthenticatedPatient', function () {
        it ('not_authenticated', done => {
            login("User123c", undefined, function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, JsonRPC.Transports.xhr);

                patientService.getPatient((err1, patient) => {
                    if (err1 && isAuthorizationError(err1))
                        done()
                    else
                        done(err1)
                })
            });
        });
    })

    const xhrConnectionError: IJsonRPCRequest = function(endpoint: string, header: IJsonRpcHeader, requestPayload: object,
                                                 cb: IJsonRpcResponseCallback) {
        return cb(new ConnectionError(), null);
    };

    describe('error', function () {
        it ('ehr_connection error', done => {
            login("User123", undefined, function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, xhrConnectionError);
                let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT,
                    AUTH_SERVER_ENDPOINT,
                    authCred,
                    xhrConnectionError,
                    "auth.exchange_token",
                    []);

                getAuthenticatedPatient(patientService,
                    authService,
                    next => next(null, null, null, null),
                    function (err1) {
                        assert(PatientAuthenticationError.isEhrServerDisabled(err1));
                        done();
                    });
            });
        });
    })

    describe('callbackHandlers', function () {
        it ('not_authenticated', done => {
            login("User123c", undefined, function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, JsonRPC.Transports.xhr);

                patientService.onAuthNotAuthorized = () => done();
                patientService.onAuthUnknownAuthError = () => done();

                patientService.getPatient((err1, patient) => {
                    if (err1 && isAuthorizationError(err1)) return;
                    done(err1);
                });
            });
        });

        function fakeXhr(endpoint: string, header: IJsonRpcHeader, requestPayload: object,
                         cb: IJsonRpcResponseCallback) {
            cb({code: RpcErrorCodes.AuthExpired, message: '', data:null})
        }

        it ('expired', done => {
            login("User123c", undefined, function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, fakeXhr);

                patientService.onAuthExpired = () => done();

                patientService.getPatient((err1, patient) => {
                    if (err1 && isAuthorizationError(err1)) return;
                    done(err1);
                });
            });
        });
    })
});