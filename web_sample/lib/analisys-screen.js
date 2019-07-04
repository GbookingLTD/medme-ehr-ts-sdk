define('analisys-screen', ['handlebars',
        'src/index',
        'medme-app',
        'text!../partials/analisys.html',
        'text!../partials/analisys-line-template.html'
    ], function(Handlebars, MedMe, medmeApp, analisysTable, 
        analisysLineTemplate) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', analisysTable);
        }
    };
});