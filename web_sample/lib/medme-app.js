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

    Handlebars.registerHelper('showDiagnosticReportStatus', function(val) {
        return "";
    });

    Handlebars.registerHelper('showObservationType', function(val) {
        var text = [
            "Анализы",
            "Исследования"
        ];
        return text[val];
    });

    Handlebars.registerHelper('links', function(val) {
        if (!val)
            return "";
        return Handlebars.SafeString('<ul>' +
            val.map(function(link) {
                return "<li><a href=\"" + link + "\" /></li>";
            }).join("\n") +
        '</ul>');
    });

    Handlebars.registerHelper('showNames', function(val) {
        return val.map(function(item) { return item.name; }).join(", ");
    });
    
}

function route(hash, done) {
    var fn = function(screen) {
        screen.render();
        if (done) done();
    };
    if (location.hash === '' || hash === "#appointments")
        requirejs(['appointment-screen'], fn);
    else if (hash === "#appointmentResults")
        requirejs(['appointment-results-screen'], fn);
    else if (hash === "#prescriptions")
        requirejs(['prescription-screen'], fn);
    else if (hash === "#analisys")
        requirejs(['analisys-screen'], fn);
    else if (hash === "#investigations")
        requirejs(['investigation-screen'], fn);
}

define('medme-app', ['src/index', 'handlebars'], function(MedMe, Handlebars) {
    registerHandlebarsHelpers(Handlebars);

    // setup default routing
    var hash = location.hash; 
    if (location.hash === "" || location.hash === "#")
        hash = "#appointments";

    route(hash, function() {
        document.querySelector('#mainNavigation > a[href="'+hash+'"]').classList.add('disabled');
    });

    // initialize navigation menu
    document.querySelectorAll('#mainNavigation > a').forEach(function(a) {
        a.addEventListener('click', function(ev) {
            route(ev.target.getAttribute('href'), function done() {
                document.querySelector('#mainNavigation > a.disabled').classList.remove('disabled');
                ev.target.classList.add('disabled');
            });
        });
    });

    // Initialize API services
    var JsonRPC = MedMe.EHR.Services.JsonRPC;

    var appointmentService;
    var appointmentResultService;
    var prescriptionService;
    var diagnosticReportService;
    if (location.hostname === "localhost") {
        appointmentService = new JsonRPC.AppointmentService("http://localhost:9999/", JsonRPC.Transports.xhr);
        appointmentResultService = new JsonRPC.AppointmentResultService("http://localhost:9999/", JsonRPC.Transports.xhr);
        prescriptionService = new JsonRPC.PrescriptionService("http://localhost:9999/", JsonRPC.Transports.xhr);
        diagnosticReportService = new JsonRPC.DiagnosticReportService("http://localhost:9999/", JsonRPC.Transports.xhr);
    } else {
        appointmentService = new JsonRPC.AppointmentService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);
        appointmentResultService = new JsonRPC.AppointmentResultService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);
        prescriptionService = new JsonRPC.PrescriptionService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);
        diagnosticReportService = new JsonRPC.DiagnosticReportService("http://ehr.dev.gbooking.ru/", JsonRPC.Transports.xhr);
    }

    return {
        appointmentService: appointmentService,
        appointmentResultService: appointmentResultService,
        prescriptionService: prescriptionService,
        diagnosticReportService: diagnosticReportService
    };
});