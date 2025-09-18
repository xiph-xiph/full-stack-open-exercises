import z from "zod";
import { Gender } from "../types";

const PatientSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  dateOfBirth: z.string().min(4),
  ssn: z.string().min(3),
  gender: z.enum(Gender),
  occupation: z.string().min(3),
});

const NewPatientSchema = PatientSchema.omit({
  id: true,
});

const PatientNonSensitiveSchema = PatientSchema.omit({
  ssn: true,
});

export { NewPatientSchema, PatientSchema, PatientNonSensitiveSchema };
