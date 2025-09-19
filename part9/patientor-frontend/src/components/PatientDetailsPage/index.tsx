import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Diagnosis, Entry as EntryType, Patient } from "../../types";
import { Box, Button, Stack, Typography } from "@mui/material";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import PersonIcon from "@mui/icons-material/Person";
import Entry from "./Entry";
import NewEntryForm from "./NewEntryForm";

interface PatientDetailsPageProps {
  patients: Array<Patient>;
  diagnoses: Array<Diagnosis>;
  addEntry: (entry: EntryType, id: Patient["id"]) => void;
}

const PatientDetailsPage = ({
  patients,
  diagnoses,
  addEntry,
}: PatientDetailsPageProps) => {
  const { id } = useParams();
  const patient = patients.find((patient) => patient.id === id);

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  if (!patient || !id) {
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

        <NewEntryForm
          modalOpen={modalOpen}
          onClose={closeModal}
          addEntry={(entry) => {
            addEntry(entry, id);
          }}
          patientId={id}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => openModal()}>
          Add New Entry
        </Button>

        {patient.entries ? (
          <Stack spacing={1}>
            <Typography variant="h5">Entries</Typography>
            {patient.entries.map((entry) => (
              <Entry key={entry.id} entry={entry} allDiagnoses={diagnoses} />
            ))}
          </Stack>
        ) : null}
      </Box>
    </div>
  );
};

export default PatientDetailsPage;
