define("auth", [
  "MedMe",
  "medme-services",
  "handlebars",
  "auth-dialog",
  "text!../partials/auth-error.html",
], function (
  MedMe,
  medmeServices,
  Handlebars,
  authDialog,
  authErrorMessageTemplate
) {
  function getStepName(err) {
    // Формируем сообщение об ошибке
    var step;
    switch (err.step) {
      case MedMe.EHR.Services.PatientAuthenticationStep.patient:
        step = "получение пациента";
        break;

      case MedMe.EHR.Services.PatientAuthenticationStep.exchangeToken:
        step = "получение токена обмена";
        break;

      case MedMe.EHR.Services.PatientAuthenticationStep.input:
        step = "ввод данных пациента";
        break;

      case MedMe.EHR.Services.PatientAuthenticationStep.authenticate:
        step = "аутентификация пациента";
        break;
    }

    return step;
  }

  var containerElement;
  var authErrorMessageFn = Handlebars.compile(authErrorMessageTemplate);

  function handleAuthorizationError(err) {
    containerElement.innerHTML = "";
    containerElement.insertAdjacentHTML(
      "beforeend",
      authErrorMessageFn({
        message: "Ошибка авторизации! Пожалуйста, переавторизуйтесь!",
        step: getStepName(err),
        stack: err.stack,
      })
    );
    $("#auth-error").modal("show");
  }

  function handleEhrServerDisabledError(err) {
    containerElement.innerHTML = "";
    containerElement.insertAdjacentHTML(
      "beforeend",
      authErrorMessageFn({
        message:
          "ЭМК в настоящее время недоступна. В скором времени мы вернем доступ. Пожайлуста, сохраняйте терпение.",
        step: getStepName(err),
        stack: err.stack,
      })
    );
    $("#auth-error").modal("show");
  }

  function handleAuthenticationError(err) {
    containerElement.innerHTML = "";
    containerElement.insertAdjacentHTML(
      "beforeend",
      authErrorMessageFn({
        message:
          "ЭМК не найдено! Пожалуйста, обратитесь в клинику для получения доступа к вашей мед карте по телефону ...",
        step: getStepName(err),
        stack: err.stack,
      })
    );
    $("#auth-error").modal("show");
  }

  function handlePatientLinkedError(err) {
    containerElement.innerHTML = "";
    containerElement.insertAdjacentHTML(
      "beforeend",
      authErrorMessageFn({
        message: "Данный пациент уже привязан к другому пользователю",
        step: getStepName(err),
        stack: err.stack,
      })
    );
    $("#auth-error").modal("show");
  }

  function handleCommonError(err) {
    containerElement.innerHTML = "";
    containerElement.insertAdjacentHTML(
      "beforeend",
      authErrorMessageFn({
        step: getStepName(err),
        stack: err.stack,
      })
    );
    $("#auth-error").modal("show");
  }

  // локальный in_memory кеш данных аутентификации
  var _authenticatedPatient;
  return {
    // доступ к кешу данных аутентификации
    getAuthenticatedPatient: function () {
      if (!_authenticatedPatient) throw Error("expected login before");

      return _authenticatedPatient.patient;
    },
    login: function (containerEl, cb) {
      // Сохраняем данные аутентификации в локальную область видимости и
      // берем оттуда, если уже есть аутентификация.
      if (_authenticatedPatient) return cb(_authenticatedPatient);

      containerElement = containerEl;

      function getPatientInput(next) {
        // показывает форму ввода пользовательских данных
        authDialog.render(containerElement);
        authDialog.onLogin(next);
      }
      function authenticatedPatient(err, data) {
        // Обрабатываем ошибки авторизации
        var PatientAuthenticationError =
          MedMe.EHR.Services.PatientAuthenticationError;

        // Ошибка - сервер ЭМК недоступен.
        // Проверку на ошибку недоступности ЭМК необходимо производить перед
        // проверкой на ошибку соединения сети.
        if (err && PatientAuthenticationError.isEhrServerDisabled(err))
          return handleEhrServerDisabledError(err);

        // Ошибка соединения сети
        if (err && PatientAuthenticationError.isConnectionError(err))
          return alert("Не удалось установить соединение");

        // Ошибка авторизации
        if (
          err &&
          (PatientAuthenticationError.isAuthorizationError(err) ||
            PatientAuthenticationError.patientAlreadyMatched(err))
        )
          return handleAuthorizationError(err);

        // Обрабатываем ошибку аутентификации
        if (err && PatientAuthenticationError.isAuthenticationError(err))
          return handleAuthenticationError(err);

        if (err && PatientAuthenticationError.patientAlreadyLinked(err))
          return handlePatientLinkedError(err);

        // Обрабатываем остальные ошибки
        // Показать пользователю, что что-то пошло не так, дать сообщение с просьбой отправить тех. информацию
        if (err) return handleCommonError(err);

        containerElement.innerHTML = "";
        $(".modal-backdrop").remove();

        // Сохраняем данные аутентификации в локальный in_memory кеш
        _authenticatedPatient = data;
        cb(data);
      }

      const url = new URLSearchParams(location.search);
      const et = url.get("et");
      if (et) {
        MedMe.EHR.Services.getAuthenticatedPatientByExchangeToken(
          et,
          medmeServices.authService,
          getPatientInput,
          authenticatedPatient
        );
      } else {
        // здесь вызывается базовый сценарий логина.
        // когда пользователь авторизован вернуть данные по нему.
        // когда не авторизован - показать форму ввода аутефикационных данных.
        MedMe.EHR.Services.getAuthenticatedPatient(
          medmeServices.patientService,
          medmeServices.authService,
          getPatientInput,
          authenticatedPatient
        );
      }
    },
    // удаляем пользовательскую сессию.
    logout: function (containerEl, cb) {
      containerElement = containerEl;
      medmeServices.authService.removeAuthInfo(function (err) {
        // Обрабатываем ошибку авторизации
        // Поскольку цель данного метода удалить сессию, то ошибка авторизации означает, что сессия уже неактивна
        var PatientAuthenticationError =
          MedMe.EHR.Services.PatientAuthenticationError;
        if (err && PatientAuthenticationError.isAuthorizationError(err))
          return cb();

        // Обрабатываем остальные ошибки
        // Показать пользователю, что что-то пошло не так, дать сообщение с просьбой отправить тех. информацию
        if (err) return handleCommonError(err);

        cb();
      });
    },
    // Удаление сопоставления креденшиалов пользователя и пациента в МИСе.
    // Удаляет так же все активные сессии данного пользователя.
    closeAccess: function (containerEl, cb) {
      containerElement = containerEl;
      medmeServices.authService.removeAuthentication(function (err) {
        // Обрабатываем ошибку авторизации
        var PatientAuthenticationError =
          MedMe.EHR.Services.PatientAuthenticationError;
        if (err && PatientAuthenticationError.isAuthorizationError(err))
          return handleAuthorizationError(err);

        // Обрабатываем остальные ошибки
        // Показать пользователю, что что-то пошло не так, дать сообщение с просьбой отправить тех. информацию
        if (err) return handleCommonError(err);

        cb();
      });
    },
  };
});
