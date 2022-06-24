"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cd10 = exports.Diagnosis = exports.TypeDiagnosis = exports.KindDiagnosis = void 0;
var KindDiagnosis;
(function (KindDiagnosis) {
    // основное
    KindDiagnosis[KindDiagnosis["Base"] = 0] = "Base";
    // осложнение
    KindDiagnosis[KindDiagnosis["Complication"] = 1] = "Complication";
    // сопутсвующее
    KindDiagnosis[KindDiagnosis["Related"] = 2] = "Related";
})(KindDiagnosis = exports.KindDiagnosis || (exports.KindDiagnosis = {}));
// характер заболевания
var TypeDiagnosis;
(function (TypeDiagnosis) {
    // острое заболевание
    TypeDiagnosis[TypeDiagnosis["AcuteDisease"] = 0] = "AcuteDisease";
    // хроническое заболевание, впервые выявлено
    TypeDiagnosis[TypeDiagnosis["ChronicalFirst"] = 1] = "ChronicalFirst";
    // хроническое заболевание, ранее выявленное
    TypeDiagnosis[TypeDiagnosis["ChronicalEarly"] = 2] = "ChronicalEarly";
})(TypeDiagnosis = exports.TypeDiagnosis || (exports.TypeDiagnosis = {}));
var Diagnosis = /** @class */ (function () {
    function Diagnosis() {
    }
    return Diagnosis;
}());
exports.Diagnosis = Diagnosis;
var Cd10 = /** @class */ (function () {
    function Cd10() {
    }
    return Cd10;
}());
exports.Cd10 = Cd10;
