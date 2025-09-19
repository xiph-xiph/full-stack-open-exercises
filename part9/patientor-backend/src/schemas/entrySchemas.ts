import z from "zod";
import { HealthCheckRating } from "../types";

const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.optional(z.array(z.string())),
});

const HealthCheckEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.safeExtend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.optional(
    z.object({
      startDate: z.string(),
      endDate: z.string(),
    }),
  ),
});

const HospitalEntrySchema = BaseEntrySchema.safeExtend({
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

const EntryTypeSchema = z.enum([
  "HealthCheck",
  "OccupationalHealthcare",
  "Hospital",
]);

export const NewEntrySchema = BaseEntrySchema.omit({ id: true }).safeExtend({
  type: EntryTypeSchema,
  healthCheckRating: z.optional(z.enum(HealthCheckRating)),
  employerName: z.optional(z.string()),
  sickLeave: z.optional(
    z.object({
      startDate: z.string(),
      endDate: z.string(),
    }),
  ),
  discharge: z.optional(
    z.object({
      date: z.string(),
      criteria: z.string(),
    }),
  ),
});
