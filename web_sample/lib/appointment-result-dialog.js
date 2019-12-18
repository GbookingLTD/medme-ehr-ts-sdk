// диалог для сохранения записи на прием
define('appointment-result-dialog', ['jquery', 'MedMe', 'medme-app',
        'text!../partials/appointment-result-dialog.html', 'bootstrap'],
        function($, MedMe, medmeApp, appointmentResultDialog) {
    return {
        render: function(containerElement) {
            containerElement.insertAdjacentHTML('beforeend', appointmentResultDialog);

            $('#appointment-result-dialog').on('shown.bs.modal', function (e) {
                var id = $(e.relatedTarget).data("id");
                medmeApp.appointmentResultService.getAppointmentResultModelById(id, (err, appresult) => {
                    console.log('app_res.id:' + appresult.id);
                    //var template = Templates["appointment-result-template"];
                    //var html = template(appresult);
                    //document.querySelector('#appResultSwitch-form').innerHTML = html;
                    var formatter = new MedMe.EHR.Formatters.SimpleTextFormatter(
                        MedMe.EHR.Formatters.SimpleTextFormatter.LOCALIZE["ru-ru"]);
                    document.querySelector('#appResult-text pre').innerText = formatter.appointmentResult(appresult);
                });
            });
        }
    };
});