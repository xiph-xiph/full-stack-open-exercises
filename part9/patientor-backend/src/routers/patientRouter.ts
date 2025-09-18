import express from "express";
import patientService from "../services/patientService";
import { Response } from "express";
import { PatientNonSensitive } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

export default router;
