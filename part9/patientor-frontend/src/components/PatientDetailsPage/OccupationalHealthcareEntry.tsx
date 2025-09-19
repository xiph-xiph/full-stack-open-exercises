import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import type {
  Diagnosis,
  OccupationalHealthcareEntry as OccupationalHealthcareEntryType,
} from "../../types";
import WorkIcon from "@mui/icons-material/Work";

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntryType;
  diagnoses: Array<Diagnosis> | undefined;
}

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: OccupationalHealthcareEntryProps) => {
  return (
    <Box
      style={{
        marginTop: "0.5em",
        border: "1px solid black",
        padding: "0.5em",
        borderRadius: "8px",
      }}
    >
      <Typography variant="body1">
        {entry.date} <WorkIcon /> {entry.employerName}
      </Typography>
      <Typography variant="body1">{entry.description}</Typography>
      <List>
        {diagnoses
          ? diagnoses.map((diagnosis) => (
              <ListItem key={diagnosis.code}>
                <ListItemText
                  primary={`- ${diagnosis.code} ${diagnosis.name}`}
                />
              </ListItem>
            ))
          : null}
      </List>
      {entry.sickLeave ? (
        <Typography variant="body1">
          Sick leave from {entry.sickLeave.startDate} until{" "}
          {entry.sickLeave.endDate}
        </Typography>
      ) : null}
      <Typography variant="body1">Diagnosis by {entry.specialist}</Typography>
    </Box>
  );
};

export default OccupationalHealthcareEntry;
