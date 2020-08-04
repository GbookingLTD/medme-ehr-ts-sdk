export var ProcedureExecStatus;
(function (ProcedureExecStatus) {
    ProcedureExecStatus[ProcedureExecStatus["Scheduled"] = 0] = "Scheduled";
    ProcedureExecStatus[ProcedureExecStatus["InProgress"] = 1] = "InProgress";
    ProcedureExecStatus[ProcedureExecStatus["Rejected"] = 2] = "Rejected";
    ProcedureExecStatus[ProcedureExecStatus["Completed"] = 3] = "Completed";
})(ProcedureExecStatus || (ProcedureExecStatus = {}));
