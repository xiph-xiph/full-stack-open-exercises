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
  Input,
  Box,
} from "@mui/material";
import {
  Diagnosis,
  Entry,
  HealthCheckRating,
  NewEntry,
  Patient,
} from "../../types";
import patientService from "../../services/patients";

interface NewEntryFormProps {
  modalOpen: boolean;
  onClose: () => void;
  addEntry: (entry: Entry) => void;
  patientId: Patient["id"];
  allDiagnoses: Array<Diagnosis>;
}

const NewEntryForm = ({
  modalOpen,
  onClose,
  addEntry,
  patientId,
  allDiagnoses,
}: NewEntryFormProps) => {
  const [error, setError] = useState("");
  const allEntryTypes: Array<Entry["type"]> = [
    "HealthCheck",
    "Hospital",
    "OccupationalHealthcare",
  ];

  const allHealthCheckRatings = Object.keys(HealthCheckRating).filter((key) =>
    isNaN(Number(key))
  );

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
    <Dialog fullWidth open={modalOpen} onClose={() => onClose()}>
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
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <InputLabel>Date</InputLabel>
            <Input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
            <TextField
              label="Specialist"
              value={specialist}
              onChange={(event) => setSpecialist(event.target.value)}
            />
            <FormControl>
              <InputLabel>Diagnosis Codes</InputLabel>
              <Select
                label="Diagnosis Codes"
                multiple
                value={diagnosisCodes}
                onChange={(event) => {
                  setDiagnosisCodes(event.target.value as string[]);
                }}
              >
                {allDiagnoses.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    {diagnosis.code}: {diagnosis.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {entryType === "HealthCheck" ? (
              <FormControl>
                <InputLabel>Health Check Rating</InputLabel>
                <Select
                  label="Health Check Rating"
                  value={healthCheckRating}
                  onChange={(event) => setHealthCheckRating(event.target.value)}
                >
                  {allHealthCheckRatings.map((name) => (
                    <MenuItem
                      key={name}
                      value={
                        HealthCheckRating[
                          name as keyof typeof HealthCheckRating
                        ]
                      }
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : null}

            {entryType === "OccupationalHealthcare" ? (
              <>
                <TextField
                  label="Employer Name"
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
                      <Box sx={{ width: "100%" }}>
                        <InputLabel>Start Date</InputLabel>
                        <Input
                          fullWidth
                          type="date"
                          value={sickLeaveStartDate}
                          onChange={(event) => {
                            setSickLeaveStartDate(event.target.value);
                          }}
                        />
                      </Box>
                      <Box sx={{ width: "100%" }}>
                        <InputLabel>End Date</InputLabel>
                        <Input
                          fullWidth
                          type="date"
                          value={sickLeaveEndDate}
                          onChange={(event) => {
                            setSickLeaveEndDate(event.target.value);
                          }}
                        />
                      </Box>
                    </Stack>
                  </>
                ) : null}
              </>
            ) : null}

            {entryType === "Hospital" ? (
              <>
                <Input
                  type="date"
                  value={dischargeDate}
                  onChange={(event) => {
                    setDischargeDate(event.target.value);
                  }}
                />
                <TextField
                  label="Discharge Criteria"
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
