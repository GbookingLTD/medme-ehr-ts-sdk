define('env', ['env-prod'], function(envProd) {
    var getSandboxEnv = function(subDomain, version) {
        return {
            name: subDomain + " - " + version,
            ehrEndpoint: "http://"+subDomain+".dev.gbooking.ru/"+version+"/",
            authEndpoint: "http://api2.dev.gbooking.ru/rpc",
            exchangeTokenMethod: "client.get_exchange_token",
            businessId: "4000000006771",
            role: "development"
        };
    };

    var envSettings = {
        "localhost": {
            name: "localhost",
            ehrEndpoint: "http://localhost:9999/",
            authEndpoint: "http://localhost:4321",
            exchangeTokenMethod: "auth.exchange_token",
            businessId: null,
            role: "development"
        },
        "default": {
            name: "development",
            ehrEndpoint: "http://ehr.dev.gbooking.ru/",
            authEndpoint: "http://api2.dev.gbooking.ru/rpc",
            exchangeTokenMethod: "client.get_exchange_token",
            businessId: "4000000006771",
            role: "development"
        },
        "dev-demo-1.4.4": getSandboxEnv("ehr-demo", "1.4.4-alpha"),
        "dev-demo-1.5.5": getSandboxEnv("ehr-demo", "1.5.5-alpha"),
        "dev-demo-1.6.0": getSandboxEnv("ehr-demo", "1.6.0-alpha"),
        "dev-app-1.4.4": getSandboxEnv("ehr-app", "1.4.4-alpha"),
        "dev-app-1.5.5": getSandboxEnv("ehr-app", "1.5.5-alpha"),
        "dev-app-1.6.0": getSandboxEnv("ehr-app", "1.6.0-alpha")
    };

    Object.keys(envProd).forEach(function(k) {
        envSettings[k] = envProd[k];
    });

    var urlParams = new URLSearchParams(window.location.search);
    return {
        current: envSettings[urlParams.get('env')] || envSettings[location.hostname] || envSettings["default"],
        list: envSettings
    };
});