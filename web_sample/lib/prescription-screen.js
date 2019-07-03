define('prescription-screen', ['handlebars',
        'src/index',
        'medme-app',
        'text!../partials/prescriptions.html',
        'text!../partials/prescription-line-template.html',
    ], function(Handlebars, MedMe, medmeApp, prescriptionTable, prescriptionLineTemplate) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', prescriptionTable);

            var prescriptionLineTemplateFn = Handlebars.compile(prescriptionLineTemplate);
            medmeApp.prescriptionService.getPatientPrescriptions("1", 10, 0, function(prescriptions) {
                prescriptions.forEach(function(app) {
                    var html = prescriptionLineTemplateFn(app);
                    document.getElementById('prescriptions-table-body')
                        .insertAdjacentHTML('beforeend', html);
                });
            });
        }
    };
});