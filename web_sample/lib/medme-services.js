
// получаем креденшиалы из localStorage.
// если не получили - берем из GET параметров строки запроса.
// если не получили - показываем сообщение об ошибке.
function setupCredentials(cred, clientRef) {
    var params = location.search.substr(1).split("&").reduce(function (ret, item) {
        var p=item.indexOf('=');
        if (p<0) return ret;
        ret[item.substr(0, p)] = item.substr(p+1);
        return ret;
    }, {});

    if (params.user && params.token && params.client) {
        localStorage.auth_cred_user = cred.user = params.user;
        localStorage.auth_cred_token = cred.token = params.token;
        localStorage.auth_cred_client = clientRef.client = params.client;
        return ;
    }
    
    if (localStorage.auth_cred_user && localStorage.auth_cred_token && localStorage.auth_cred_client) {
        cred.user = localStorage.auth_cred_user;
        cred.token = localStorage.auth_cred_token;
        clientRef.client = localStorage.auth_cred_client;
    }
}

define('medme-services', ['MedMe', 'env'], function(MedMe, envModule) {
    // Initialize API services
    var JsonRPC = MedMe.EHR.Services.JsonRPC;

    var cred = new MedMe.EHR.Services.Credentials();
    var clientRef = {};
    setupCredentials(cred, clientRef);

    // Показываем креденшиалы в специальной плашке.
    // Показываем сообщение об ошибке, если не удалось получить параметры доступа.
    var credUserEl = document.getElementById('credentials_user');
    var credTokenEl = document.getElementById('credentials_token');
    var credClientEl = document.getElementById('credentials_client');
    if (!(cred && cred.user && cred.token && clientRef.client)) {
        if (credUserEl) credUserEl.innerText = 'unknown';
        if (credTokenEl) credTokenEl.innerText = 'unknown';
        if (credClientEl) credClientEl.innerText = 'unknown';
        alert("Укvажите в адресной строке GET параметры user, token, client");
    } else {
        if (credUserEl) credUserEl.innerText = cred.user;
        if (credTokenEl) credTokenEl.innerText = cred.token;
        if (credClientEl) credClientEl.innerText = clientRef.client;
    }

    var env = envModule.current;

    var appointmentService = new JsonRPC.AppointmentService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var appointmentResultService = new JsonRPC.AppointmentResultService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var prescriptionService = new JsonRPC.PrescriptionService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var diagnosticReportService = new JsonRPC.DiagnosticReportService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var patientService = new JsonRPC.PatientService(env.ehrEndpoint, cred, JsonRPC.Transports.xhr);
    var authService = new JsonRPC.AuthService(env.ehrEndpoint, env.authEndpoint, cred, JsonRPC.Transports.xhr,
        env.exchangeTokenMethod, {business:{id: env.businessId}, network: {id: env.networkId}, client:{id: clientRef.client}});

    return {
        appointmentService: appointmentService,
        appointmentResultService: appointmentResultService,
        prescriptionService: prescriptionService,
        diagnosticReportService: diagnosticReportService,
        patientService: patientService,
        authService: authService,
        env: {
            PATIENT_ID: null, // it should be filled after authorization (see medme-app)
            client: clientRef.client
        }
    };
});
