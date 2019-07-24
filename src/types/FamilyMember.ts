export enum FamilyMemberType {
    FamilyMember = 1,
    Child,
    AdoptedChild,
    Parent,
    AdoptiveParent,
    Husband,
    Wife,
    Brother,
    Sister,
    ExtendedFamilyMember
}

export class FamilyMember
{
    public type: FamilyMemberType;
    public patientId: string;
}