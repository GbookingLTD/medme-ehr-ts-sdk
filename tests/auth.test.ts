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
import { Gender } from '../src/types/Gender';
import { PatientModel } from '../src/models/PatientModel';
import { login, readUserSignFile, writeUserSignFile } from './login';
import {IJsonRpcHeader, IJsonRPCRequest, IJsonRpcResponseCallback} from "../src/services/jsonRPC/jsonRpcRequest";
import {RpcErrorCodes, isAuthorizationError} from "../src/services/RpcErrorCodes";
import {PatientInputProperties} from "../src/types";
import { UserSign } from '../src/types/UserSign';
import { AUTH_SERVER_ENDPOINT, EHR_SERVER_ENDPOINT } from './env';
import { authPatientInputProperties } from './fixtures';

const getUserSignFile = (user) => __dirname + "/" + user + "_ehr_user_sign.txt";

describe('Auth', function() {
    // Для выполения запросов аутентификации мы должны предварительно получить от сервера авторизации user, token.
    //
    // В одном из сценариев, когда пользователь аутентифицирован на EHR сервер,
    // сервер авторизации должен отправить user, token на EHR сервер.
    // Когда пользователь не аутентифицирован - должен не отправлять (отдельный запрос на exchange_token).
    //
    // В случае тестового сервера авторизации в запросе на получение user, token отправляем параметр user_ehr_sign.
    // При этом внутри сервера авторизации отправляется запрос на ЭМК сервер на сохранение данных сессии.
    // На реальном сервере авторизации этот параметр должен быть сохранен во внутреннем состоянии сервера.

    async function authenticate(service: IAuthService, exchangeToken: string, searchStrategy: string,
        patientInfo: PatientInputProperties, medCardId: string): Promise<{patient: PatientModel, userSign: UserSign}> {
        const {patient, userSign} = await service.authenticateAsync(exchangeToken, searchStrategy, patientInfo, medCardId);
        if (!userSign)
            throw new Error("userSign expected");

        checkPatient(patient);
        return {patient, userSign};
    }

    class ErrorNoExcangeToken extends Error {}

    /**
     * Authenticate patient by patient properties.
     *
     * @param authCred
     * @param done
     */
    async function exchangeTokenAndAuthenticateByPhone(authCred: Credentials): Promise<{patient: PatientModel, userSign: UserSign}> {
        let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT,
            AUTH_SERVER_ENDPOINT,
            authCred,
            JsonRPC.Transports.xhr,
            "auth.exchange_token",
            []);

        const res = await authService.getExchangeTokenAsync();
        if (!(res && res.exchangeToken))
            throw new ErrorNoExcangeToken("expected exchangeToken");

        const {patient, userSign} =
            await authenticate(authService, res.exchangeToken, "PHONE", authPatientInputProperties, "");
        writeUserSignFile(authCred.user, userSign);

        return {patient, userSign};
    }

    /**
     * Authenticate patient by patient properties.
     *
     * @param authCred
     * @param done
     */
    async function exchangeTokenAndAuthenticateByMedCard(authCred: Credentials) {
        let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT,
            AUTH_SERVER_ENDPOINT,
            authCred,
            JsonRPC.Transports.xhr,
            "auth.exchange_token",
            []);

        const res = await authService.getExchangeTokenAsync();

        if (!(res && res.exchangeToken))
            throw new ErrorNoExcangeToken("expected exchangeToken");

        const {patient, userSign} =
            await authenticate(authService, res.exchangeToken, "MEDCARD", authPatientInputProperties, "123456");
        writeUserSignFile(authCred.user, userSign);

        return {patient, userSign};
    }

    const isSameDates = function(a: Date, b: Date) {
        return a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate();
    }


    function checkPatient(patient: PatientModel) {
        const input = authPatientInputProperties;
        assert.strictEqual(patient.id, input.id);
        assert.strictEqual(patient.name, input.name);
        assert.strictEqual(patient.surname, input.surname);
        // assert.ok(isSameDates(patient.birthdate, input.date));
        assert.strictEqual(patient.gender, input.gender);
        assert.deepStrictEqual(patient.phones, [input.phone]);
    }

    function checkLinkedError(err) {
        if (!err)
            assert.fail();

        if(err.code == RpcErrorCodes.PatientAlreadyLinked)
            assert.ok(true);
        else
            throw new err;
    }

    // Удаляем запись в таблице сопоставления на стороне ЭМК сервера.
    // Авторизуемся через ehr_user_sign - на стороне ЭМК есть наша сессия.
    async function cleanAuthentication(userPublicID: string) {
        const ehrUserSign = readUserSignFile(userPublicID) || undefined;
        const authCred = await login(userPublicID, ehrUserSign);

        let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT,
            AUTH_SERVER_ENDPOINT,
            authCred,
            JsonRPC.Transports.xhr,
            "",
            []);

        return await authService.removeAuthenticationAsync();
    }

    describe('jsonRPC', function() {
        // Сценарий аутентификации:
        // 0. Удаляем запись в таблице сопоставления на стороне ЭМК сервера,
        //    чтобы не получить ошибку PatientAlreadyLinked.
        //    При этом, удалятся все сессии по этому профилю на стороне ЭМК.
        // 1. Получаем от тестового сервера user, token (без ehr_user_sign)
        // 2. Отправляем запрос на exchange_token
        // 3. Отправляем запрос на аутентификацию
        // Запрос на аутентификацию должен пройти успешно - привязывать одного и того же
        // EHR пациента к новому пользователю (параметр user).
        it('authenticateByPhone', async function() {
            const userPublicID = "user999";

            // await cleanAuthentication(userPublicID);
            const authCred = await login(userPublicID, undefined);
            await exchangeTokenAndAuthenticateByPhone(authCred);
        });

        it('authenticateByMedCard', async function() {
            const userPublicID = "user999";

            // await cleanAuthentication(userPublicID);
            const authCred = await login(userPublicID, undefined);
            await exchangeTokenAndAuthenticateByMedCard(authCred);
        });

        // Сценарий логина аутентифицированного пользователя:
        // 1. Получаем от тестового сервера user, token (отправляем запрос с ehr_user_sign).
        //    Он должен отправить эти данные на EHR сервер.
        // 2. Сделать запрос на получение данных пациента - данные должны вернуться успешно.
        it('loginWithExistsUser', async function() {
            const userPublicID = "user999";
            const ehrUserSign = readUserSignFile(userPublicID);
            const authCred = await login(userPublicID, ehrUserSign);
            let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, null, JsonRPC.Transports.xhr);
            const {patient, userSign} = await patientService.getPatientAsync();
            checkPatient(patient);
        });

        it('patientLinkConflict', async function() {
            const authCred = await login("User" + Date.now(), undefined);
            try {
                await exchangeTokenAndAuthenticateByPhone(authCred);
                await exchangeTokenAndAuthenticateByPhone(authCred);
                assert.fail('Linked error must be thrown');
            } catch (err) {
                checkLinkedError(err);
            }
        });
    });

    describe('getAuthenticatedPatient', function () {
        it('not_authenticated', async () => {
            const authCred = await login("User123c", undefined);
            let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, null, JsonRPC.Transports.xhr);

            try {
                await patientService.getPatientAsync();
                assert.fail();
            } catch (err) {
                if (err && isAuthorizationError(err))
                    assert.ok(true);
                else
                    throw new err;
            }
        });
    })

    const xhrConnectionError: IJsonRPCRequest = function(endpoint: string, header: IJsonRpcHeader, requestPayload: object,
                                                 cb: IJsonRpcResponseCallback) {
        return cb(new ConnectionError(), null);
    };

    describe('error', function () {
        it('ehr_connection error',  async () => {
            const authCred = await login("User123", undefined);

            let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, null, xhrConnectionError);
            let authService = new JsonRPC.AuthService(EHR_SERVER_ENDPOINT,
                AUTH_SERVER_ENDPOINT,
                authCred,
                xhrConnectionError,
                "auth.exchange_token",
                []);

            return new Promise((res, rej) => {
                getAuthenticatedPatient(patientService,
                    authService,
                    next => next(null, null, null, null),
                    function (err) {
                        if (!PatientAuthenticationError.isEhrServerDisabled(err))
                            return rej(err);

                        res();
                    });
            });
        });
    })

    describe('callbackHandlers', function () {
        it('not_authenticated', async () => {
            const authCred = await login("User123c", undefined);

            const patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, null, JsonRPC.Transports.xhr);

            let flag = false;

            patientService.onAuthNotAuthorized = () => flag = true;
            patientService.onAuthUnknownAuthError = () => flag = true;

            return new Promise((res, rej) => {
                patientService.getPatient((err, patient) => {
                    if (!flag)
                        return rej("callback should be called");

                    if (err && isAuthorizationError(err))
                        return res();

                    rej(err);
                });
            });
        });

        function fakeXhr(endpoint: string, header: IJsonRpcHeader, requestPayload: object,
                         cb: IJsonRpcResponseCallback) {
            cb({code: RpcErrorCodes.AuthExpired, message: '', data:null})
        }

        it('expired', async () => {
            const authCred = await login("User123c", undefined);
            let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, null, fakeXhr);

            let flag = false;

            patientService.onAuthExpired = () => flag = true;

            return new Promise((res, rej) => {
                patientService.getPatient((err, patient) => {
                    if (!flag)
                        return rej("callback should be called");

                    if (err && isAuthorizationError(err))
                        return res();

                    rej(err);
                });
            });
        });
    })
});