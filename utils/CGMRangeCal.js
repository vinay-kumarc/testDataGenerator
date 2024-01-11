export function getInterpretation(value) {
  try {
    let coding = {};
    const sys =
      "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation";

    if (value < 1.7) {
      coding = {
        system: sys,
        code: "-20",
        display: "Very low",
      };
    } else if (value < 4.4) {
      coding = {
        system: sys,
        code: "-10",
        display: "Low",
      };
    } else if (value < 7.2) {
      coding = {
        system: sys,
        code: "0",
        display: "Target",
      };
    } else if (value < 13.9) {
      coding = {
        system: sys,
        code: "10",
        display: "High",
      };
    } else if (value < 33.3) {
      coding = {
        system: sys,
        code: "20",
        display: "Very high",
      };
    }

    return {
      text: null,
      coding: [coding],
    };
  } catch (e) {
    console.error("Something went wrong in getInterpretation" + e);
  }
}
