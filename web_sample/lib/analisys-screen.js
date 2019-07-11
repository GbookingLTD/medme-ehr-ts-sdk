define('analisys-screen', ['handlebars',
        'src/index',
        'medme-app',
        'text!../partials/analisys.html',
        'text!../partials/analisys-line-template.html',
        'analisys-details-dialog'
    ], function(Handlebars, MedMe, medmeApp, analisysTable, 
        analisysLineTemplate, detailsDialog) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', analisysTable);
            detailsDialog.render(document.getElementById('mainContent'));

            var analisysLineTemplateFn = Handlebars.compile(analisysLineTemplate);
            // infoklinika patient_id "10045940"
            medmeApp.diagnosticReportService.getPatientDiagnosticReports("1", 10, 0, function(reports) {
                reports.forEach(function(app) {
                    var html = analisysLineTemplateFn(app);
                    document.getElementById('analisys-table-body')
                        .insertAdjacentHTML('beforeend', html);
                });
            });
        }
    };
});