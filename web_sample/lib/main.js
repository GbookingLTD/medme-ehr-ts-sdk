
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
    'env',
    'index',
    'env-info'
], function(auth, env, MedMe, envInfo) {
    envInfo.renderPanel(MedMe.EHR.SDK_VERSION, env);
    return;
    auth.login(document.getElementById('mainContent'), function(authenticatedPatient) {
        if (authenticatedPatient)
            requirejs(['medme-app']);
    });
});