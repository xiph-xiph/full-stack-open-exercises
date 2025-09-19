import express from "express";
import patientService from "../services/patientService";
import { Request, Response, NextFunction } from "express";
import { PatientNonSensitive, ErrorResponse, NewPatient } from "../types";
import { v1 as uuid } from "uuid";
import { ZodError } from "zod";

const router = express.Router();

router.get("/", (_req, res: Response<PatientNonSensitive[]>) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const foundPatient = patientService.getNonSensitiveById(req.params.id);
  if (foundPatient) {
    res.json(foundPatient);
  } else {
    res.json({ error: `could not find patient with id ${req.params.id}` });
  }
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    patientService.parseNewPatient(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.post(
  "/",
  newPatientParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<PatientNonSensitive | ErrorResponse>,
  ) => {
    const newPatient = req.body;

    try {
      const patient = { ...newPatient, id: uuid() };
      patientService.addPatient(patient);
      res.json(patientService.parsePatientNonSensitive(patient));
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        res.status(400).send({ error: JSON.stringify(error.issues) });
      } else {
        res.status(400).send({ error: "unknown error" });
      }
    }
  },
);

export default router;
