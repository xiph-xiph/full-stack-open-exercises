import z from "zod";
import { Gender, HealthCheckRating } from "../types";

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.optional(z.array(z.string())),
});

export const HealthCheckEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.optional(
    z.object({
      startDate: z.string(),
      endDate: z.string(),
    }),
  ),
});

export const HospitalEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string(),
  }),
});

export const EntrySchema = z.discriminatedUnion("type", [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
]);

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
