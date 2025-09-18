import rawPatientData from "../data/patients";
import { v1 as uuid } from "uuid";
import { NewPatient, Patient, PatientNonSensitive, Gender } from "../types";

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

const isGender = (gender: string): gender is Gender =>
  Object.values(Gender).includes(gender as Gender);

const validateNewPatient = (patient: unknown): patient is NewPatient => {
  if (
    typeof patient !== "object" ||
    patient === null ||
    !("dateOfBirth" in patient) ||
    !("gender" in patient) ||
    !("name" in patient) ||
    !("occupation" in patient) ||
    !("ssn" in patient) ||
    !(typeof patient.dateOfBirth === "string") ||
    !(typeof patient.gender === "string") ||
    !isGender(patient.gender) ||
    !(typeof patient.name === "string") ||
    !(typeof patient.occupation === "string") ||
    !(typeof patient.ssn === "string")
  ) {
    return false;
  } else {
    return true;
  }
};

const validatePatient = (patient: unknown): patient is Patient => {
  if (
    !validateNewPatient(patient) ||
    !("id" in patient) ||
    !(typeof patient.id === "string")
  ) {
    return false;
  } else {
    return true;
  }
};

const patientData: Patient[] = rawPatientData.map(
  (patient: object): Patient => {
    if (validatePatient(patient)) {
      return patient as Patient;
    } else {
      throw new Error("patient data is invalid");
    }
  },
);

const convertToPatient = (patient: NewPatient): Patient => {
  return {
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    id: uuid(),
    name: patient.name,
    occupation: patient.occupation,
    ssn: patient.ssn,
  };
};

const convertToPatientNonSensitive = (
  patient: Patient,
): PatientNonSensitive => {
  return {
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    id: patient.id,
    name: patient.name,
    occupation: patient.occupation,
  };
};

const addPatient = (newPatient: Patient): Patient => {
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getSensitiveEntries,
  getNonSensitiveEntries,
  validateNewPatient,
  validatePatient,
  convertToPatient,
  convertToPatientNonSensitive,
  addPatient,
};
