// диалог для сохранения записи на прием
define('save-appointment-dialog', ['jquery', 'MedMe', 'medme-app',
        'text!../partials/save-appointment-dialog.html', 'bootstrap'],
        function($, MedMe, medmeApp, saveAppointmentDialog) {
    function saveAppointment() {
        var form = new MedMe.EHR.Types.AppointmentInputProperties();
        ['businessId', 'doctorId', 'start', 'duration'].forEach(function(id) {
            form[id] = document.getElementById(id).value;
        });
        form.patientId = "1";
        form.source = 1;
        form.services = ["1"];
        form.clientPrice = new MedMe.EHR.Types.ClientPrice();
        form.clientPrice.currency = MedMe.EHR.Types.Currency.Rur;
        form.clientPrice.originValue = 222;
        form.clientPrice.discountValue = 0;
        form.clientPrice.value = 222;
        form.clientPrice.discount = null;

        medmeApp.appointmentService.saveAppointment(form, function(appModel) {
            // TODO Append a new appointment to the list
        });
    }

    return {
        render: function(containerElement) {
            containerElement.insertAdjacentHTML('beforeend', saveAppointmentDialog);
                    
            var submitButton = document.querySelector("#save-appointment-dialog .btn-primary");
            submitButton.addEventListener('click', function(ev) {
                saveAppointment();
            });
        }
    };
});