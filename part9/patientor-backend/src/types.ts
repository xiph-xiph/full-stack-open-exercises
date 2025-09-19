import z from "zod";
import { DiagnosisSchema } from "./schemas/diagnosisSchemas";
import { EntrySchema, NewEntrySchema } from "./schemas/entrySchemas";
import {
  NewPatientSchema,
  PatientSchema,
  PatientNonSensitiveSchema,
} from "./schemas/patientSchemas";

export type Diagnosis = z.infer<typeof DiagnosisSchema>;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Entry = z.infer<typeof EntrySchema>;

export type NewEntry = z.infer<typeof NewEntrySchema>;

export type Patient = z.infer<typeof PatientSchema>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type PatientNonSensitive = z.infer<typeof PatientNonSensitiveSchema>;

export type ErrorResponse = { error: string };
