import patientData from "../data/patients";
import { Patient, PatientNonSensitive } from "../types";

const getSensitiveEntries = (): Patient[] => {
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

const addPatient = (newPatient: Patient): PatientNonSensitive => {
  patientData.push(newPatient);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...newPatientNonSensitive } = newPatient;

  return newPatientNonSensitive;
};

export default {
  getSensitiveEntries,
  getNonSensitiveEntries,
  addPatient,
};
