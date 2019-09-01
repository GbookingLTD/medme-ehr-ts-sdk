define('auth', [
    'index',
    'medme-services',
    'handlebars',
    'auth-dialog', 
    'text!../partials/auth-error.html'
], function(MedMe, medmeServices, Handlebars, authDialog, authErrorMessageTemplate) {

    function getStepName(err) {
        // Формируем сообщение об ошибке
        var step;
        switch (err.step) {
            case MedMe.EHR.Services.PatientAuthenticationStep.patient:
                step = 'получение пациента';
                break;
    
            case MedMe.EHR.Services.PatientAuthenticationStep.exchangeToken:
                step = 'получение токена обмена';
                break;
            
            case MedMe.EHR.Services.PatientAuthenticationStep.input:
                step = 'ввод данных пациента';
                break;
    
            case MedMe.EHR.Services.PatientAuthenticationStep.authenticate:
                step = 'аутентификация пациента';
                break;
        }
    
        return step;
    }

    // локальный in_memory кеш данных аутентификации
    var _authenticatedPatient;
    return {
        getAuthenticatedPatient: function() {
            if (!_authenticatedPatient)
                throw Error("expected login before");

            return _authenticatedPatient.patient;
        },
        // функция логина возвращает promise.
        // в ответ от прамиса приходит авторизованный пользователь.
        login: function (containerElement, cb) {
            // Сохраняем данные аутентификации в локальную область видимости и
            // берем оттуда, если уже есть аутентификация.
            if (_authenticatedPatient)
                return cb(_authenticatedPatient);

            function handleAuthorizationError(err) {
                containerElement.innerHTML = '';
                var authErrorMessageFn = Handlebars.compile(authErrorMessageTemplate);
                containerElement.insertAdjacentHTML('beforeend', authErrorMessageFn({
                    message: "Ошибка авторизации! Пожалуйста, переавторизуйтесь!",
                    step: getStepName(err),
                    stack: err.stack
                }));
                $('#auth-error').modal('show');
            }

            function handleAuthenticationError(err) {
                containerElement.innerHTML = '';
                var authErrorMessageFn = Handlebars.compile(authErrorMessageTemplate);
                containerElement.insertAdjacentHTML('beforeend', authErrorMessageFn({
                    message: "ЭМК не найдено! Пожалуйста, обратитесь в клинику для получения доступа к вашей мед карте по телефону ...",
                    step: getStepName(err),
                    stack: err.stack
                }));
                $('#auth-error').modal('show');
            }

            function handleCommonError(err) {
                containerElement.innerHTML = '';
                var authErrorMessageFn = Handlebars.compile(authErrorMessageTemplate);
                containerElement.insertAdjacentHTML('beforeend', authErrorMessageFn({
                    step: getStepName(err),
                    stack: err.stack
                }));
                $('#auth-error').modal('show');
            }

            // здесь вызывается базовый сценарий логина.
            // когда пользователь авторизован вернуть данные по нему.
            // когда не авторизован - показать форму ввода аутефикационных данных.
            MedMe.EHR.Services.getAuthenticatedPatient(
                medmeServices.patientService,
                medmeServices.authService,
                function getPatientInput(next) {
                    // показывает форму ввода пользовательских данных
                    authDialog.render(containerElement);
                    authDialog.onLogin(next);
                },
                function authenticatedPatient(err, data) {
                    // Обрабатываем ошибку авторизации
                    // В реальном приложении для этой ошибки необходимо перелогинить пользователя
                    var PatientAuthenticationError = MedMe.EHR.Services.PatientAuthenticationError;
                    if (err && (PatientAuthenticationError.isAuthorizationError(err) ||
                            PatientAuthenticationError.patientAlreadyMatched(err)))
                        return handleAuthorizationError(err);

                    // Обрабатываем ошибку аутентификации
                    if (err && PatientAuthenticationError.isAuthenticationError(err))
                        return handleAuthenticationError(err);

                    // Обрабатываем остальные ошибки
                    // Показать пользователю, что что-то пошло не так, дать сообщение с просьбой отправить тех. информацию
                    if (err)
                        return handleCommonError(err);

                    // Сохраняем данные аутентификации в локальный in_memory кеш
                    _authenticatedPatient = data;
                    cb(data);
                });
        },
        logout: function (cb) {
            // навешиваем на  удаляем пользовательскую сессию.
            // medmeApp.authService.removeAuthInfo(cb);
        }
    };
});