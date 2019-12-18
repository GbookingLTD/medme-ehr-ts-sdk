define('investigation-screen', ['handlebars',
        'MedMe',
        'medme-app',
        'text!../partials/investigation.html',
        'text!../partials/investigation-line-template.html'
    ], function(Handlebars, MedMe, medmeApp, investigationTable, 
        investigationLineTemplate) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', investigationTable);
        }
    };
});