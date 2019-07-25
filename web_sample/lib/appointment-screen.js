// aggregate resources of appointmnts screen
define('appointment-screen', ['handlebars',
        'index',
        'medme-app',
        'text!../partials/appointments.html',
        'text!../partials/appointment-line-template.html',
        'appointment-result-dialog',
        'save-appointment-dialog'
    ], function(Handlebars, MedMe, medmeApp, appointmentTable, 
        appointmentLineTemplate, appointmentResultDialog, saveAppointmentDialog) {
    return {
        render: function() {
            document.getElementById('mainContent').innerHTML = '';
            document.getElementById('mainContent').insertAdjacentHTML('beforeend', appointmentTable);
    
            appointmentResultDialog.render(document.getElementById('mainContent'));
            saveAppointmentDialog.render(document.getElementById('mainContent'));

            var appointmentLineTemplateFn = Handlebars.compile(appointmentLineTemplate);
            // infoklinika patient_id "10045940"
            medmeApp.appointmentService.getPatientAppointments(MedMe.PATIENT_ID, 10, 0, function(appointments) {
                appointments.forEach(function(app) {
                    var html = appointmentLineTemplateFn(app);
                    document.getElementById('appointments-table-body')
                        .insertAdjacentHTML('beforeend', html);
                });
            });
            
        }
    };
});