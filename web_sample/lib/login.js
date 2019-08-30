define('login', ['index',
        'medme-app',], function(MedMe, medmeApp) {
    return function login(req) {
        MedMe.EHR.Services.getPatientOrLogin(req);
    };
});