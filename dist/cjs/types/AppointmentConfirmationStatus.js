"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AppointmentConfirmationStatus;
(function (AppointmentConfirmationStatus) {
    AppointmentConfirmationStatus[AppointmentConfirmationStatus["Tentative"] = 0] = "Tentative";
    AppointmentConfirmationStatus[AppointmentConfirmationStatus["ConfirmedByClient"] = 1] = "ConfirmedByClient";
    AppointmentConfirmationStatus[AppointmentConfirmationStatus["ConfirmedByBusiness"] = 2] = "ConfirmedByBusiness";
    AppointmentConfirmationStatus[AppointmentConfirmationStatus["CancelledByClient"] = 3] = "CancelledByClient";
    AppointmentConfirmationStatus[AppointmentConfirmationStatus["CancelledByBusiness"] = 4] = "CancelledByBusiness";
})(AppointmentConfirmationStatus = exports.AppointmentConfirmationStatus || (exports.AppointmentConfirmationStatus = {}));
