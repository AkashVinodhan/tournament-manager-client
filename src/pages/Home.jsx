import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  IconButton,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import { context } from "../context/Context";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axiosConfig";

function Home() {
  const { state, fetchTournaments } = useContext(context);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const nav = useNavigate();

  const handleDelete = async (id) => {
    const { data } = await axiosInstance.delete("/tournaments/" + id);
    setOpen(true);
    fetchTournaments();
  };

  return (
    <Box p={3}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mb={3}
      >
        <Typography variant="h4">Tournaments</Typography>
        <Button variant="contained" onClick={() => nav("/create")}>
          Create New Tournament
        </Button>
      </Stack>
      <Stack width={"70%"} m={"auto"}>
        {state.tournaments.map((tournament) => (
          <Card key={tournament._id}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              p={3}
            >
              <Typography>{tournament.name}</Typography>
              <Typography>
                {`${dayjs(tournament.startDate).format("DD/MM/YYYY")} - ${dayjs(
                  tournament.endDate
                ).format("DD/MM/YYYY")}`}
              </Typography>
              <Box>
                <IconButton
                  aria-label="edit"
                  onClick={() => nav("/tournaments/" + tournament._id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  sx={{ color: "red" }}
                  onClick={() => {
                    handleDelete(tournament._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Tournament Deleted"
        action={action}
      />
    </Box>
  );
}

export default Home;
