import type { Diagnosis, Entry as EntryType } from "../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";
import { Typography } from "@mui/material";

interface EntryProps {
  entry: EntryType;
  allDiagnoses: Array<Diagnosis>;
}

const Entry = ({ entry, allDiagnoses }: EntryProps) => {
  const diagnoses = entry.diagnosisCodes?.map(
    (code) =>
      allDiagnoses.find((diagnosis) => diagnosis.code === code) as Diagnosis
  );
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
      );
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    default:
      return (
        <Typography variant="body1">
          Error: could not recognize entry type
        </Typography>
      );
  }
};

export default Entry;
