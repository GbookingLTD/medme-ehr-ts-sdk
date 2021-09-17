import { AppointmentResultMessage } from "../messages/AppointmentResultMessage";
import { Diagnosis } from "../types/Diagnosis";
import { Procedure } from "../types/Procedure";
import { PrescriptionInfo } from "../types/PrescriptionInfo";
import { Medication } from "../types/Medication";
import { DiagnosticReportMessage } from "../messages/DiagnosticReportMessage";
import { Observation } from "../types/Observation";

export type DateFormatFunc = (d: Date) => string;

export const dateISOFormat: DateFormatFunc = function (d: Date): string {
  return d == null ? "" : typeof d === "string" ? d : d.toISOString();
};

export function paragrathes(a: string[]): string {
  if (a.length == 0) return "";
  // this is simple string
  if (a.length == 1 && a[0].length < 100 && a[0].indexOf("\n") < 0) return a[0];
  return a.join("\n\n");
}

export function paragrathes_nl(a: string[], offset: string): string {
  if (a.length == 0) return "";
  return "\n" + offset + a.join("\n\n");
}

export const trim = (str) => str.replace(/^\s+/, "").replace(/\s+$/, "");

export interface IFormatter<T> {
  appointmentResult(ar: AppointmentResultMessage): T;
  procedure(p: Procedure): T;
  prescription(p: PrescriptionInfo): T;
  medication(s: Medication): T;
  diagnosticReport(dr: DiagnosticReportMessage): T;
  observation(o: Observation): T;
}
