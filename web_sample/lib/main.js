
requirejs.config({
    baseUrl: './lib',
    paths: {
        handlebars: "./handlebars.amd",
        MedMe:'../../dist/browser/bundle',
        bootstrap: "./bootstrap",
        jquery: "./jquery.slim.min"
    },
    shim:{
        bootstrap: {
            deps: ["jquery"]
        }
    }
});


requirejs([
    'auth',
    'index',
    'env',
    'env-info',
    'clients-settings',
    'clients-info'
], function(auth, MedMe, env, envInfo, clients, clientsInfo) {
    envInfo.renderPanel(MedMe.EHR.SDK_VERSION, env);
    clientsInfo.renderPanel(clients);
    auth.login(document.getElementById('mainContent'), function(authenticatedPatient) {
        if (authenticatedPatient)
            requirejs(['medme-app']);
    });
});
