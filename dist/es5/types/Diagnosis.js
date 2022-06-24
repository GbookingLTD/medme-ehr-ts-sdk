export var KindDiagnosis;
(function (KindDiagnosis) {
    // основное
    KindDiagnosis[KindDiagnosis["Base"] = 0] = "Base";
    // осложнение
    KindDiagnosis[KindDiagnosis["Complication"] = 1] = "Complication";
    // сопутсвующее
    KindDiagnosis[KindDiagnosis["Related"] = 2] = "Related";
})(KindDiagnosis || (KindDiagnosis = {}));
// характер заболевания
export var TypeDiagnosis;
(function (TypeDiagnosis) {
    // острое заболевание
    TypeDiagnosis[TypeDiagnosis["AcuteDisease"] = 0] = "AcuteDisease";
    // хроническое заболевание, впервые выявлено
    TypeDiagnosis[TypeDiagnosis["ChronicalFirst"] = 1] = "ChronicalFirst";
    // хроническое заболевание, ранее выявленное
    TypeDiagnosis[TypeDiagnosis["ChronicalEarly"] = 2] = "ChronicalEarly";
})(TypeDiagnosis || (TypeDiagnosis = {}));
var Diagnosis = /** @class */ (function () {
    function Diagnosis() {
    }
    return Diagnosis;
}());
export { Diagnosis };
var Cd10 = /** @class */ (function () {
    function Cd10() {
    }
    return Cd10;
}());
export { Cd10 };
