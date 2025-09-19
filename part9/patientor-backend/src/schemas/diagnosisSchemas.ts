import z from "zod";

export const DiagnosisSchema = z.object({
  code: z.string(),
  name: z.string(),
  latin: z.optional(z.string()),
});
