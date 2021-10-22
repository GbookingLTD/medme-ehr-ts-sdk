import { SimpleTextFormatter } from "../src/formatters/SimpleTextFormatter";
import { FieldsFormatter } from "../src/formatters/FieldsFormatter";
import * as assert from "assert";
import { presciption, appointmentResult } from "./fixtures";
import { LocaleCode } from "../src/formatters/LocaleCode";

describe("SimpleTextFormatter", function () {
  it("Prescription not empty and works", function () {
    let formatter = new SimpleTextFormatter(
      SimpleTextFormatter.LOCALIZE["ru-ru"]
    );

    let formatted = formatter.prescription(presciption, "");

    assert(formatted);
  });

  it("Formatter without empty strings", function () {
    let formatter = new SimpleTextFormatter(
      SimpleTextFormatter.LOCALIZE["ru-ru"]
    );

    let formatted = formatter.appointmentResult(appointmentResult);

    assert(
      !formatted.includes(
        SimpleTextFormatter.LOCALIZE["ru-ru"]["appointmentResult"][
          "scheduledProcedures"
        ]
      )
    );
  });
});

describe("FieldsFormatter", () => {
  it("appointmentResult", () => {
    const fmt = FieldsFormatter.create(LocaleCode.ruRU);

    const fields = fmt.appointmentResult(appointmentResult);

    //console.info(fields);
  });
});
