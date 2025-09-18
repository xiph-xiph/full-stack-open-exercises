import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { PatientNonSensitive, ErrorResponse } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res: Response<PatientNonSensitive | ErrorResponse>) => {
  const patientToAdd: unknown = req.body;
  if (!patientService.validateNewPatient(patientToAdd)) {
    console.log(req.body);
    return res.status(400).json({ error: "invalid request" });
  }

  const newPatient = patientService.addPatient(
    patientService.convertToPatient(patientToAdd),
  );
  return res.json(patientService.convertToPatientNonSensitive(newPatient));
});

export default router;
