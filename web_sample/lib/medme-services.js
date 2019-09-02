
// получаем креденшиалы из localStorage.
// если не получили - берем из GET параметров строки запроса.
// если не получили - показываем сообщение об ошибке.
function setupCredentials(cred) {
    if (localStorage.auth_cred_user && localStorage.auth_cred_token) {
        cred.user = localStorage.auth_cred_user;
        cred.token = localStorage.auth_cred_token;
    } else {
        var params = location.search.substr(1).split("&").reduce(function (ret, item) {
            var p=item.indexOf('=');
            if (p<0) return ret;
            ret[item.substr(0, p)] = item.substr(p+1);
            return ret;
        }, {});

        if (params.user && params.token) {
            localStorage.auth_cred_user = cred.user = params.user;
            localStorage.auth_cred_token = cred.token = params.token;
        }
    }
}

define('medme-services', ['index'], function(MedMe) {
    // Initialize API services
    var JsonRPC = MedMe.EHR.Services.JsonRPC;

    var cred = new MedMe.EHR.Services.Credentials();
    setupCredentials(cred);

    // Показываем креденшиалы в специальной плашке.
    // Показываем сообщение об ошибке, если не удалось получить параметры доступа.
    var credUserEl = document.getElementById('credentials_user');
    var credTokenEl = document.getElementById('credentials_token');
    if (!(cred && cred.user && cred.token)) {
        if (credUserEl) credUserEl.innerText = 'unknown';
        if (credTokenEl) credTokenEl.innerText = 'unknown';
        alert("Укажите в адресной строке GET параметры user, token");
    } else {
        if (credUserEl) credUserEl.innerText = cred.user;
        if (credTokenEl) credTokenEl.innerText = cred.token;
    }

    var envSettings = {
        "localhost": {
            ehrEndpoint: "http://localhost:9999/",
            authEndpoint: "http://localhost:4321",
            exchangeTokenMethod: "auth.exchange_token"
        },
        "default": {
            ehrEndpoint: "http://ehr.dev.gbooking.ru/",
            authEndpoint: "http://api2.dev.gbooking.ru/rpc",
            exchangeTokenMethod: "client.get_exchange_token"
        }
    };

    var env = envSettings[location.hostname] || envSettings["default"];

    var appointmentService = new JsonRPC.AppointmentService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var appointmentResultService = new JsonRPC.AppointmentResultService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var prescriptionService = new JsonRPC.PrescriptionService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var diagnosticReportService = new JsonRPC.DiagnosticReportService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var patientService = new JsonRPC.PatientService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var authService = new JsonRPC.AuthService(env.ehrEndpoint, env.authEndpoint, cred, JsonRPC.Transports.xhr,
        env.exchangeTokenMethod);

    return {
        appointmentService: appointmentService,
        appointmentResultService: appointmentResultService,
        prescriptionService: prescriptionService,
        diagnosticReportService: diagnosticReportService,
        patientService: patientService,
        authService: authService,
        env: {
            PATIENT_ID: "1"
            //PATIENT_ID: "10045940"
        }
    };
});
