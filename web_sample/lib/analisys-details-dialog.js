// диалог для сохранения записи на прием
define("analisys-details-dialog", [
  "jquery",
  "MedMe",
  "medme-app",
  "text!../partials/analisys-details-dialog.html",
  "bootstrap",
], function ($, MedMe, medmeApp, dialog) {
  return {
    render: function (containerElement) {
      containerElement.insertAdjacentHTML("beforeend", dialog);

      $("#analisys-details-dialog").on("shown.bs.modal", function (e) {
        var id = $(e.relatedTarget).data("id");
        medmeApp.diagnosticReportService.getDiagnosticReportById(
          id,
          function (err, dr) {
            console.log("dr.id:" + dr.id);
            var formatter = new MedMe.EHR.Formatters.SimpleTextFormatter(
              MedMe.EHR.Formatters.SimpleTextFormatter.LOCALIZE["ru-ru"]
            );
            document.querySelector("#analisys-details-text pre").innerText =
              formatter.diagnosticReport(dr);
          }
        );
      });
    },
  };
});
