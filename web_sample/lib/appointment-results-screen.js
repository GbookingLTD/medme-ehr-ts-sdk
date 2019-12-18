define('appointment-results-screen', ['handlebars',
        'MedMe',
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
            medmeApp.appointmentResultService.getPatientAppointmentResults(medmeApp.env.PATIENT_ID, 100, 0, function(err, appointmentResults) {
                if (err) {
                    if (err instanceof MedMe.EHR.Services.ConnectionError){
                        return alert("Не удалось установить соединение")
                    } else return alert("Ошибка запроса к ЭМК");
                }
                appointmentResults.forEach(function(app) {
                    var html = appointmentResultLineTemplateFn(app);
                    document.getElementById('appointment-results-table-body')
                        .insertAdjacentHTML('beforeend', html);
                });
            });
        }
    };
});
