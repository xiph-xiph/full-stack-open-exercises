import z from "zod";
import { Gender } from "../types";
import { EntrySchema } from "./entrySchemas";

export const PatientSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  dateOfBirth: z.string().min(4),
  ssn: z.string().min(3),
  gender: z.enum(Gender),
  occupation: z.string().min(3),
  entries: z.array(EntrySchema),
});

export const NewPatientSchema = PatientSchema.omit({
  id: true,
});

export const PatientNonSensitiveSchema = PatientSchema.omit({
  ssn: true,
});
