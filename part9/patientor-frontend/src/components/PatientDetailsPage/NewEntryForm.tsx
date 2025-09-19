import { FormEvent, useState } from "react";

import {
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
  Stack,
} from "@mui/material";
import { Entry, HealthCheckRating, Patient } from "../../types";
import patientService from "../../services/patients";

interface NewEntryFormProps {
  modalOpen: boolean;
  onClose: () => void;
  addEntry: (entry: Entry) => void;
  patientId: Patient["id"];
}

const NewEntryForm = ({
  modalOpen,
  onClose,
  addEntry,
  patientId,
}: NewEntryFormProps) => {
  const [error, setError] = useState("");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const sendEntry = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const entry = await patientService.addEntry(
        {
          description,
          date,
          specialist,
          type: "HealthCheck",
          healthCheckRating,
        },
        patientId as string
      );
      addEntry(entry);
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new entry</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <div>
          <Stack spacing={1} component={"form"} onSubmit={sendEntry}>
            <TextField
              label="Description"
              fullWidth
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextField
              label="Date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
            />
            <TextField
              label="Health Check Rating"
              type="number"
              fullWidth
              value={healthCheckRating}
              onChange={(event) => {
                const value = Number(event.target.value);
                if (Object.values(HealthCheckRating).includes(value)) {
                  setHealthCheckRating(value as HealthCheckRating);
                }
              }}
            />
            <TextField
              label="Diagnosis Codes (comma-separated)"
              fullWidth
              value={diagnosisCodes.join(",")}
              onChange={(event) =>
                setDiagnosisCodes(event.target.value.split(","))
              }
            />

            <Grid>
              <Grid>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid>
                <Button
                  variant="contained"
                  style={{
                    float: "right",
                  }}
                  type="submit"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewEntryForm;
