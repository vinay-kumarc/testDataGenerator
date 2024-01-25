import { faker } from "@faker-js/faker";
import { createJsonFile } from "../utils/JsonFileCreatorUtil.js";
import { sendDataToBackend } from "../utils/FetchUtil.js";
import { getInterpretation } from "../utils/CGMRangeCal.js";
import {
  isBefore,
  getMomentDate,
  isInFuture,
  isSameOrBefore,
} from "../utils/DateUtil.js";
import { startDate, endDate, patientID, backendURL } from "../Config.js";
import { timeInterval, utcRGEX } from "../constants/Constants.js";

export const generateCgmData = (startDate, endDate) => {
  let fromDate = getMomentDate(startDate);
  let toDate = getMomentDate(endDate);
  let count = 0;
  const arrayCgmData = [];

  while (isBefore(fromDate, toDate)) {
    let added5MinToTimeStamp = fromDate.add(timeInterval, "minutes");
    fromDate = added5MinToTimeStamp;
    let timeStampString = added5MinToTimeStamp.toISOString();
    let mockValue = faker.number.float({
      min: 1.11111112,
      max: 33.33388916,
      precision: 0.01,
    });
    let range = getInterpretation(mockValue);

    const content = {
      patientId: patientID,
      patientDay: null,
      observations: [
        {
          id: faker.string.uuid(),
          isActive: true,
          identifier: [
            {
              type: "DownloadId",
              system: "http://www.philips.com/ampm/ods",
              value: "4babe24e-0d97-4f25-8f5c-90ee706b4e4c",
            },
          ],
          method: {
            coding: [
              {
                system: "urn:iso:std:iso:11073:10101",
                code: "MMEAS^manual-measurement^MDC",
                display: "",
              },
            ],
          },
          status: "FINAL",
          meta: {
            lastUpdated: timeStampString,
          },
          effectivePeriod: {
            start: timeStampString,
            end: timeStampString,
          },
          subject: {
            identifier: {
              type: null,
              system: "http://www.philips.com/myvirtualcare",
              value: patientID,
            },
            reference: null,
            type: "Patient",
          },
          device: {
            identifier: {
              type: null,
              system: "NA",
              value: "NA",
            },
            type: "device",
            reference: null,
          },
          component: [],
          code: {
            coding: [
              {
                system: "urn:iso:std:iso:11073:10101",
                code: "MDC_CONC_GLU_ISF",
                display: "Interstitial Fluid Glucose",
              },
            ],
          },
          valueQuantity: {
            value: mockValue,
            unit: "mmol/L",
            system: "http://unitsofmeasure.org",
            code: "mmol/L",
          },
          valueCodeableConcept: null,
          interpretation: [range],
        },
      ],
    };
    if (isSameOrBefore(fromDate, toDate)) {
      count++;
      arrayCgmData.push(content);
    }
  }
  const data = {
    totalElements: count,
    totalPages: 1,
    page: 1,
    size: count,
    sortField: "start_time",
    sortDirection: "ASC",
    content: arrayCgmData,
  };
  return data;
};

try {
  if (!utcRGEX.test(startDate)) {
    throw new Error("Please enter start date in UTC format");
  }

  if (isInFuture(startDate)) {
    throw new Error("Start date cannot be future date");
  }

  if (isInFuture(startDate)) {
    throw new Error("Start date cannot be future date");
  }

  if (isInFuture(startDate)) {
    throw new Error("Start date cannot be future date");
  }

  if (!utcRGEX.test(endDate)) {
    throw new Error("Please enter start date in UTC format");
  }

  if (isInFuture(endDate)) {
    throw new Error("End date cannot be future date");
  }

  if (!isBefore(startDate, endDate)) {
    throw new Error("Start date cannot be greater than/ equal to end date");
  }

  if (!patientID) {
    throw new Error("Please enter patient ID");
  }
  console.info("CGM data generating...");
  const data = generateCgmData(startDate, endDate);
  console.info("CGM data saving to file....");
  createJsonFile(data, "cgmData");
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  if (backendURL) {
    sendDataToBackend(requestOptions, backendURL);
  }
} catch (e) {
  console.error(e.message);
}
