import z from "zod";
import {
  NewPatientSchema,
  PatientSchema,
  PatientNonSensitiveSchema,
} from "./schemas/patientSchemas";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Patient = z.infer<typeof PatientSchema>;

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type PatientNonSensitive = z.infer<typeof PatientNonSensitiveSchema>;

export type ErrorResponse = { error: string };
