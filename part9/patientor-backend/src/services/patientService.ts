import rawPatientData from "../data/patients";

import { EntrySchema, NewEntrySchema } from "../schemas/entrySchemas";
import {
  NewPatientSchema,
  PatientSchema,
  PatientNonSensitiveSchema,
} from "../schemas/patientSchemas";
import {
  NewEntry,
  Entry,
  NewPatient,
  Patient,
  PatientNonSensitive,
} from "../types";

const getNonSensitivePatientEntries = (): PatientNonSensitive[] => {
  return patientData.map((patient) => {
    return {
      ...patient,
      ssn: undefined,
    };
  });
};

const getNonSensitivePatientsById = (
  id: string,
): PatientNonSensitive | undefined => {
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

const parseNewEntry = (entry: unknown): NewEntry => NewEntrySchema.parse(entry);

const parseEntry = (entry: unknown): Entry => EntrySchema.parse(entry);

const addEntryToPatient = (
  entry: Entry,
  patientId: string | undefined,
): Entry | undefined => {
  const patient = patientData.find((patient) => patient.id === patientId);
  if (!patient) {
    return undefined;
  }
  patient.entries.push(entry);
  return entry;
};

const patientData: Patient[] = rawPatientData.map(
  (patient: object): Patient => parsePatient({ ...patient }),
);

export default {
  getNonSensitivePatientEntries,
  getNonSensitivePatientsById,
  parseNewPatient,
  parsePatientNonSensitive,
  addPatient,
  parseNewEntry,
  parseEntry,
  addEntryToPatient,
};
