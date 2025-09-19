import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import type {
  Diagnosis,
  HospitalEntry as HospitalEntryType,
} from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface HospitalEntryProps {
  entry: HospitalEntryType;
  diagnoses: Array<Diagnosis> | undefined;
}

const HospitalEntry = ({ entry, diagnoses }: HospitalEntryProps) => {
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
        {entry.date} <LocalHospitalIcon />
      </Typography>
      <Typography variant="body1">{entry.description}</Typography>
      <List>
        {diagnoses
          ? diagnoses.map((diagnosis) => (
              <ListItem key={diagnosis?.code}>
                <ListItemText
                  primary={`- ${diagnosis?.code} ${diagnosis?.name}`}
                />
              </ListItem>
            ))
          : null}
      </List>
      <Typography>Discharge at: {entry.discharge.date}</Typography>
      <Typography>Criteria: {entry.discharge.criteria}</Typography>
      <Typography variant="body1">Diagnosis by {entry.specialist}</Typography>
    </Box>
  );
};

export default HospitalEntry;
