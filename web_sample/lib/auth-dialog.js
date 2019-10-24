// модальное окно для ввода аутентификационных данных пациента 
define('auth-dialog', [
    'jquery', 
    'index',
    'text!../partials/auth-dialog.html',
    'bootstrap'
], function($, MedMe, authDialogHtml) {
    var _onLoginFn;
    return {
        render: function(containerElement) {
            containerElement.insertAdjacentHTML('beforeend', authDialogHtml);

            var medcardTab = document.getElementById('nav-medcard-tab');
            
            var submitButton = document.querySelector("#auth-dialog .btn-primary");
            submitButton.addEventListener('click', function(ev) {
                ev.preventDefault();

                // patient authentication data initialization
                var patientInfo = new MedMe.EHR.Types.PatientInfo();
                var searchStrategy;
                var medCardId;
                if (medcardTab.classList.contains('active')) {
                    searchStrategy = "MEDCARD";
                    medCardId = document.getElementById('medcard_id').value;
                    patientInfo.phone = document.getElementById('auth_phone_1').value;
                } else {
                    searchStrategy = "PHONE";
                    medCardId = "";
                    patientInfo.name = document.getElementById('auth_name').value;
                    patientInfo.surname = document.getElementById('auth_surname').value;
                    patientInfo.middleName = document.getElementById('auth_patname').value;
                    patientInfo.phone = document.getElementById('auth_phone').value;
                    patientInfo.gender = document.getElementsByName('auth_gender')[0].checked ? 0 : 1;
                    patientInfo.date = document.getElementById('auth_berthday').value + " 00:00:00Z";
                }

                _onLoginFn(null, searchStrategy, patientInfo, medCardId);
            });

            $('#auth-dialog').on('shown.bs.modal', function (e) {
                // initialize form
            });

            $('#auth-dialog').modal('show');
        },
        onLogin: function(cb) {
            _onLoginFn = cb;
        }
    };
});