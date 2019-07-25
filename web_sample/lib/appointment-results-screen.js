define('appointment-results-screen', ['handlebars',
        'index', 
        'medme-app',
        'text!../partials/appointment-results.html',
        'text!../partials/appointment-result-line-template.html',
        'appointment-result-dialog',
    ], function(Handlebars, MedMe, medmeApp, appointmentResultsTable, appointmentResultLineTemplate, appointmentResultDialog) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', appointmentResultsTable);
            appointmentResultDialog.render(document.getElementById('mainContent'));

            var appointmentResultLineTemplateFn = Handlebars.compile(appointmentResultLineTemplate);
            // infoklinika patient_id "10045940"
            medmeApp.appointmentResultService.getPatientAppointmentResults(MedMe.PATIENT_ID, 10, 0, function(appointmentResults) {
                appointmentResults.forEach(function(app) {
                    var html = appointmentResultLineTemplateFn(app);
                    document.getElementById('appointment-results-table-body')
                        .insertAdjacentHTML('beforeend', html);
                });
            });
        }
    };
});
