define('clients-info', ['handlebars',
    'text!../partials/clients-info.html'
], function(Handlebars, template) {
    return {
        renderPanel: function(clientsModule) {
            var clients = {};
            clients.current = Object.assign({}, clientsModule.current);
            clients.list = [{
                name: "<unknown>",
                value: "",
                selected: false
            }];
            var foundSelected = false;
            for (var k in clientsModule.list) {
                clients.list.push(Object.assign({}, clientsModule.list[k]));
                clients.list[clients.list.length - 1].value = clientsModule.list[k].client;
                if (clientsModule.current) {
                    clients.list[clients.list.length - 1].selected =
                        clientsModule.list[k].client === clientsModule.current.client;
                    if (clients.list[clients.list.length - 1].selected)
                        foundSelected = true;

                }
            }

            if (!foundSelected)
                clients.list[0].selected = true;

            var templateFn = Handlebars.compile(template);
            var html = templateFn(clients);
            document.getElementById('medme-clients-info-container').innerHTML = '';
            document.getElementById('medme-clients-info-container').insertAdjacentHTML('beforeend', html);

            document.getElementById('medme-client-value').addEventListener('change', function(ev) {
                // при указании нового сервера устанавливаем его в GET параметр перегружаем страницу
                var urlParams = new URLSearchParams(window.location.search);
                var selected = clientsModule.list.find(function(c) {
                    return c.client === ev.target.selectedOptions[0].value;
                });

                if (selected) {
                    urlParams.set('user', selected.user);
                    urlParams.set('token', selected.token);
                    urlParams.set('client', selected.client);
                    window.location.search = '?' + urlParams.toString();
                }
            });
        }
    };
});