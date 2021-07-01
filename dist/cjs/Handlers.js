"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handlers = void 0;
var Handlers = /** @class */ (function () {
    function Handlers() {
    }
    Handlers.HANDLER_GET_APPOINTMENT_BY_ID = 100;
    Handlers.HANDLER_GET_APPOINTMENT_BY_ID_METHOD = "appointment.get_appointment_by_id";
    Handlers.HANDLER_SAVE_APPOINTMENT = 101;
    Handlers.HANDLER_SAVE_APPOINTMENT_METHOD = "appointment.save_appointment";
    Handlers.HANDLER_GET_PATIENT_APPOINTMENTS = 102;
    Handlers.HANDLER_GET_PATIENT_APPOINTMENTS_METHOD = "appointment.get_patient_appointments";
    Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID = 200;
    Handlers.HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD = "appointment_result.get_appointment_result_by_id";
    Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS = 201;
    Handlers.HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD = "appointment_result.get_patient_appointment_results";
    Handlers.HANDLER_GET_PRESCRIPTION_BY_ID = 300;
    Handlers.HANDLER_GET_PRESCRIPTION_BY_ID_METHOD = "prescription.get_prescription_by_id";
    Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS = 301;
    Handlers.HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD = "prescription.get_patient_prescriptions";
    Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID = 400;
    Handlers.HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD = "diagnostic_report.get_diagnostic_report_by_id";
    Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS = 401;
    Handlers.HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD = "diagnostic_report.get_patient_diagnostic_reports";
    Handlers.HANDLER_SAVE_AUTH_INFO = 500;
    Handlers.HANDLER_SAVE_AUTH_INFO_METHOD = "embedded_storage.save_auth_info";
    Handlers.HANDLER_SAVE_EXCHANGE_TOKEN = 501;
    Handlers.HANDLER_SAVE_EXCHANGE_TOKEN_METHOD = "embedded_storage.save_exchange_token";
    Handlers.HANDLER_AUTHENTICATE = 502;
    Handlers.HANDLER_AUTHENTICATE_METHOD = "embedded_storage.authenticate";
    Handlers.HANDLER_REMOVE_AUTH_INFO = 503;
    Handlers.HANDLER_REMOVE_AUTH_INFO_METHOD = "embedded_storage.remove_auth_info";
    Handlers.HANDLER_REMOVE_AUTHENTICATION = 504;
    Handlers.HANDLER_REMOVE_AUTHENTICATION_METHOD = "embedded_storage.remove_authentication";
    Handlers.HANDLER_GET_PATIENT = 600;
    Handlers.HANDLER_GET_PATIENT_METHOD = "patient.get_patient";
    return Handlers;
}());
exports.Handlers = Handlers;
