import rawPatientData from "../data/patients";
import { NewPatient, Patient, PatientNonSensitive } from "../types";
import {
  NewPatientSchema,
  PatientSchema,
  PatientNonSensitiveSchema,
} from "../schemas/patientSchemas";

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

const getNonSensitiveById = (id: string): PatientNonSensitive | undefined => {
  const foundPatient = patientData.find((patient) => patient.id === id);
  if (foundPatient) {
    return parsePatientNonSensitive(foundPatient);
  } else {
    return undefined;
  }
};

const parseNewPatient = (patient: unknown): NewPatient =>
  NewPatientSchema.parse(patient);

const parsePatient = (patient: unknown): Patient =>
  PatientSchema.parse(patient);

const parsePatientNonSensitive = (patient: unknown): PatientNonSensitive =>
  PatientNonSensitiveSchema.parse(patient);

const addPatient = (patient: Patient): Patient => {
  patientData.push(patient);
  return patient;
};

const patientData: Patient[] = rawPatientData.map(
  (patient: object): Patient => parsePatient({ ...patient }),
);

export default {
  getSensitiveEntries,
  getNonSensitiveEntries,
  getNonSensitiveById,
  parseNewPatient,
  parsePatient,
  parsePatientNonSensitive,
  addPatient,
};
