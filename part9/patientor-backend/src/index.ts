import express from "express";
import cors from "cors";
import pingRouter from "./routers/pingRouter";
import diagnosisRouter from "./routers/diagnosisRouter";
import patientRouter from "./routers/patientRouter";

const app = express();

app.use(cors());
app.use("/api/ping", pingRouter);
app.use("/api/diagnoses", diagnosisRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
