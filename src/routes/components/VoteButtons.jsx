import React from "react";
import { IconButton, Typography, Grid, Paper } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

const VoteButtons = ({ selected, votes, handleClick }) => (
  <Paper elevation={1} sx={{ p: 1 }}>
    <Grid container spacing={1} alignItems="center">
      <Grid item>
        <IconButton sx={{ ":focus": { outline: "none" } }} onClick={() => handleClick(1)}>
          <ThumbUpIcon style={{ color: selected === 1 ? "blue" : "gray" }} />
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton sx={{ ":focus": { outline: "none" } }} onClick={() => handleClick(-1)}>
          <ThumbDownIcon style={{ color: selected === -1 ? "red" : "gray" }} />
        </IconButton>
      </Grid>
      <Grid item sx={{ ml: "auto" }}>
        <Typography variant="body2">Score: {votes}</Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default VoteButtons;