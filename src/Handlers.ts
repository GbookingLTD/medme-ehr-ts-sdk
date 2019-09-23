
export class Handlers {
    static readonly HANDLER_GET_APPOINTMENT_BY_ID = 100;
    static readonly HANDLER_GET_APPOINTMENT_BY_ID_METHOD = "appointment.get_appointment_by_id";
    static readonly HANDLER_SAVE_APPOINTMENT = 101;
    static readonly HANDLER_SAVE_APPOINTMENT_METHOD = "appointment.save_appointment";
    static readonly HANDLER_GET_PATIENT_APPOINTMENTS = 102;
    static readonly HANDLER_GET_PATIENT_APPOINTMENTS_METHOD = "appointment.get_patient_appointments";
    static readonly HANDLER_GET_APPOINTMENT_RESULT_BY_ID = 200;
    static readonly HANDLER_GET_APPOINTMENT_RESULT_BY_ID_METHOD = "appointment_result.get_appointment_result_by_id";
    static readonly HANDLER_GET_PATIENT_APPOINTMENT_RESULTS = 201;
    static readonly HANDLER_GET_PATIENT_APPOINTMENT_RESULTS_METHOD = "appointment_result.get_patient_appointment_results";
    static readonly HANDLER_GET_PRESCRIPTION_BY_ID = 300;
    static readonly HANDLER_GET_PRESCRIPTION_BY_ID_METHOD = "prescription.get_prescription_by_id";
    static readonly HANDLER_GET_PATIENT_PRESCRIPTIONS = 301;
    static readonly HANDLER_GET_PATIENT_PRESCRIPTIONS_METHOD = "prescription.get_patient_prescriptions";
    static readonly HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID = 400;
    static readonly HANDLER_GET_DIAGNOSTIC_REPORT_BY_ID_METHOD = "diagnostic_report.get_diagnostic_report_by_id";
    static readonly HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS = 401;
    static readonly HANDLER_GET_PATIENT_DIAGNOSTIC_REPORTS_METHOD = "diagnostic_report.get_patient_diagnostic_reports";
    
    static readonly HANDLER_SAVE_AUTH_INFO = 500;
    static readonly HANDLER_SAVE_AUTH_INFO_METHOD = "embedded_storage.save_auth_info";
    static readonly HANDLER_SAVE_EXCHANGE_TOKEN = 501;
    static readonly HANDLER_SAVE_EXCHANGE_TOKEN_METHOD = "embedded_storage.save_exchange_token";
    static readonly HANDLER_AUTHENTICATE = 502;
    static readonly HANDLER_AUTHENTICATE_METHOD = "embedded_storage.authenticate";
    static readonly HANDLER_REMOVE_AUTH_INFO = 503;
    static readonly HANDLER_REMOVE_AUTH_INFO_METHOD = "embedded_storage.remove_auth_info";
    static readonly HANDLER_REMOVE_AUTHENTICATION = 504;
    static readonly HANDLER_REMOVE_AUTHENTICATION_METHOD = "embedded_storage.remove_authentication";

    static readonly HANDLER_GET_PATIENT = 600;
    static readonly HANDLER_GET_PATIENT_METHOD = "patient.get_patient";
    
    
        


}
