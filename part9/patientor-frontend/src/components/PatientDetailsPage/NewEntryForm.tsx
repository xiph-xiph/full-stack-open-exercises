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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Entry, HealthCheckRating, NewEntry, Patient } from "../../types";
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

  const allEntryTypes: Array<Entry["type"]> = [
    "HealthCheck",
    "Hospital",
    "OccupationalHealthcare",
  ];
  const [entryType, setEntryType] = useState<Entry["type"]>("HealthCheck");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy
  );
  const [employerName, setEmployerName] = useState("");
  const [hasSickLeave, setHasSickLeave] = useState(false);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const sendEntry = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const baseEntry = {
        description,
        date,
        specialist,
        diagnosisCodes,
        type: entryType,
      };
      let newEntry: NewEntry;
      switch (entryType) {
        case "HealthCheck":
          newEntry = { ...baseEntry, type: entryType, healthCheckRating };
          break;
        case "OccupationalHealthcare":
          newEntry = {
            ...baseEntry,
            type: entryType,
            employerName,
            sickLeave: hasSickLeave
              ? {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                }
              : undefined,
          };
          break;
        case "Hospital":
          newEntry = {
            ...baseEntry,
            type: entryType,
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria,
            },
          };
          break;
      }
      const entry = await patientService.addEntry(newEntry, patientId);
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
            <FormControl>
              <InputLabel>Entry Type</InputLabel>
              <Select
                label="Entry Type"
                value={entryType}
                onChange={(event) => setEntryType(event.target.value)}
              >
                {allEntryTypes.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              label="Diagnosis Codes (comma-separated)"
              fullWidth
              value={diagnosisCodes.join(",")}
              onChange={(event) =>
                setDiagnosisCodes(event.target.value.split(","))
              }
            />

            {entryType === "HealthCheck" ? (
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
            ) : null}

            {entryType === "OccupationalHealthcare" ? (
              <>
                <TextField
                  label="Employer Name"
                  fullWidth
                  value={employerName}
                  onChange={(event) => {
                    setEmployerName(event.target.value);
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={hasSickLeave}
                      onChange={() => setHasSickLeave(!hasSickLeave)}
                    />
                  }
                  label="Sick Leave"
                />
                {hasSickLeave ? (
                  <>
                    <Stack direction="row" spacing={1}>
                      <TextField
                        label="Start Date"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={sickLeaveStartDate}
                        onChange={(event) => {
                          setSickLeaveStartDate(event.target.value);
                        }}
                      />
                      <TextField
                        label="End Date"
                        placeholder="YYYY-MM-DD"
                        fullWidth
                        value={sickLeaveEndDate}
                        onChange={(event) => {
                          setSickLeaveEndDate(event.target.value);
                        }}
                      />
                    </Stack>
                  </>
                ) : null}
              </>
            ) : null}

            {entryType === "Hospital" ? (
              <>
                <TextField
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  fullWidth
                  value={dischargeDate}
                  onChange={(event) => {
                    setDischargeDate(event.target.value);
                  }}
                />
                <TextField
                  label="Discharge Criteria"
                  fullWidth
                  value={dischargeCriteria}
                  onChange={(event) => {
                    setDischargeCriteria(event.target.value);
                  }}
                />
              </>
            ) : null}

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
