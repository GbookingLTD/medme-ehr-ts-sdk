"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProcedureExecStatus;
(function (ProcedureExecStatus) {
    ProcedureExecStatus[ProcedureExecStatus["Scheduled"] = 0] = "Scheduled";
    ProcedureExecStatus[ProcedureExecStatus["InProgress"] = 1] = "InProgress";
    ProcedureExecStatus[ProcedureExecStatus["Rejected"] = 2] = "Rejected";
    ProcedureExecStatus[ProcedureExecStatus["Completed"] = 3] = "Completed";
})(ProcedureExecStatus = exports.ProcedureExecStatus || (exports.ProcedureExecStatus = {}));
