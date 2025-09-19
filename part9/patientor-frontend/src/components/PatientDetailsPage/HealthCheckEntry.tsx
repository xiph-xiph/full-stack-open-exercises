import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { HealthCheckRating } from "../../types";
import type {
  Diagnosis,
  HealthCheckEntry as HealthCheckEntryType,
} from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

interface HealthCheckEntryProps {
  entry: HealthCheckEntryType;
  diagnoses: Array<Diagnosis> | undefined;
}

const HealthCheckEntry = ({ entry, diagnoses }: HealthCheckEntryProps) => {
  const healthColor = () => {
    switch (entry.healthCheckRating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
      default:
        return null;
    }
  };

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
        {entry.date} <MedicalServicesIcon />
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
      <HealthAndSafetyIcon sx={{ color: healthColor() }} />
      <Typography variant="body1">Diagnosis by {entry.specialist}</Typography>
    </Box>
  );
};

export default HealthCheckEntry;
