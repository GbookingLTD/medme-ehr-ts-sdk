export var FamilyMemberType;
(function (FamilyMemberType) {
    FamilyMemberType[FamilyMemberType["FamilyMember"] = 1] = "FamilyMember";
    FamilyMemberType[FamilyMemberType["Child"] = 2] = "Child";
    FamilyMemberType[FamilyMemberType["AdoptedChild"] = 3] = "AdoptedChild";
    FamilyMemberType[FamilyMemberType["Parent"] = 4] = "Parent";
    FamilyMemberType[FamilyMemberType["AdoptiveParent"] = 5] = "AdoptiveParent";
    FamilyMemberType[FamilyMemberType["Husband"] = 6] = "Husband";
    FamilyMemberType[FamilyMemberType["Wife"] = 7] = "Wife";
    FamilyMemberType[FamilyMemberType["Brother"] = 8] = "Brother";
    FamilyMemberType[FamilyMemberType["Sister"] = 9] = "Sister";
    FamilyMemberType[FamilyMemberType["ExtendedFamilyMember"] = 10] = "ExtendedFamilyMember";
})(FamilyMemberType || (FamilyMemberType = {}));
var FamilyMember = /** @class */ (function () {
    function FamilyMember() {
    }
    return FamilyMember;
}());
export { FamilyMember };
