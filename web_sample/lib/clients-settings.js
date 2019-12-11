define('clients-settings', ['env', 'clients-data'], function(env, clients) {
    // фильтруем пользователей для показа в зависимости от окружения
    var envAuthServer = env.current.authEndpoint;
    clients = clients.filter(function(c) {
        return !!c.authServers.find(function(s) {
            return envAuthServer.indexOf(s) >= 0;
        });
    });

    var urlParams = new URLSearchParams(window.location.search);
    var inputClient = urlParams.client || localStorage.auth_cred_client
    var current = clients.find(function(c) {
        return c.client === inputClient;
    });

    return {
        list: clients,
        current: current
    };
});