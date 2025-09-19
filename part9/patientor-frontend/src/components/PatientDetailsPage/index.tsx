import { useParams } from "react-router-dom";
import type { Patient } from "../../types";
import { Box, Stack, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";

interface PatientDetailsPageProps {
  patients: Array<Patient>;
}

const PatientDetailsPage = ({ patients }: PatientDetailsPageProps) => {
  const { id } = useParams();
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    return (
      <Typography variant="h5">Could not find patient with id {id}</Typography>
    );
  }
  return (
    <div className="App">
      <Box style={{ marginTop: "1em" }}>
        <Stack direction="row" spacing={1}>
          <Typography variant="h4">{patient.name}</Typography>
          {patient.gender === "male" ? (
            <MaleIcon fontSize="large" />
          ) : patient.gender === "female" ? (
            <FemaleIcon fontSize="large" />
          ) : (
            <PersonIcon fontSize="large" />
          )}
        </Stack>
        <Typography variant="body1">Born: {patient.dateOfBirth}</Typography>
        <Typography variant="body1">
          Occupation: {patient.occupation}
        </Typography>
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
