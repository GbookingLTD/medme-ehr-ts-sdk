define('prescription-screen', ['handlebars',
        'index',
        'medme-app',
        'text!../partials/prescriptions.html',
        'text!../partials/prescription-line-template.html',
    ], function(Handlebars, MedMe, medmeApp, prescriptionTable, prescriptionLineTemplate) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', prescriptionTable);

            var prescriptionLineTemplateFn = Handlebars.compile(prescriptionLineTemplate);
            medmeApp.prescriptionService.getPatientPrescriptions(medmeApp.env.PATIENT_ID, 10, 0, function(err, prescriptions) {
                if (err) {
                    if (err instanceof MedMe.EHR.Types.ConnectionError){
                        return alert("Не удалось установить соединение")
                    } else return alert("Ошибка запроса к ЭМК");
                }
                prescriptions.forEach(function(app) {
                    var html = prescriptionLineTemplateFn(app);
                    document.getElementById('prescriptions-table-body')
                        .insertAdjacentHTML('beforeend', html);
                });
            });
        }
    };
});