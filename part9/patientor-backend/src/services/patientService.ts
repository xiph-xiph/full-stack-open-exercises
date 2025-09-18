import patientData from "../data/patients";
import { Patient, PatientNonSensitive } from "../types";

const getEntries = (): Patient[] => {
  return patientData;
};

const getNonSensitiveEntries = (): PatientNonSensitive[] => {
  return patientData.map((patient) => {
    return {
      ...patient,
      ssn: undefined,
    };
  });
};

export default { getEntries, getNonSensitiveEntries };
