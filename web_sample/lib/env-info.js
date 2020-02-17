define('env-info', ['handlebars',
    'text!../partials/env-info.html'
], function(Handlebars, template) {
    return {
        renderPanel: function(SDK_VERSION, envModule) {
            var env = {};
            env.SDK_VERSION = SDK_VERSION;

            env.current = Object.assign({}, envModule.current);
            env.list = [];
            for (var k in envModule.list) {
                env.list.push(Object.assign({}, envModule.list[k]));
                env.list[env.list.length - 1].value = k;
                env.list[env.list.length - 1].selected =
                    envModule.list[k].name === envModule.current.name;
            }

            fetch(env.current.ehrEndpoint, {
                method: 'POST',
                body: JSON.stringify({
                    "jsonrpc": "2.0",
                    "id": 1,
                    "method": "api_info.healthcheck",
                    "params": {}
                })
            }).then(response => response.json())
                .then(function (data) {
                    if (data && data.result){
                        env.current.version = data.result.version;
                    }
                })
                .catch(r => env.current.version = "NA")
                .finally(function() {
                    var templateFn = Handlebars.compile(template);
                    var html = templateFn(env);
                    document.getElementById('env-info-container').innerHTML = '';
                    document.getElementById('env-info-container').insertAdjacentHTML('beforeend', html);

                    document.getElementById('server-name-value').addEventListener('change', function(ev) {
                        // при указании нового сервера устанавливаем его в GET параметр перегружаем страницу
                        var urlParams = new URLSearchParams(window.location.search);
                        urlParams.set('env', ev.target.selectedOptions[0].value);
                        window.location.search = '?' + urlParams.toString();
                    });
                })
        }
    };
});