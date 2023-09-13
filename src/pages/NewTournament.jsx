import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import dayjs from "dayjs";
import axiosInstance from "../axios/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { context } from "../context/Context";

function NewTournament() {
  const { id } = useParams();
  const nav = useNavigate();
  const { fetchTournaments } = useContext(context);

  const [name, setName] = useState("");
  const [startDate, setstartDate] = useState(dayjs(Date.now()));
  const [endDate, setendDate] = useState(dayjs(Date.now()));
  const [status, setStatus] = useState("Yet to Start");

  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (id) {
      axiosInstance.get("/tournaments/" + id).then((res) => {
        const { name, startDate, endDate, participants, status } = res.data;
        setName(name);
        setstartDate(dayjs(startDate));
        setendDate(dayjs(endDate));
        setParticipants(participants);
        setStatus(status);
      });
    }
  }, []);

  const addParticipant = () => {
    if (participantName !== "") {
      setParticipants((prev) => [...prev, participantName]);
      setParticipantName("");
    }
  };

  const createTournament = async () => {
    const tournamentInfo = {
      name,
      startDate,
      endDate,
      participants,
      status,
    };
    if (id) {
      const { data } = await axiosInstance.put(
        "/tournaments/" + id,
        tournamentInfo
      );
      nav("/");
      fetchTournaments();
    } else {
      const { data } = await axiosInstance.post("/tournaments", tournamentInfo);
      nav("/");
      fetchTournaments();
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "50px 0 0 0",
        textAlign: "center",
      }}
    >
      <Box>
        <Typography textAlign={"center"} mb={3} variant="h6">
          {id ? <> Edit Tournament </> : <> Create New Tournament</>}
        </Typography>
        <Stack direction={"row"} gap={8}>
          <Stack gap={3}>
            <TextField
              label="Tournament Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setstartDate(newValue)}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setendDate(newValue)}
              />
            </LocalizationProvider>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                value={status}
                label="Status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"Yet to Start"}>Yet to Start</MenuItem>
                <MenuItem value={"Ongoing"}>Ongoing</MenuItem>
                <MenuItem value={"Accepting Entries"}>
                  Accepting Entries
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Box sx={{ height: "450px", overflow: "auto" }}>
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <TextField
                label="Participants"
                variant="standard"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
              />
              <IconButton
                aria-label="delete"
                sx={{ bgcolor: "lightblue" }}
                onClick={addParticipant}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <List>
              {participants.map((participant, idx) => (
                <ListItem
                  key={idx}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        setParticipants((prev) =>
                          prev.filter((name) => name !== participant)
                        );
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText>{participant}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Box>
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} gap={5}>
          <Button
            variant="contained"
            onClick={createTournament}
            disabled={name == "" || participants.length == 0}
          >
            {id ? <>Update</> : <>Create</>}
          </Button>
          <Button variant="outlined" onClick={() => nav("/")}>
            Back
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default NewTournament;
