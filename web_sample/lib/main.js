
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
    'auth'
], function(auth) {
    auth.login(document.getElementById('mainContent'), function(authenticatedPatient) {
        if (authenticatedPatient)
            requirejs(['medme-app']);
    });
});