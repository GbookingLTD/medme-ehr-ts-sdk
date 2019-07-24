"use strict";

import * as assert from 'assert';
import JsonRPC from '../src/services/jsonRPC/index';
import { IAuthService, ExchangeTokenResponse, AuthInfo } from '../src/services/AuthService';
import { Credentials } from '../src/services/Credentials';
import { PatientInfo } from '../src/types/PatientInfo';
import { Gender } from '../src/types/Gender';
import { PatientModel } from '../src/models/PatientModel';
import { login, AUTH_SERVER_ENDPOINT, EHR_SERVER_ENDPOINT } from './login';

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

    function getExchangeToken(service: IAuthService, cb: (res: ExchangeTokenResponse) => void) {
        service.getExchangeToken(function(res) {
            cb(res);
        });
    }

    function authenticate(service: IAuthService, exchangeToken: string, patientInfo: PatientInfo, cb: (err?: any) => void) {
        service.authenticate(exchangeToken, patientInfo, function(patient: PatientModel) {
            checkPatient(patient);
            cb();
        });
    }

    function exchangeTokenAuthenticate(authCred: Credentials, done: (err?: any) => void) {
        let authService = new JsonRPC.AuthService(AUTH_SERVER_ENDPOINT, EHR_SERVER_ENDPOINT, JsonRPC.Transports.xhr, authCred);
        getExchangeToken(authService, function(res: ExchangeTokenResponse) {
            if (!(res && res.exchangeToken))
                return done("expected exchangeToken");

            let exchangeToken: string = null;
            exchangeToken = res.exchangeToken;

            if (!exchangeToken)
                return done("expected finished previous test");

            let patientInfo = new PatientInfo();
            patientInfo.name = "John";
            patientInfo.surname = "Smith";
            patientInfo.date = new Date(Date.parse("2000-01-01 00:00:00Z"));
            patientInfo.phone = "1111111111";
            patientInfo.gender = Gender.Male;
            authenticate(authService, exchangeToken, patientInfo, done);
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
        assert.equal(patient.phone, "1111111111");
    }

    describe('jsonRPC', function() {
        // Сценарий аутентификации:
        // 1. Получаем от тестового сервера user, token (user_is_authenticate=0)
        // 2. Отправляем запрос на exchange_token
        // 3. Отправляем запрос на аутентификацию
        // Запрос на аутентификацию должен пройти успешно - привязывать одного и того же 
        // EHR пациента к новому пользователю (параметр user).
        it('authenticate', function(done) {
            login("User" + Date.now(), false, function(err: any, authCred: Credentials) {
                if (err) return done(err);

                exchangeTokenAuthenticate(authCred, done);
            });
        });

        // Сценарий логина аутентифицированного пользователя:
        // 1. Получаем от тестового сервера user, token (user_is_authenticate=1).
        //    Он должен отправить эти данные на EHR сервер.
        // 2. Сделать запрос на получение данных пациента - данные должны вернуться успешно.
        it('loginWithExistsUser', function(done) {
            login("User123", true, function(err: any, authCred?: Credentials) {
                if (err) return done(err);

                let patientService = new JsonRPC.PatientService(EHR_SERVER_ENDPOINT, authCred, JsonRPC.Transports.xhr);
                patientService.getPatient(function(patient: PatientModel) {
                    checkPatient(patient);
                    done();
                });
            });
        });
    });

});