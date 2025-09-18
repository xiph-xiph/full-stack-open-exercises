import express from "express";
import patientService from "../services/patientService";
import { v1 as uuid } from "uuid";
import { Response } from "express";
import { PatientNonSensitive } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.post("/", (req, res: Response<PatientNonSensitive | ErrorResponse>) => {
  const newPatient = { ...req.body, id: uuid() };
  const addedPatient = patientService.addPatient(newPatient);
  return res.json(addedPatient);
});

export default router;
