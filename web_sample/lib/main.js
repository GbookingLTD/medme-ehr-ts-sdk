
requirejs.config({
    baseUrl: './lib',
    paths: {
        handlebars: "./handlebars.amd",
        MedMe:'../../dist/browser/bundle',
        bootstrap: "./bootstrap",
        jquery: "./jquery.slim.min"
    },
    shim:{
        bootstrap: {
            deps: ["jquery"]
        }
    }
});

requirejs(['src/index', 'handlebars', 'bootstrap'], function(MedMe, Handlebars) {

    Handlebars.registerHelper('showDuration', function(val) {
        return val + " мин.";
    });
    Handlebars.registerHelper('showListOfNames', function(arr) {
        return arr.map(function(item) {
            return item.name;
        }).join(', ');
    });
    Handlebars.registerHelper('showDate', function(val) {
        return (new Date(val)).toISOString();
    });
    Handlebars.registerHelper('showPrice', function(price) {
        return price ? price.originValue + " руб." : "0 руб.";
    });
    Handlebars.registerHelper('boolYesNo', function(val) {
        return val ? "Да" : "Нет";
    });

    // TODO It should goes to i18n resources.
    var AppointmentConfirmationStatus = [
        "Временная",
        "Подтверждена клиентом",
        "Подтверждена бизнесом",
        "Отменена клиеном",
        "Отменена бизнесом"
    ];
    Handlebars.registerHelper('showConfirmationStatus', function(val) {
        return AppointmentConfirmationStatus[val];
    });

    var Templates = {};
    ["appointment-line-template"].forEach(function(id) {
        var source   = document.getElementById(id).innerHTML;
        Templates[id] = Handlebars.compile(source);
    });
      

    var JsonRPC = MedMe.EHR.Services.JsonRPC;

    var service;
    if (location.hostname === "localhost")
        service = new JsonRPC.AppointmentService("http://localhost:9999/", JsonRPC.Transports.xhr);
    else 
        service = new JsonRPC.AppointmentService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);

    service.getPatientAppointments("1", 10, 0, function(appointments) {
        appointments.forEach(function(app) {
            var template = Templates["appointment-line-template"];
            var html = template(app);
            document.getElementById('appointments-table-body')
                .insertAdjacentHTML('beforeend', html);
        });
    });

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

        service.saveAppointment(form, function(appModel) {
            // TODO Append a new appointment to the list
        });
    }

    var submitButton = document.querySelector("#save-appointment-dialog .btn-primary");
    submitButton.addEventListener('click', function(ev) {
        saveAppointment();
    });
});