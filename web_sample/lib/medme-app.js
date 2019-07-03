function registerHandlebarsHelpers(Handlebars) {
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

    Handlebars.registerHelper('joinParagrathes', function(val) {
        return new Handlebars.SafeString(val.map(function(p) {
            return "<p>"+p+"</p>";
        }).join("\n"));
    });

    Handlebars.registerHelper('showDiagnosis', function(val) {
        return "";
    });

    Handlebars.registerHelper('showProcedures', function(val) {
        return "";
    });

    Handlebars.registerHelper('showPrescriptions', function(val) {
        return "";
    });
}

function route(hash) {
    if (location.hash === '' || hash === "#appointments")
        requirejs(['appointment-screen'], function(screen) {
            screen.render();
        });
    else if (hash === "#appointmentResults")
        requirejs(['appointment-results-screen'], function(screen) {
            screen.render();
        });
}

define('medme-app', ['src/index', 'handlebars'], function(MedMe, Handlebars) {
    registerHandlebarsHelpers(Handlebars);

    // setup default routing
    var hash = location.hash; 
    if (location.hash === "" || location.hash === "#")
        hash = "#appointments";
    document.querySelector('#mainNavigation > a[href="'+hash+'"]').classList.add('disabled');
    route(hash);

    // initialize navigation menu
    document.querySelectorAll('#mainNavigation > a').forEach(function(a) {
        a.addEventListener('click', function(ev) {
            document.querySelector('#mainNavigation > a.disabled').classList.remove('disabled');
            ev.target.classList.add('disabled');
            route(ev.target.getAttribute('href'));
        });
    });

    // Initialize API services
    var JsonRPC = MedMe.EHR.Services.JsonRPC;

    var appointmentService;
    var appointmentResultService;
    if (location.hostname === "localhost") {
        appointmentService = new JsonRPC.AppointmentService("http://localhost:9999/", JsonRPC.Transports.xhr);
        appointmentResultService = new JsonRPC.AppointmentResultService("http://localhost:9999/", JsonRPC.Transports.xhr);
    } else {
        appointmentService = new JsonRPC.AppointmentService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);
        appointmentResultService = new JsonRPC.AppointmentResultService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);
    }

    return {
        appointmentService: appointmentService,
        appointmentResultService: appointmentResultService
    };
});